import React, { useState, useEffect, useRef } from "react";
import {
  Stage,
  Layer,
  Image as KonvaImage,
  Line,
  Text,
  Rect,
} from "react-konva";
import {
  X,
  ZoomIn,
  ZoomOut,
  Move,
  Ruler,
  Check,
  RotateCcw,
  Maximize,
  Expand,
} from "lucide-react";

const CaliperModal = ({ isOpen, onClose, imagem, onApplyMeasures }) => {
  const [imageObj, setImageObj] = useState(null);
  const [stageScale, setStageScale] = useState(1);
  const [stagePos, setStagePos] = useState({ x: 0, y: 0 });
  const [baseScale, setBaseScale] = useState(1);
  const [basePos, setBasePos] = useState({ x: 0, y: 0 });
  const [mode, setMode] = useState("pan"); // 'pan', 'calibrate', 'measure'

  // Calibração
  const [calibrationPoints, setCalibrationPoints] = useState([]); // [{x, y}, {x, y}]
  const [calibrationFactor, setCalibrationFactor] = useState(null); // ms per pixel
  const [calibrationValue, setCalibrationValue] = useState(1000); // Default 1000ms (1s)

  // Medição
  const [measurePoints, setMeasurePoints] = useState([]); // [{x, y}, {x, y}]
  const [activeMeasure, setActiveMeasure] = useState("pr"); // 'pr', 'qrs', 'qt', 'rr', 'd1', 'avf'
  const [measures, setMeasures] = useState({
    pr: null,
    qrs: null,
    qt: null,
    rr: null,
    fc: null,
    d1: null,
    avf: null,
  });

  const stageRef = useRef(null);
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

  // Carregar imagem
  useEffect(() => {
    if (imagem && imagem.preview) {
      const img = new window.Image();
      img.src = imagem.preview;
      img.onload = () => {
        setImageObj(img);

        // Calcular escala inicial para caber 100% da largura
        let initialScale = 1;
        let initialY = 0;
        if (containerRef.current) {
          const containerWidth = containerRef.current.offsetWidth;
          initialScale = containerWidth / img.width;

          // Centralizar verticalmente se a imagem for menor que o container
          const containerHeight = containerRef.current.offsetHeight;
          const scaledHeight = img.height * initialScale;
          if (scaledHeight < containerHeight) {
            initialY = (containerHeight - scaledHeight) / 2;
          }
        }

        // Resetar estado ao carregar nova imagem
        setBaseScale(initialScale);
        setBasePos({ x: 0, y: initialY });
        setStageScale(initialScale);
        setStagePos({ x: 0, y: initialY });
        setCalibrationPoints([]);
        setCalibrationFactor(null);
        setMeasurePoints([]);
        setMeasures({
          pr: null,
          qrs: null,
          qt: null,
          rr: null,
          fc: null,
          d1: null,
          avf: null,
        });
        setMode("calibrate");
      };
    }
  }, [imagem, isOpen]); // Adicionado isOpen como dependência para garantir que o containerRef esteja disponível

  // Ajustar tamanho do canvas ao container
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };

    if (isOpen) {
      updateDimensions();
      window.addEventListener("resize", updateDimensions);
    }

    return () => window.removeEventListener("resize", updateDimensions);
  }, [isOpen]);

  // Navegação com scroll do mouse (Pan)
  const handleWheel = (e) => {
    e.evt.preventDefault();

    // e.evt.deltaX e deltaY representam o quanto o usuário rolou
    const dx = e.evt.deltaX;
    const dy = e.evt.deltaY;

    setStagePos((prev) => ({
      x: prev.x - dx,
      y: prev.y - dy,
    }));
  };

  // Funções de Zoom
  const zoomOnCenter = (scaleBy) => {
    const stage = stageRef.current;
    if (!stage) return;

    const oldScale = stage.scaleX();
    const newScale = oldScale * scaleBy;

    // Limitar zoom
    if (newScale < 0.1 || newScale > 20) return;

    // Centro do container
    const center = {
      x: stage.width() / 2,
      y: stage.height() / 2,
    };

    // Ponto da imagem que está no centro
    const relatedTo = {
      x: (center.x - stage.x()) / oldScale,
      y: (center.y - stage.y()) / oldScale,
    };

    setStageScale(newScale);
    setStagePos({
      x: center.x - relatedTo.x * newScale,
      y: center.y - relatedTo.y * newScale,
    });
  };

  const handleZoomReset = () => {
    setStageScale(baseScale);
    setStagePos(basePos);
  };

  // Cliques no canvas
  const handleStageClick = (e) => {
    if (mode === "pan") return;

    const stage = stageRef.current;
    const pointerPosition = stage.getPointerPosition();
    const scale = stage.scaleX();

    // Coordenada real na imagem
    const x = (pointerPosition.x - stage.x()) / scale;
    const y = (pointerPosition.y - stage.y()) / scale;

    if (mode === "calibrate") {
      if (calibrationPoints.length < 2) {
        const newPoints = [...calibrationPoints, { x, y }];
        setCalibrationPoints(newPoints);

        if (newPoints.length === 2) {
          // Calcular fator de calibração
          const distPixels = Math.abs(newPoints[1].x - newPoints[0].x);
          if (distPixels > 0) {
            setCalibrationFactor(calibrationValue / distPixels);
            setMode("measure");
          }
        }
      }
    } else if (mode === "measure") {
      if (!calibrationFactor) {
        alert("Por favor, calibre a imagem primeiro.");
        setMode("calibrate");
        return;
      }

      const isVertical = activeMeasure === "d1" || activeMeasure === "avf";
      const maxPoints = isVertical ? 3 : 2;

      if (measurePoints.length < maxPoints) {
        const newPoints = [...measurePoints, { x, y }];
        setMeasurePoints(newPoints);

        if (isVertical ? newPoints.length >= 2 : newPoints.length === 2) {
          // Calcular medida
          let value;
          if (isVertical) {
            // newPoints[0] = Base, newPoints[1] = Pico, newPoints[2] = Vale
            // Y cresce para baixo.
            // Pico (acima da base) = Base.y - Pico.y
            // Vale (abaixo da base) = Base.y - Vale.y (será negativo)
            // Amplitude total em pixels = (Base.y - Pico.y) + (Base.y - Vale.y)
            const amplitudePixels =
              newPoints[0].y -
              newPoints[1].y +
              (newPoints.length === 3 ? newPoints[0].y - newPoints[2].y : 0);
            value = ((amplitudePixels * calibrationFactor) / 400).toFixed(2);
          } else {
            const distPixels = Math.abs(newPoints[1].x - newPoints[0].x);
            value = Math.round(distPixels * calibrationFactor);
          }

          const newMeasures = { ...measures };

          if (activeMeasure === "rr") {
            newMeasures.rr = value;
            // Calcular FC (60000ms / RRms)
            if (value > 0) {
              newMeasures.fc = Math.round(60000 / value);
            }
          } else {
            newMeasures[activeMeasure] = value;
          }

          setMeasures(newMeasures);
        }
      } else {
        // Resetar pontos para nova medida
        setMeasurePoints([{ x, y }]);
      }
    }
  };

  // Arrastar pontos
  const handlePointDrag = (index, e, type) => {
    const x = e.target.x();

    if (type === "calibrate") {
      const newPoints = [...calibrationPoints];
      newPoints[index] = { ...newPoints[index], x };
      setCalibrationPoints(newPoints);

      // Recalcular fator
      if (newPoints.length === 2) {
        const distPixels = Math.abs(newPoints[1].x - newPoints[0].x);
        if (distPixels > 0) {
          setCalibrationFactor(calibrationValue / distPixels);

          // Recalcular medidas existentes se o fator mudar
          const isVertical = activeMeasure === "d1" || activeMeasure === "avf";

          if (
            isVertical ? measurePoints.length >= 2 : measurePoints.length === 2
          ) {
            let mValue;
            if (isVertical) {
              const amplitudePixels =
                measurePoints[0].y -
                measurePoints[1].y +
                (measurePoints.length === 3
                  ? measurePoints[0].y - measurePoints[2].y
                  : 0);
              mValue = (
                (amplitudePixels * (calibrationValue / distPixels)) /
                400
              ).toFixed(2);
            } else {
              const mDist = Math.abs(measurePoints[1].x - measurePoints[0].x);
              mValue = Math.round(mDist * (calibrationValue / distPixels));
            }

            const newMeasures = { ...measures };
            if (activeMeasure === "rr") {
              newMeasures.rr = mValue;
              newMeasures.fc = Math.round(60000 / mValue);
            } else {
              newMeasures[activeMeasure] = mValue;
            }
            setMeasures(newMeasures);
          }
        }
      }
    } else if (type === "measure") {
      const newPoints = [...measurePoints];
      const isVertical = activeMeasure === "d1" || activeMeasure === "avf";

      if (isVertical) {
        newPoints[index] = { ...newPoints[index], y: e.target.y() };
      } else {
        newPoints[index] = { ...newPoints[index], x: e.target.x() };
      }

      setMeasurePoints(newPoints);

      const maxPoints = isVertical ? 3 : 2;

      // Recalcular medida
      if (
        (isVertical ? newPoints.length >= 2 : newPoints.length === 2) &&
        calibrationFactor
      ) {
        let value;
        if (isVertical) {
          const amplitudePixels =
            newPoints[0].y -
            newPoints[1].y +
            (newPoints.length === 3 ? newPoints[0].y - newPoints[2].y : 0);
          value = ((amplitudePixels * calibrationFactor) / 400).toFixed(2);
        } else {
          const distPixels = Math.abs(newPoints[1].x - newPoints[0].x);
          value = Math.round(distPixels * calibrationFactor);
        }

        const newMeasures = { ...measures };
        if (activeMeasure === "rr") {
          newMeasures.rr = value;
          newMeasures.fc = Math.round(60000 / value);
        } else {
          newMeasures[activeMeasure] = value;
        }
        setMeasures(newMeasures);
      }
    }
  };

  const handleApply = () => {
    onApplyMeasures({
      pr: measures.pr || "",
      qrs: measures.qrs || "",
      qt: measures.qt || "",
      fc: measures.fc || "",
      d1: measures.d1 || "",
      avf: measures.avf || "",
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content modal-content-wide caliper-modal">
        <div className="modal-header">
          <h3>Caliper Digital (Régua de ECG)</h3>
          <button className="modal-close" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="caliper-body">
          {/* PAINEL DE FERRAMENTAS */}
          <div className="caliper-sidebar">
            <div className="caliper-section">
              <h4>Ferramentas</h4>
              <div className="tool-buttons">
                <button
                  className={`tool-btn ${mode === "pan" ? "active" : ""}`}
                  onClick={() => setMode("pan")}
                  title="Mover Imagem"
                >
                  <Move size={18} /> Mover
                </button>
                <button
                  className={`tool-btn ${mode === "calibrate" ? "active" : ""}`}
                  onClick={() => setMode("calibrate")}
                  title="Calibrar Escala"
                >
                  <Ruler size={18} /> Calibrar
                </button>
                <button
                  className={`tool-btn ${mode === "measure" ? "active" : ""}`}
                  onClick={() => {
                    if (!calibrationFactor) {
                      alert("Calibre a imagem primeiro!");
                      return;
                    }
                    setMode("measure");
                  }}
                  title="Medir Intervalos"
                  disabled={!calibrationFactor}
                >
                  <ZoomIn size={18} /> Medir
                </button>
              </div>
            </div>

            <div className="caliper-section">
              <h4>Zoom</h4>
              <div className="tool-buttons zoom-controls">
                <button
                  className="tool-btn"
                  onClick={() => zoomOnCenter(1.2)}
                  title="Aumentar Zoom (+)"
                >
                  <ZoomIn size={18} />
                </button>
                <button
                  className="tool-btn"
                  onClick={() => zoomOnCenter(1 / 1.2)}
                  title="Diminuir Zoom (-)"
                >
                  <ZoomOut size={18} />
                </button>
                <button
                  className="tool-btn"
                  onClick={handleZoomReset}
                  title="Tamanho Original"
                >
                  <Expand size={18} />
                </button>
                <button
                  className="tool-btn"
                  onClick={() => zoomOnCenter((baseScale * 5) / stageScale)}
                  title="Zoom Máximo"
                >
                  <Maximize size={18} />
                </button>
              </div>
            </div>

            {mode === "calibrate" && (
              <div className="caliper-section highlight-section">
                <h4>1. Calibração</h4>
                <p className="help-text">
                  Clique em dois pontos na imagem para definir uma distância
                  conhecida.
                </p>
                <div className="input-group">
                  <label>Distância selecionada equivale a:</label>
                  <select
                    value={calibrationValue}
                    onChange={(e) => {
                      setCalibrationValue(Number(e.target.value));
                      setCalibrationPoints([]);
                      setCalibrationFactor(null);
                    }}
                  >
                    <option value={1000}>
                      1 Segundo (5 quadradões grandes)
                    </option>
                    <option value={200}>
                      0.2 Segundos (1 quadradão grande)
                    </option>
                    <option value={40}>0.04 Segundos (1 quadradinho)</option>
                  </select>
                </div>
                <button
                  className="btn-reset"
                  onClick={() => {
                    setCalibrationPoints([]);
                    setCalibrationFactor(null);
                  }}
                >
                  <RotateCcw size={14} /> Refazer Calibração
                </button>

                {calibrationFactor && (
                  <div className="success-msg">
                    <Check size={14} /> Imagem calibrada!
                  </div>
                )}
              </div>
            )}

            {mode === "measure" && (
              <div className="caliper-section highlight-section">
                <h4>2. Medição</h4>
                <p className="help-text">
                  Selecione o que deseja medir e clique na imagem.
                  <br />
                  <br />
                  <strong>Para D1 e aVF:</strong> Clique em 3 pontos: 1º Linha
                  de Base, 2º Pico (onda positiva), 3º Vale (onda negativa). Se
                  não houver pico ou vale, clique novamente na linha de base.
                </p>

                <div className="measure-types">
                  <button
                    className={`measure-type-btn ${activeMeasure === "pr" ? "active" : ""}`}
                    onClick={() => {
                      setActiveMeasure("pr");
                      setMeasurePoints([]);
                    }}
                  >
                    Intervalo PR
                  </button>
                  <button
                    className={`measure-type-btn ${activeMeasure === "qrs" ? "active" : ""}`}
                    onClick={() => {
                      setActiveMeasure("qrs");
                      setMeasurePoints([]);
                    }}
                  >
                    Complexo QRS
                  </button>
                  <button
                    className={`measure-type-btn ${activeMeasure === "qt" ? "active" : ""}`}
                    onClick={() => {
                      setActiveMeasure("qt");
                      setMeasurePoints([]);
                    }}
                  >
                    Intervalo QT
                  </button>
                  <button
                    className={`measure-type-btn ${activeMeasure === "rr" ? "active" : ""}`}
                    onClick={() => {
                      setActiveMeasure("rr");
                      setMeasurePoints([]);
                    }}
                  >
                    Intervalo R-R (FC)
                  </button>
                  <button
                    className={`measure-type-btn ${activeMeasure === "d1" ? "active" : ""}`}
                    onClick={() => {
                      setActiveMeasure("d1");
                      setMeasurePoints([]);
                    }}
                  >
                    Amplitude D1 (mV)
                  </button>
                  <button
                    className={`measure-type-btn ${activeMeasure === "avf" ? "active" : ""}`}
                    onClick={() => {
                      setActiveMeasure("avf");
                      setMeasurePoints([]);
                    }}
                  >
                    Amplitude aVF (mV)
                  </button>
                </div>
              </div>
            )}

            <div className="caliper-section results-section">
              <h4>Resultados</h4>
              <div className="result-grid">
                <div className="result-item">
                  <span>FC:</span>
                  <strong>{measures.fc ? `${measures.fc} bpm` : "--"}</strong>
                </div>
                <div className="result-item">
                  <span>PR:</span>
                  <strong>{measures.pr ? `${measures.pr} ms` : "--"}</strong>
                </div>
                <div className="result-item">
                  <span>QRS:</span>
                  <strong>{measures.qrs ? `${measures.qrs} ms` : "--"}</strong>
                </div>
                <div className="result-item">
                  <span>QT:</span>
                  <strong>{measures.qt ? `${measures.qt} ms` : "--"}</strong>
                </div>
                <div className="result-item">
                  <span>D1:</span>
                  <strong>{measures.d1 ? `${measures.d1} mV` : "--"}</strong>
                </div>
                <div className="result-item">
                  <span>aVF:</span>
                  <strong>{measures.avf ? `${measures.avf} mV` : "--"}</strong>
                </div>
              </div>
            </div>

            <div className="caliper-actions">
              <button className="btn-apply" onClick={handleApply}>
                Aplicar Medidas ao Laudo
              </button>
            </div>
          </div>

          {/* ÁREA DO CANVAS */}
          <div className="caliper-canvas-container" ref={containerRef}>
            {imageObj ? (
              <Stage
                width={dimensions.width}
                height={dimensions.height}
                onWheel={handleWheel}
                onClick={handleStageClick}
                scaleX={stageScale}
                scaleY={stageScale}
                x={stagePos.x}
                y={stagePos.y}
                draggable={mode === "pan"}
                onDragEnd={(e) => {
                  if (mode === "pan") {
                    setStagePos({ x: e.target.x(), y: e.target.y() });
                  }
                }}
                ref={stageRef}
                style={{ cursor: mode === "pan" ? "grab" : "crosshair" }}
              >
                <Layer>
                  <KonvaImage image={imageObj} />

                  {/* Linhas de Calibração */}
                  {calibrationPoints.map((pt, i) => (
                    <React.Fragment key={`cal-${i}`}>
                      <Line
                        points={[pt.x, 0, pt.x, imageObj.height]}
                        stroke="red"
                        strokeWidth={2 / stageScale}
                        draggable={mode === "calibrate"}
                        onDragMove={(e) => handlePointDrag(i, e, "calibrate")}
                        dragBoundFunc={(pos) => ({ x: pos.x, y: stagePos.y })}
                      />
                      <Rect
                        x={pt.x - 5 / stageScale}
                        y={pt.y - 5 / stageScale}
                        width={10 / stageScale}
                        height={10 / stageScale}
                        fill="red"
                        draggable={mode === "calibrate"}
                        onDragMove={(e) => handlePointDrag(i, e, "calibrate")}
                        dragBoundFunc={(pos) => ({ x: pos.x, y: pos.y })}
                      />
                    </React.Fragment>
                  ))}

                  {/* Área pintada entre calibração */}
                  {calibrationPoints.length === 2 && (
                    <Rect
                      x={Math.min(
                        calibrationPoints[0].x,
                        calibrationPoints[1].x,
                      )}
                      y={0}
                      width={Math.abs(
                        calibrationPoints[1].x - calibrationPoints[0].x,
                      )}
                      height={imageObj.height}
                      fill="rgba(255, 0, 0, 0.1)"
                    />
                  )}

                  {/* Linhas de Medição */}
                  {measurePoints.map((pt, i) => {
                    const isVertical =
                      activeMeasure === "d1" || activeMeasure === "avf";
                    return (
                      <React.Fragment key={`mes-${i}`}>
                        <Line
                          points={
                            isVertical
                              ? [0, pt.y, imageObj.width, pt.y]
                              : [pt.x, 0, pt.x, imageObj.height]
                          }
                          stroke={isVertical && i === 0 ? "green" : "blue"}
                          strokeWidth={2 / stageScale}
                          dash={
                            isVertical && i === 0
                              ? [10 / stageScale, 5 / stageScale]
                              : []
                          }
                          draggable={mode === "measure"}
                          onDragMove={(e) => handlePointDrag(i, e, "measure")}
                          dragBoundFunc={(pos) =>
                            isVertical
                              ? { x: stagePos.x, y: pos.y }
                              : { x: pos.x, y: stagePos.y }
                          }
                        />
                        <Rect
                          x={pt.x - 5 / stageScale}
                          y={pt.y - 5 / stageScale}
                          width={10 / stageScale}
                          height={10 / stageScale}
                          fill={isVertical && i === 0 ? "green" : "blue"}
                          draggable={mode === "measure"}
                          onDragMove={(e) => handlePointDrag(i, e, "measure")}
                          dragBoundFunc={(pos) => ({ x: pos.x, y: pos.y })}
                        />
                        {isVertical && (
                          <Text
                            x={pt.x + 10 / stageScale}
                            y={pt.y - 15 / stageScale}
                            text={i === 0 ? "Base" : i === 1 ? "Pico" : "Vale"}
                            fontSize={14 / stageScale}
                            fill={i === 0 ? "green" : "blue"}
                            fontStyle="bold"
                          />
                        )}
                      </React.Fragment>
                    );
                  })}

                  {/* Área pintada entre medição */}
                  {measurePoints.length === 2 &&
                    activeMeasure !== "d1" &&
                    activeMeasure !== "avf" && (
                      <Rect
                        x={Math.min(measurePoints[0].x, measurePoints[1].x)}
                        y={0}
                        width={Math.abs(
                          measurePoints[1].x - measurePoints[0].x,
                        )}
                        height={imageObj.height}
                        fill="rgba(0, 0, 255, 0.1)"
                      />
                    )}

                  {/* Texto flutuante com o valor da medida atual */}
                  {measurePoints.length >= 2 &&
                    (activeMeasure === "d1" || activeMeasure === "avf") &&
                    calibrationFactor && (
                      <Text
                        x={measurePoints[0].x + 10 / stageScale}
                        y={measurePoints[0].y - 35 / stageScale}
                        text={`${(
                          ((measurePoints[0].y -
                            measurePoints[1].y +
                            (measurePoints.length === 3
                              ? measurePoints[0].y - measurePoints[2].y
                              : 0)) *
                            calibrationFactor) /
                          400
                        ).toFixed(2)} mV`}
                        fontSize={18 / stageScale}
                        fill="blue"
                        fontStyle="bold"
                        padding={5 / stageScale}
                      />
                    )}
                  {measurePoints.length === 2 &&
                    activeMeasure !== "d1" &&
                    activeMeasure !== "avf" &&
                    calibrationFactor && (
                      <Text
                        x={
                          Math.min(measurePoints[0].x, measurePoints[1].x) +
                          10 / stageScale
                        }
                        y={
                          Math.min(measurePoints[0].y, measurePoints[1].y) -
                          20 / stageScale
                        }
                        text={`${Math.round(Math.abs(measurePoints[1].x - measurePoints[0].x) * calibrationFactor)} ms`}
                        fontSize={16 / stageScale}
                        fill="blue"
                        fontStyle="bold"
                        padding={5 / stageScale}
                      />
                    )}
                </Layer>
              </Stage>
            ) : (
              <div className="loading-canvas">Carregando imagem...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaliperModal;
