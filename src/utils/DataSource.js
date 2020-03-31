async function loadData({ fields = [], date } = {}) {
  let data = [];

  let filename = date || "03-30-2020";

  let url = `https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/${filename}.csv`;
  let content = await fetch(url, { cache: "force-cache" }).then(rslt =>
    rslt.text()
  );
  let rawData = content.split("\n");
  data = rawData.map(reg => {
    let item;
    item = reg
      .replace(/"([\w|\s]*),\s([\w|\s]*),?\s?([\w|\s]*)?"/gi, "$1 $2 $3")
      .trim();
    item = item.split(",");
    return [...item];
  });
  let actualFields = data[0].map(key => {
    return key.split("/")[0].split("_")[0];
  });
  return {
    fields: actualFields,
    data
  };
}

function groupByCountry({ data, groupField, sumFields = [] }) {
  let grouped = {};
  data.forEach(item => {
    if (item && item[groupField]) {
      let group = item[groupField];
      if (!grouped[group]) {
        grouped[group] = Array(sumFields.length + 1).fill(0);
      }
      for (let i = 0; i <= sumFields.length - 1; i++) {
        grouped[group][i] += parseFloat(item[sumFields[i]]); // confirmed
      }
      //grouped[group][sumFields.length] += grouped[group][0] - 100;
    }
  });
  console.log({ grouped });
  return grouped;
}

module.exports = {
  loadData,
  groupByCountry
};
