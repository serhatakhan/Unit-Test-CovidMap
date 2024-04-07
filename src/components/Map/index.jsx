import { Link } from "react-router-dom";
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
  Graticule,
} from "react-simple-maps";

const Map = ({setTooltipContent}) => {

  const geoUrl = "https://ismailarilik.com/react-covid-maps/geo.json";

  return (
    // height={350} yaparak haritayı sayfanın daha üstünde konumlandırdık / scale: 130 de haritanın büyüklüğü
    <ComposableMap height={350} projectionConfig={{ rotate: [-10, 0, 0], scale: 130 }}>
      <ZoomableGroup>
        <Sphere stroke="gray" strokeWidth={0.2} />
        <Graticule stroke="gray" strokeWidth={0.2} />
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              return (
                <Link to={`/detail/${geo.id}`} key={geo.rsmKey}>
                  <Geography
                    geography={geo}
                    onMouseEnter={() => setTooltipContent(geo.properties.name)}
                    onMouseLeave={() => setTooltipContent('')}
                    style={{
                      default: {
                        fill: "#020617",
                        stroke: "#fff", // Sınır çizgisi rengi
                        strokeWidth: 0.12, // Sınır çizgisi kalınlığı
                      },
                      hover: {
                        fill: "rgb(54, 197, 94)",
                        stroke: "#fff",
                        strokeWidth: 0.2,
                      },
                    }}
                  />
                </Link>
              );
            })
          }
        </Geographies>
      </ZoomableGroup>
    </ComposableMap>
  );
};

export default Map;
