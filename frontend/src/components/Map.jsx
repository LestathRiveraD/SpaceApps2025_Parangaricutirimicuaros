import { MapContainer, TileLayer, Marker, Popup, Circle, useMapEvents, WMSTileLayer } from "react-leaflet";
import { useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const nightLink = ["https://gibs.earthdata.nasa.gov/wms/epsg3857/best/wms.cgi", "VIIRS_SNPP_DayNightBand_ENCC", null]
const landLink = ["https://sh.dataspace.copernicus.eu/ogc/wms/260799dc-0692-4cea-8c41-5f9e6c2a773c", "discrete_classification", null]
const airLink = ["https://mapservices.weather.noaa.gov/raster/services/air_quality/ndgd_apm25_hr01/ImageServer/WMSServer", "apm25", null]
const aerosolLink = [
  "https://gibs.earthdata.nasa.gov/wms/epsg3857/best/wms.cgi",
  "MODIS_Aqua_Aerosol_Optical_Depth_3km",
  "2024-10-01"
]
const co2Link = [
  "https://gibs.earthdata.nasa.gov/wms/epsg3857/best/wms.cgi",
  "OCO2_GEOS_L3_CO2_Concentration_Total_Column",
  "2024-09-15"
]

let wmsLinks = aerosolLink

// Fix for broken icons in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default function Map({ color = "#3388ff", radius = 5000 }) {
  const [popup, setPopup] = useState(null);
  const [brightnessInfo, setBrightnessInfo] = useState(null);
  const [center, setCenter] = useState([32.65, -115.47]);

 function ClickHandler() {
    useMapEvents({
      click: async (e) => {
        const { lat, lng } = e.latlng;
        console.log("Clicked at", lat, lng);
        setPopup({ lat, lng });
        setCenter([lat, lng]);
        setBrightnessInfo("Estimando...");

        // Parámetros
        const z = 7; // zoom
        const tileSize = 256;

        // Conversión de lat/lon a EPSG:3857
        function project(lat, lon) {
          const R = 6378137.0;
          const x = R * ((lon * Math.PI) / 180);
          const y = R * Math.log(Math.tan(Math.PI / 4 + (lat * Math.PI) / 360));
          return { x, y };
        }

        // Encuentra el tile que contiene el punto clickeado
        const initialResolution = (2 * Math.PI * 6378137) / tileSize;
        const originShift = 2 * Math.PI * 6378137 / 2.0;
        const res = initialResolution / Math.pow(2, z);

        const { x: mx, y: my } = project(lat, lng);
        const px = (mx + originShift) / res;
        const py = (originShift - my) / res;

        const tileX = Math.floor(px / tileSize);
        const tileY = Math.floor(py / tileSize);

        // BBOX del tile en EPSG:3857
        const minx = tileX * tileSize * res - originShift;
        const maxx = (tileX + 1) * tileSize * res - originShift;
        const miny = originShift - (tileY + 1) * tileSize * res;
        const maxy = originShift - tileY * tileSize * res;

        // Coordenada del punto dentro del tile
        const pixelX = Math.floor(px - tileX * tileSize);
        const pixelY = Math.floor(py - tileY * tileSize);

        // WMS tile URL para nightLink (consumo energético)
        const nightWmsUrl = `${nightLink[0]}?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&LAYERS=${nightLink[1]}&WIDTH=256&HEIGHT=256&CRS=EPSG:3857&BBOX=${minx},${miny},${maxx},${maxy}&FORMAT=image/png`;

        // WMS tile URL para aerosoles (contaminación)
        const aerosolWmsUrl = `${aerosolLink[0]}?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&LAYERS=${aerosolLink[1]}&WIDTH=256&HEIGHT=256&CRS=EPSG:3857&BBOX=${minx},${miny},${maxx},${maxy}&FORMAT=image/png&TIME=${aerosolLink[2]}`;

        let consumo_energetico = 0;
        let contaminacionAnual = 0;
        
        try {
          // PASO 1: Cargar capa de luces nocturnas para consumo energético
          const nightImg = new Image();
          nightImg.crossOrigin = "Anonymous";
          nightImg.src = nightWmsUrl;

          nightImg.onload = () => {
            const nightCanvas = document.createElement("canvas");
            nightCanvas.width = tileSize;
            nightCanvas.height = tileSize;
            const nightCtx = nightCanvas.getContext("2d");
            nightCtx.drawImage(nightImg, 0, 0);
            const nightPixel = nightCtx.getImageData(pixelX, pixelY, 1, 1).data;
            const nightBrightness = (nightPixel[0] + nightPixel[1] + nightPixel[2]) / 3 / 255;
            
            consumo_energetico = (radius/1000)*(radius/1000)*nightBrightness * Math.PI * 800;
            consumo_energetico = consumo_energetico.toFixed(2);
            
            console.log(`Estimación energética: ${consumo_energetico} kWh/año`);
            
            // PASO 2: Cargar capa de aerosoles para contaminación
            const aerosolImg = new Image();
            aerosolImg.crossOrigin = "Anonymous";
            aerosolImg.src = aerosolWmsUrl;
            
            aerosolImg.onload = () => {
              const aerosolCanvas = document.createElement("canvas");
              aerosolCanvas.width = tileSize;
              aerosolCanvas.height = tileSize;
              const aerosolCtx = aerosolCanvas.getContext("2d");
              aerosolCtx.drawImage(aerosolImg, 0, 0);
              const aerosolPixel = aerosolCtx.getImageData(pixelX, pixelY, 1, 1).data;
              const aerosolBrightness = (aerosolPixel[0] + aerosolPixel[1] + aerosolPixel[2]) / 3 / 255;
              
              // Calcular estimado de contaminación anual
              const areaKm2 = (radius / 1000) * (radius / 1000) * Math.PI;
              contaminacionAnual = (areaKm2 * aerosolBrightness * 1000).toFixed(2);
              
              let level = "";
              if (aerosolBrightness < 0.1) level = "Muy bajo";
              else if (aerosolBrightness < 0.3) level = "Bajo";
              else if (aerosolBrightness < 0.6) level = "Medio";
              else level = "Alto";
              
              console.log(`Contaminación estimada anual: ${contaminacionAnual} toneladas de aerosoles/año`);
              
              setBrightnessInfo(`Energía: ${consumo_energetico} kWh/año | Aerosoles: ${level} (${contaminacionAnual} ton/año)`);
            };
            
            aerosolImg.onerror = () => {
              setBrightnessInfo(`Energía: ${consumo_energetico} kWh/año | Error al cargar datos de aerosoles`);
            };
          };

          nightImg.onerror = () => {
            setBrightnessInfo("No se pudo cargar la imagen del tile de luces nocturnas.");
          };
        } catch (err) {
          setBrightnessInfo("Error al estimar el valor.");
        }
      },
    });
    return null;
  }

  return (
    <div style={{ height: "500px", width: "100%" }}>
      <MapContainer
        center={[32.65, -115.47]}
        minZoom={5}
        maxZoom={21}
        zoom={7}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

                <WMSTileLayer
          url={nightLink[0]}
          layers={nightLink[1]}
          format="image/png"
          transparent={true}
          version="1.3.0"
          opacity={0.7}
        />
        <WMSTileLayer
          url={wmsLinks[0]}
          layers={wmsLinks[1]}
          format="image/png"
          transparent={true}
          version="1.3.0"
          opacity={0.7}
          {...(wmsLinks[2] && { params: { time: wmsLinks[2] } })}
        />
        
        <Marker position={center} opacity={1.0}>
          <Popup>Ubicación seleccionada</Popup>
        </Marker>

        <Circle
          center={center}
          radius={radius}
          pathOptions={{
            color: color,
            fillColor: color,
            fillOpacity: 0.3,
          }}
        />

        <ClickHandler />

        {popup && (
          <Popup position={[popup.lat, popup.lng]}>
            <div style={{ maxWidth: 300, wordBreak: "break-all" }}>
              <b>Datos ambientales:</b>
              <div>{brightnessInfo}</div>
              <div style={{ fontSize: "0.85em", marginTop: "8px", color: "#666" }}>
                Lat: {popup.lat.toFixed(4)}, Lng: {popup.lng.toFixed(4)}
              </div>
            </div>
          </Popup>
        )}
      </MapContainer>
    </div>
  );
}