function updatePieChart(newData) {
  // Set data
  pieSeries.data.setAll([
    {
      value: newData.excellent,
      category: "Excellent",
    },
    {
      value: newData.good,
      category: "Good",
    },
    {
      value: newData.average,
      category: "Average",
    },
    {
      value: newData.poor,
      category: "Poor",
    },
  ]);
  legend.data.setAll(pieSeries.dataItems);
}

// Create pieRoot element
var pieRoot = am5.Root.new("pieChart");

// Set themes
pieRoot.setThemes([am5themes_Dark.new(pieRoot)]);

// Create pieChart
var pieChart = pieRoot.container.children.push(
  am5percent.PieChart.new(pieRoot, {
    layout: pieRoot.verticalLayout,
  })
);

// Create series
var pieSeries = pieChart.series.push(
  am5percent.PieSeries.new(pieRoot, {
    alignLabels: true,
    calculateAggregates: true,
    valueField: "value",
    categoryField: "category",
  })
);

pieSeries.slices.template.setAll({
  strokeWidth: 1,
  stroke: am5.color("#20044c"),
});

pieSeries.labelsContainer.set("paddingTop", 30);

// Set up adapters for variable slice radius
pieSeries.slices.template.adapters.add("radius", function (radius, target) {
  var dataItem = target.dataItem;
  var high = pieSeries.getPrivate("valueHigh");

  if (dataItem) {
    var value = target.dataItem.get("valueWorking", 0);
    return (radius * value) / high;
  }
  return radius;
});

// Create legend
var legend = pieChart.children.push(
  am5.Legend.new(pieRoot, {
    centerX: am5.p50,
    x: am5.p50,
    marginTop: 15,
    marginBottom: 15,
  })
);

//Change color sets
pieSeries
  .get("colors")
  .set("colors", [
    am5.color(pieSeries.get("colors").getIndex(0)),
    am5.color(pieSeries.get("colors").getIndex(3)),
    am5.color(pieSeries.get("colors").getIndex(6)),
    am5.color(pieSeries.get("colors").getIndex(9)),
  ]);

pieSeries.labels.template.setAll({
  oversizedBehavior: "wrap",
  maxWidth: 100,
  textAlign: "center",
});

pieSeries.ticks.template.setAll({
  stroke: am5.color("#0899e2"),
  strokeWidth: 2,
  location: 1,
});

pieSeries.labels.template.set(
  "text",
  "{category}:\n{valuePercentTotal.formatNumber('0.0')}%"
);

// Play initial series animation
pieSeries.appear(1000, 100);
