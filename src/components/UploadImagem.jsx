import React, { useCallback, useEffect, useState } from "react";
import {
  Image,
  FileText as FileIcon,
  Upload,
  Loader2,
  Ruler,
  Bot,
} from "lucide-react";
import { useDropzone } from "react-dropzone";
import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import { extrairDadosPaciente } from "../utils/gemini";

// Configurar o worker do PDF.js
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

const UploadImagem = ({ imagem, setImagem, onOpenCaliper, onExtractData }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isExtracting, setIsExtracting] = useState(false);

  // Efeito para extrair dados automaticamente quando uma nova imagem é carregada
  // Removido para permitir extração manual
  // useEffect(() => {
  //   const extract = async () => {
  //     if (imagem && imagem.preview && !imagem.extracted) {
  //       setIsExtracting(true);
  //       try {
  //         const dados = await extrairDadosPaciente(imagem.preview);
  //         if (dados && onExtractData) {
  //           onExtractData(dados);
  //         }
  //         // Marca a imagem como extraída para não repetir o processo
  //         setImagem((prev) => ({ ...prev, extracted: true }));
  //       } catch (error) {
  //         console.error("Erro na extração:", error);
  //       } finally {
  //         setIsExtracting(false);
  //       }
  //     }
  //   };
  //   extract();
  // }, [imagem, onExtractData, setImagem]);

  const handleManualExtraction = async (e) => {
    e.stopPropagation();
    if (!imagem || !imagem.preview) return;

    setIsExtracting(true);
    try {
      const dados = await extrairDadosPaciente(imagem.preview);
      if (dados && onExtractData) {
        onExtractData(dados);
      }
      setImagem((prev) => ({ ...prev, extracted: true }));
    } catch (error) {
      console.error("Erro na extração:", error);
      alert(
        "Erro ao extrair dados da imagem. Verifique o console para mais detalhes.",
      );
    } finally {
      setIsExtracting(false);
    }
  };

  const processPDF = async (file) => {
    try {
      setIsProcessing(true);
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

      // Pegar a primeira página
      const page = await pdf.getPage(1);

      // Definir uma escala boa para qualidade (ex: 2.0 ou 3.0)
      const viewport = page.getViewport({ scale: 2.5 });

      // Preparar o canvas
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      // Renderizar a página no canvas
      const renderContext = {
        canvasContext: context,
        viewport: viewport,
      };

      await page.render(renderContext).promise;

      // Converter canvas para DataURL (imagem)
      const dataUrl = canvas.toDataURL("image/jpeg", 0.9);

      setImagem({
        file,
        preview: dataUrl,
        type: "image/jpeg", // Tratamos o PDF convertido como imagem
        isPdfConverted: true,
        originalName: file.name,
      });
    } catch (error) {
      console.error("Erro ao processar PDF:", error);
      alert("Erro ao ler o arquivo PDF. Tente enviar uma imagem.");
    } finally {
      setIsProcessing(false);
    }
  };

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (!file) return;

      if (file.size > 10 * 1024 * 1024) {
        alert("Arquivo muito grande. Máximo 10MB.");
        return;
      }

      if (file.type === "application/pdf") {
        processPDF(file);
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagem({
          file,
          preview: reader.result,
          type: file.type,
        });
      };
      reader.readAsDataURL(file);
    },
    [setImagem],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".bmp", ".webp"],
      "application/pdf": [".pdf"],
    },
    maxFiles: 1,
    noClick: !!imagem, // Desabilita clique se já tiver imagem
    noKeyboard: !!imagem,
  });

  // Suporte a Ctrl+V (Colar imagem)
  useEffect(() => {
    const handlePaste = (e) => {
      if (imagem) return; // Não cola se já tiver imagem

      const items = e.clipboardData?.items;
      if (!items) return;

      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf("image") !== -1) {
          const file = items[i].getAsFile();
          if (file) {
            onDrop([file]);
            break;
          }
        }
      }
    };

    window.addEventListener("paste", handlePaste);
    return () => window.removeEventListener("paste", handlePaste);
  }, [imagem, onDrop]);

  return (
    <section className="card">
      <h2 className="card-title">
        <span className="icon">
          <Image size={20} />
        </span>
        Imagem do ECG
      </h2>

      <div
        {...getRootProps()}
        className={`upload-area ${imagem ? "has-image" : ""} ${isDragActive ? "drag-active" : ""}`}
      >
        <input {...getInputProps()} />

        {isProcessing ? (
          <div className="upload-placeholder">
            <span className="upload-icon animate-spin">
              <Loader2 size={48} />
            </span>
            <span>Processando PDF...</span>
          </div>
        ) : imagem ? (
          <div className="preview-container">
            <div
              className="preview-actions"
              style={{
                marginBottom: "16px",
                marginTop: "0",
                display: "flex",
                gap: "8px",
                flexWrap: "wrap",
              }}
            >
              <button
                className="btn-caliper"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenCaliper();
                }}
              >
                <Ruler size={16} /> Abrir Caliper Digital
              </button>
              <button
                className="btn-primary"
                onClick={handleManualExtraction}
                disabled={isExtracting}
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                {isExtracting ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Bot size={16} />
                )}
                {isExtracting ? "Extraindo..." : "Extrair Dados (IA)"}
              </button>
              <button
                className="btn-remover-imagem"
                onClick={(e) => {
                  e.stopPropagation();
                  setImagem(null);
                }}
              >
                Remover
              </button>
            </div>
            <img src={imagem.preview} alt="Preview do ECG" />
            {imagem.isPdfConverted && (
              <div className="pdf-badge">
                <FileIcon size={14} /> PDF Convertido
              </div>
            )}
          </div>
        ) : (
          <div className="upload-placeholder">
            <span className="upload-icon">
              <Upload size={32} />
            </span>
            <span>
              Clique, arraste ou pressione <strong>Ctrl+V</strong> para colar
            </span>
            <span className="upload-formats">PDF, JPG, PNG, BMP, WEBP</span>
          </div>
        )}
      </div>
    </section>
  );
};

export default UploadImagem;
