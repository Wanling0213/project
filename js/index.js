$( document ).ready(function() {
  $('.leftmenutrigger').on('click', function(e) {
  $('.side-nav').toggleClass("open");
  $('#wrapper').toggleClass("open");
  e.preventDefault();
 });
});


window.onload = function () {
var chart_Is = new CanvasJS.Chart("LineChart_Is", {
  width:750,
  height:275,
  animationEnabled: true,
  theme: "light2",
  title:{
      text: "中風年齡人數分佈(總人數:505567)"
  },
  axisX:{
      valueFormatString: "DD MMM",
      crosshair: {
          enabled: true,
          snapToDataPoint: true
      }
  },
  axisY: {
      title: "中風人數",
      crosshair: {
          enabled: true
      }
  },
  toolTip:{
      shared:true
  },  
  legend:{
      cursor:"pointer",
      verticalAlign: "bottom",
      horizontalAlign: "left",
      dockInsidePlotArea: true,
      itemclick: toogleDataSeries
  },
  data: [{
      type: "line",
      showInLegend: true,
      name: "All",
      markerType: "square",
      xValueFormatString: "DD MMM, YYYY",
      color: "#585f66",
      dataPoints: [
          { label: "25歲以下",x: 1, y: 1912 },
          { label: "25-40歲",x: 2, y: 10021 },
          { label: "41-50歲",x: 3, y: 32082 },
          { label: "51-60歲",x: 4, y: 76317 },
          { label: "61-70歲",x: 5, y: 124540 },
          { label: "71-80歲",x: 6, y: 165554 },
          { label: "80歲以上",x: 7, y: 94421 }
      ]
  },
  {
      type: "line",
      showInLegend: true,
      name: "Male",
      lineDashType: "dash",
      dataPoints: [
          { label: "25歲以下",x: 1, y: 1064 },
          { label: "25-40歲",x: 2, y: 6705 },
          { label: "41-50歲",x: 3, y: 22499 },
          { label: "51-60歲",x: 4, y: 51453 },
          { label: "61-70歲",x: 5, y: 73576 },
          { label: "71-80歲",x: 6, y: 91657 },
          { label: "80歲以上",x: 7, y: 44476 }
      ]
  },
  {
      type: "line",
      showInLegend: true,
      name: "Female",
      lineDashType: "dash",
      dataPoints: [
          { label: "25歲以下",x: 1, y: 848 },
          { label: "25-40歲",x: 2, y: 3316 },
          { label: "41-50歲",x: 3, y: 10303},
          { label: "51-60歲",x: 4, y: 24864 },
          { label: "61-70歲",x: 5, y: 50964 },
          { label: "71-80歲",x: 6, y: 73897 },
          { label: "80歲以上",x: 7, y: 49945 }
      ]
  }]
});
chart_Is.render();

function toogleDataSeries(e){
	if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
		e.dataSeries.visible = false;
	} else{
		e.dataSeries.visible = true;
	}
  chart_Is.render();
}
var chart_sICH = new CanvasJS.Chart("LineChart_sICH", {
  width:750,
  height:275,
  animationEnabled: true,
  theme: "light2",
  title:{
      text: "中風年齡人數分佈(總人數:147526）"
  },
  axisX:{
      valueFormatString: "DD MMM",
      crosshair: {
          enabled: true,
          snapToDataPoint: true
      }
  },
  axisY: {
      title: "中風人數",
      crosshair: {
          enabled: true
      }
  },
  toolTip:{
      shared:true
  },  
  legend:{
      cursor:"pointer",
      verticalAlign: "bottom",
      horizontalAlign: "left",
      dockInsidePlotArea: true,
      itemclick: toogleDataSeries
  },
  data: [{
      type: "line",
      showInLegend: true,
      name: "All",
      markerType: "square",
      xValueFormatString: "DD MMM, YYYY",
      color: "#585f66",
      dataPoints: [
          { label: "25歲以下",x: 1, y: 3421 },
          { label: "25-40歲",x: 2, y: 9305 },
          { label: "41-50歲",x: 3, y: 21629 },
          { label: "51-60歲",x: 4, y: 30285 },
          { label: "61-70歲",x: 5, y: 30833 },
          { label: "71-80歲",x: 6, y: 33013 },
          { label: "80歲以上",x: 7, y: 19040 }
      ]
  },
  {
      type: "line",
      showInLegend: true,
      name: "Male",
      lineDashType: "dash",
      dataPoints: [
          { label: "25歲以下",x: 1, y: 2050 },
          { label: "25-40歲",x: 2, y: 6810 },
          { label: "41-50歲",x: 3, y: 16083 },
          { label: "51-60歲",x: 4, y: 20741 },
          { label: "61-70歲",x: 5, y: 19189 },
          { label: "71-80歲",x: 6, y: 19406 },
          { label: "80歲以上",x: 7, y: 10095 }
      ]
  },
  {
      type: "line",
      showInLegend: true,
      name: "Female",
      lineDashType: "dash",
      dataPoints: [
          { label: "25歲以下",x: 1, y: 1371 },
          { label: "25-40歲",x: 2, y: 2495 },
          { label: "41-50歲",x: 3, y: 5546 },
          { label: "51-60歲",x: 4, y: 9544 },
          { label: "61-70歲",x: 5, y: 11644 },
          { label: "71-80歲",x: 6, y: 13607 },
          { label: "80歲以上",x: 7, y: 8945 }
      ]
  }]
});
chart_sICH.render();

