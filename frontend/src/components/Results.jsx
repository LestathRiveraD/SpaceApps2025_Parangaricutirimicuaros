import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Results() {
  const cards = [
    {
      title: "Suelo",
      text:"La instalación del Datacenter puede generar presión sobre el suelo debido a la construcción de la planta y el manejo de residuos sólidos, afectando la calidad y la fertilidad del terreno.",
    },
    {
      title: "Agua",
      text: "El consumo industrial de agua aumentará significativamente, y los efluentes de producción podrían afectar la disponibilidad y calidad del agua en la región si no se tratan adecuadamente.",
    },
    {
      title: "Aire",
      text: "La actividad del datacenter incrementa las emisiones de aerosoles y contaminantes al aire, contribuyendo al deterioro de la calidad del aire local y aumentando la huella ambiental de la industria.",
    },
  ];

  const [index, setIndex] = useState(0);

  const handlePrev = () =>
    setIndex((prev) => (prev === 0 ? cards.length - 1 : prev - 1));
  const handleNext = () =>
    setIndex((prev) => (prev === cards.length - 1 ? 0 : prev + 1));

  return (
    <div>
      <h1 className="summary-title">Resultados</h1>
      <div className="info-card">
        <h2 className="info-title">{cards[index].title}</h2>
        <p className="info-text">{cards[index].text}</p>
        <div className="info-nav">
          <button onClick={handlePrev} className="info-btn">
          <ChevronLeft size={16} /> Anterior
          </button>
          <button onClick={handleNext} className="info-btn">
          Siguiente <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}