import { VectorSource, fromLonLat, VectorLayer } from "./OL";

import { Circle } from "ol/geom";
import LayerStyle from "ol/style/Style";
import FillStyle from "ol/style/Fill";
import StrokeStyle from "ol/style/Stroke";
import Feature from "ol/Feature";

import { LocationByCountry } from "../utils/Countries";

function visualizeData({
  data = [],
  layer = "dataLayer",
  fill,
  stroke,
  varIndex,
  maxRadius = 1e6
}) {
  //debugger;
  if (window[layer]) {
    window[layer].getSource().clear();
  } else {
    window[layer] = new VectorLayer({
      source: new VectorSource(),
      style: new LayerStyle({
        stroke: new StrokeStyle({
          color: stroke || "grey",
          width: 1
        }),
        fill: new FillStyle({
          color: fill || "rgba(100, 100, 100, 0.2)"
        })
      })
    });
  }

  let layerSource = window[layer].getSource();

  data.shift();
  data.forEach(item => {
    let country = item[0],
      city = item[1];
    let lat,
      lon,
      coordinates = [];
    if (item.length < 7 && typeof item[varIndex] !== "undefined") {
      (async () => {
        // coordinates = await getCoordinatesByCity({
        //   city,
        //   country
        // });
        coordinates = geoCoding({ city, country });
      })();
      [lat, lon] = coordinates;
    } else {
      lat = parseFloat(item[item.length - 2]);
      lon = parseFloat(item[item.length - 1]);
      coordinates = [lat, lon];
      geoCoding({ city, country, coordinates });
    }

    let confirmed = parseFloat(item[item.length - 5]);

    if (!isNaN(lat)) {
      let radius = confirmed > 0 && confirmed <= 1000 ? 35000 : confirmed * 35;

      //console.log({ lat, lon, radius });
      //debugger;

      radius = item[varIndex] * 5000;
      if (radius >= maxRadius) radius = maxRadius;

      var circle = new Circle(fromLonLat([lon, lat]), radius);

      layerSource.addFeature(new Feature(circle));
    }
  });

  window.map.addLayer(window[layer]);
}

function geoCoding({ country, city }) {
  let coords = LocationByCountry({ country });
  //console.log({ country, coords });
  return coords;
}

module.exports = {
  visualizeData,
  geoCoding
};