function toogleDataSeries(e){
	if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
		e.dataSeries.visible = false;
	} else{
		e.dataSeries.visible = true;
	}
  chart_sICH.render();
}
var chart_SAH = new CanvasJS.Chart("LineChart_SAH", {
  width:750,
  height:275,
  animationEnabled: true,
  theme: "light2",
  title:{
      text: "中風年齡人數分佈(總人數:23261)"
  },
  axisX:{
      valueFormatString: "DD MMM",
      crosshair: {
          enabled: true,
          snapToDataPoint: true
      }
  },
  axisY: {
      title: "中風人數",
      crosshair: {
          enabled: true
      }
  },
  toolTip:{
      shared:true
  },  
  legend:{
      cursor:"pointer",
      verticalAlign: "bottom",
      horizontalAlign: "left",
      dockInsidePlotArea: true,
      itemclick: toogleDataSeries
  },
  data: [{
      type: "line",
      showInLegend: true,
      name: "All",
      markerType: "square",
      xValueFormatString: "DD MMM, YYYY",
      color: "#585f66",
      dataPoints: [
          { label: "25歲以下",x: 1, y: 741 },
          { label: "25-40歲",x: 2, y: 2735 },
          { label: "41-50歲",x: 3, y: 4770 },
          { label: "51-60歲",x: 4, y: 5049 },
          { label: "61-70歲",x: 5, y: 4103 },
          { label: "71-80歲",x: 6, y: 3853 },
          { label: "80歲以上",x: 7, y: 2010 }
      ]
  },
  {
      type: "line",
      showInLegend: true,
      name: "Male",
      lineDashType: "dash",
      dataPoints: [
          { label: "25歲以下",x: 1, y: 436 },
          { label: "25-40歲",x: 2, y: 1518 },
          { label: "41-50歲",x: 3, y: 2361 },
          { label: "51-60歲",x: 4, y: 2245 },
          { label: "61-70歲",x: 5, y: 1553 },
          { label: "71-80歲",x: 6, y: 1395 },
          { label: "80歲以上",x: 7, y: 632 }
      ]
  },
  {
      type: "line",
      showInLegend: true,
      name: "Female",
      lineDashType: "dash",
      dataPoints: [
          { label: "25歲以下",x: 1, y: 305 },
          { label: "25-40歲",x: 2, y: 1217 },
          { label: "41-50歲",x: 3, y: 2409 },
          { label: "51-60歲",x: 4, y: 2804 },
          { label: "61-70歲",x: 5, y: 2550 },
          { label: "71-80歲",x: 6, y: 2458 },
          { label: "80歲以上",x: 7, y: 1378 }
      ]
  }]
});
chart_SAH.render();

function toogleDataSeries(e){
	if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
		e.dataSeries.visible = false;
	} else{
		e.dataSeries.visible = true;
	}
  chart_SAH.render();
}
var chart = new CanvasJS.Chart("Piechart", {
  height:300,
  exportEnabled: true,
  animationEnabled: true,
  title:{
    text: "腦中風種類"
  },
  legend:{
    cursor: "pointer",
    itemclick: explodePie
  },
  data: [{
    type: "pie",
    // showInLegend: true,
    toolTipContent: "{name}: <strong>{y}%</strong>",
    indexLabel: "{name} - {y}%",
    dataPoints: [
      { y: 75, name: "缺血性中風", exploded: true },
      { y: 22, name: "顱內出血" },
      { y: 3, name: " 蜘蛛網膜下腔出血" },
    ]
  }]
});
chart.render();
function explodePie (e) {
  // if(typeof (e.dataSeries.dataPoints[e.dataPointIndex].exploded) === "undefined" || !e.dataSeries.dataPoints[e.dataPointIndex].exploded) {
  //   e.dataSeries.dataPoints[e.dataPointIndex].exploded = true;
  // } else {
  //   e.dataSeries.dataPoints[e.dataPointIndex].exploded = false;
  // }
  e.chart.render();

}


}

  
  