function updateTreemap(newData) {
  // Set data
  series.data.setAll([
    {
      type: "All Roles",
      children: [
        {
          type: "Teachers",
          children: [
            { type: "Excellent", value: newData.teacher_exc },
            { type: "Good", value: newData.teacher_good },
            { type: "Average", value: newData.teacher_avg },
            { type: "Poor", value: newData.teacher_poor },
          ],
        },
        {
          type: "Marketers",
          children: [
            { type: "Excellent", value: newData.marketer_exc },
            { type: "Good", value: newData.marketer_good },
            { type: "Average", value: newData.marketer_avg },
            { type: "Poor", value: newData.marketer_poor },
          ],
        },
        {
          type: "Designers",
          children: [
            { type: "Excellent", value: newData.designer_exc },
            { type: "Good", value: newData.designer_good },
            { type: "Average", value: newData.designer_avg },
            { type: "Poor", value: newData.designer_poor },
          ],
        },
        {
          type: "Students",
          children: [
            { type: "Excellent", value: newData.student_exc },
            { type: "Good", value: newData.student_good },
            { type: "Average", value: newData.student_avg },
            { type: "Poor", value: newData.student_poor },
          ],
        },
        {
          type: "Other",
          children: [
            { type: "Excellent", value: newData.other_exc },
            { type: "Good", value: newData.other_good },
            { type: "Average", value: newData.other_avg },
            { type: "Poor", value: newData.other_poor },
          ],
        },
      ],
    },
  ]);
}

// Create root and chart
var root = am5.Root.new("treemap");

root.setThemes([am5themes_Animated.new(root)]);

var container = root.container.children.push(
  am5.Container.new(root, {
    width: am5.percent(100),
    height: am5.percent(100),
    layout: root.verticalLayout,
  })
);

var series = container.children.push(
  am5hierarchy.Treemap.new(root, {
    downDepth: 1,
    upDepth: 0,
    initialDepth: 1,
    valueField: "value",
    categoryField: "type",
    childDataField: "children",
    nodePaddingOuter: 20,
    nodePaddingInner: 10,
  })
);

series.set("selectedDataItem", series.dataItems[0]);

series.rectangles.template.setAll({
  fillOpacity: 0.7,
  cornerRadiusTL: 4,
  cornerRadiusTR: 4,
  cornerRadiusBL: 4,
  cornerRadiusBR: 4,
});

series.rectangles.template.states.create("hover", {
  //fill: am5.color(0x677935),
  fillOpacity: 1,
});

// Add breadcrumbs
container.children.unshift(
  am5hierarchy.BreadcrumbBar.new(root, {
    series: series,
  })
);
