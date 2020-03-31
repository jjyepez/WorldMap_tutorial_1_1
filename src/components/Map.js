import React, { useEffect, useState } from "react";
import "./css/Map.css";

import {
  Map as OLMap,
  View,
  TileLayer,
  XYZ,
  fromLonLat,
  OSM
} from "../utils/OL";

export default function Map({ mapId = "map" } = {}) {
  let [currentCoords, updateCurrentCoords] = useState([0, 0]);
  useEffect(() => {
    window.map = new OLMap({
      target: mapId,
      layers: [
        new TileLayer({
          //source: new OSM()
          source: new XYZ({
            url: "http://mt0.google.com/vt/lyrs=r&hl=en&x={x}&y={y}&z={z}"
          })
        })
      ],
      view: new View({
        center: fromLonLat(currentCoords), //fromLonLat([-74.12345, 4.0654]),
        minZoom: 2,
        zoom: 2
      })
    });
  }, [mapId, currentCoords]);
  return <div className="Map" id={mapId} />;
}
