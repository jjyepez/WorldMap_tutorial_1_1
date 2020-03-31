import React, { useState, useEffect } from "react";
import "./styles.css";
import "ol/ol.css";

import Map from "./components/Map";
import Sidebar from "./components/Sidebar";
import Scroller from "./components/Scroller";
import DataTableCountries from "./components/DataTable_Countries";

import DataSource from "./utils/DataSource";
import DatePicker from "./components/DatePicker";

import { visualizeData } from "./utils/OLShapes";

export default function App() {
  const [data, updateData] = useState([]);

  useEffect(() => {
    (async () => {
      let rslt = await DataSource.loadData({ date: "03-30-2020" });
      let groupedDataRaw = DataSource.groupByCountry({
        data: rslt.data,
        groupField: 3,
        sumFields: [7, 8, 9]
      });
      let groupedData = Object.keys(groupedDataRaw).map(country => {
        return [country, ...groupedDataRaw[country]];
      });
      let grouped = groupedData.sort((antItem, item) => item > antItem);
      grouped.sort((a, b) => {
        return b[1] - a[1];
      });
      updateData(grouped);

      visualizeData({
        data: grouped,
        maxRadius: 1200000,
        varIndex: 1,
        stroke: "chocolate",
        fill: "rgba(200,200,0,.15)",
        layer: "Confirmed"
      });
      visualizeData({
        data: grouped,
        maxRadius: 1200000,
        varIndex: 2,
        stroke: "red",
        fill: "rgba(200,0,0,.15)",
        layer: "Deaths"
      });
      visualizeData({
        data: grouped,
        maxRadius: 1200000,
        varIndex: 3,
        stroke: "green",
        fill: "rgba(0,200,0,.15)",
        layer: "Recovered"
      });
      // visualizeData({
      //   data: grouped,
      //   maxRadius: 1200000,
      //   varIndex: 4,
      //   stroke: "blue",
      //   fill: "rgba(0,0,200,.15)",
      //   layer: "Active"
      // });
    })();
  }, []);

  return (
    <div className="App">
      <Map id="myMap" />
      <Sidebar>
        <DatePicker />
        <legend>Paises</legend>
        <Scroller>
          <DataTableCountries data={data} />
        </Scroller>
      </Sidebar>
    </div>
  );
}
