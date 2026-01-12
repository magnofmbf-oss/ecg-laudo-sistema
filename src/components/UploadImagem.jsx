import React, { useRef } from "react";
import { Image, FileText as FileIcon, Upload } from "lucide-react";

const UploadImagem = ({ imagem, setImagem }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 10 * 1024 * 1024) {
      // 10MB
      alert("Arquivo muito grande. Máximo 10MB.");
      return;
    }
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagem({
          file,
          preview: reader.result,
          type: file.type,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagem({
          file,
          preview: reader.result,
          type: file.type,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section className="card">
      <h2 className="card-title">
        <span className="icon">
          <Image size={20} />
        </span>
        Imagem do ECG
      </h2>

      <div
        className={`upload-area ${imagem ? "has-image" : ""}`}
        onClick={() => !imagem && fileInputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        {imagem ? (
          <div className="preview-container">
            {imagem.type === "application/pdf" ? (
              <div className="pdf-preview">
                <span className="pdf-icon">
                  <FileIcon size={24} />
                </span>
                <span>{imagem.file.name}</span>
              </div>
            ) : (
              <img src={imagem.preview} alt="Preview do ECG" />
            )}
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
        ) : (
          <div className="upload-placeholder">
            <span className="upload-icon">
              <Upload size={32} />
            </span>
            <span>Clique ou arraste para adicionar imagem</span>
            <span className="upload-formats">PDF, JPG, PNG, BMP</span>
          </div>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.jpg,.jpeg,.png,.bmp,.gif"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
    </section>
  );
};

export default UploadImagem;
