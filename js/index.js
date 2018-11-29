$( document ).ready(function() {
    $('.leftmenutrigger').on('click', function(e) {
    $('.side-nav').toggleClass("open");
    $('#wrapper').toggleClass("open");
    e.preventDefault();
   });
  });
  
  
  window.onload = function () {
      function dashboard(id, fData){
          var barColor = '#AAAAAA';
          function segColor(c){ return {Ischemic_Stroke:"#FFCCCC", sICH:"#FFDDAA",SAH:"#CCDDFF"}[c]; }/*here*/
          
          // compute total for each state.
          fData.forEach(function(d){d.total=d.freq.Ischemic_Stroke+d.freq.sICH+d.freq.SAH;});
          
          // function to handle histogram.
          function histoGram(fD){
              var hG={},    hGDim = {t: 60, r: 0, b: 30, l: 0};
              hGDim.w = 500 - hGDim.l - hGDim.r, 
              hGDim.h = 300 - hGDim.t - hGDim.b;
                  
              //create svg for histogram.
              var hGsvg = d3.select(id).append("svg")
                  .attr("width", hGDim.w + hGDim.l + hGDim.r)
                  .attr("height", hGDim.h + hGDim.t + hGDim.b).append("g")
                  .attr("transform", "translate(" + hGDim.l + "," + hGDim.t + ")");
      
              // create function for x-axis mapping.
              var x = d3.scale.ordinal().rangeRoundBands([0, hGDim.w], 0.1)
                      .domain(fD.map(function(d) { return d[0]; }));
      
              // Add x-axis to the histogram svg.
              hGsvg.append("g").attr("class", "x axis")
                  .attr("transform", "translate(0," + hGDim.h + ")")
                  .call(d3.svg.axis().scale(x).orient("bottom"));
      
              // Create function for y-axis map.
              var y = d3.scale.linear().range([hGDim.h, 0])
                      .domain([0, d3.max(fD, function(d) { return d[1]; })]);
      
              // Create bars for histogram to contain rectangles and freq labels.
              var bars = hGsvg.selectAll(".bar").data(fD).enter()
                      .append("g").attr("class", "bar");
              
              //create the rectangles.
              bars.append("rect")
                  .attr("x", function(d) { return x(d[0]); })
                  .attr("y", function(d) { return y(d[1]); })
                  .attr("width", x.rangeBand())
                  .attr("height", function(d) { return hGDim.h - y(d[1]); })
                  .attr('fill',barColor)
                  .on("mouseover",mouseover)// mouseover is defined below.
                  .on("mouseout",mouseout);// mouseout is defined below.
                  
              //Create the frequency labels above the rectangles.
              bars.append("text").text(function(d){ return d3.format(",")(d[1])})
                  .attr("x", function(d) { return x(d[0])+x.rangeBand()/2; })
                  .attr("y", function(d) { return y(d[1])-5; })
                  .attr("text-anchor", "middle");
              
              function mouseover(d){  // utility function to be called on mouseover.
                  // filter for selected state.
                  var st = fData.filter(function(s){ return s.State == d[0];})[0],
                      nD = d3.keys(st.freq).map(function(s){ return {type:s, freq:st.freq[s]};});
                     
                  // call update functions of pie-chart and legend.    
                  pC.update(nD);
                  leg.update(nD);
              }
              
              function mouseout(d){    // utility function to be called on mouseout.
                  // reset the pie-chart and legend.    
                  pC.update(tF);
                  leg.update(tF);
              }
              
              // create function to update the bars. This will be used by pie-chart.
              hG.update = function(nD, color){
                  // update the domain of the y-axis map to reflect change in frequencies.
                  y.domain([0, d3.max(nD, function(d) { return d[1]; })]);
                  
                  // Attach the new data to the bars.
                  var bars = hGsvg.selectAll(".bar").data(nD);
                  
                  // transition the height and color of rectangles.
                  bars.select("rect").transition().duration(500)
                      .attr("y", function(d) {return y(d[1]); })
                      .attr("height", function(d) { return hGDim.h - y(d[1]); })
                      .attr("fill", color);
      
                  // transition the frequency labels location and change value.
                  bars.select("text").transition().duration(500)
                      .text(function(d){ return d3.format(",")(d[1])})
                      .attr("y", function(d) {return y(d[1])-5; });            
              }        
              return hG;
          }
          
          // function to handle pieChart.
          function pieChart(pD){
              var pC ={},    pieDim ={w:250, h: 250};
              pieDim.r = Math.min(pieDim.w, pieDim.h) / 2;
                      
              // create svg for pie chart.
              var piesvg = d3.select(id).append("svg")
                  .attr("width", pieDim.w).attr("height", pieDim.h).append("g")
                  .attr("transform", "translate("+pieDim.w/2+","+pieDim.h/2+")");
              
              // create function to draw the arcs of the pie slices.
              var arc = d3.svg.arc().outerRadius(pieDim.r - 10).innerRadius(0);
      
              // create a function to compute the pie slice angles.
              var pie = d3.layout.pie().sort(null).value(function(d) { return d.freq; });
      
              // Draw the pie slices.
              piesvg.selectAll("path").data(pie(pD)).enter().append("path").attr("d", arc)
                  .each(function(d) { this._current = d; })
                  .style("fill", function(d) { return segColor(d.data.type); })
                  .on("mouseover",mouseover).on("mouseout",mouseout);
      
              // create function to update pie-chart. This will be used by histogram.
              pC.update = function(nD){
                  piesvg.selectAll("path").data(pie(nD)).transition().duration(500)
                      .attrTween("d", arcTween);
              }        
              // Utility function to be called on mouseover a pie slice.
              function mouseover(d){
                  // call the update function of histogram with new data.
                  hG.update(fData.map(function(v){ 
                      return [v.State,v.freq[d.data.type]];}),segColor(d.data.type));
              }
              //Utility function to be called on mouseout a pie slice.
              function mouseout(d){
                  // call the update function of histogram with all data.
                  hG.update(fData.map(function(v){
                      return [v.State,v.total];}), barColor);
              }
              // Animating the pie-slice requiring a custom function which specifies
              // how the intermediate paths should be drawn.
              function arcTween(a) {
                  var i = d3.interpolate(this._current, a);
                  this._current = i(0);
                  return function(t) { return arc(i(t));    };
              }    
              return pC;
          }
          
          // function to handle legend.
          function legend(lD){
              var leg = {};
                  
              // create table for legend.
              var legend = d3.select(id).append("table").attr('class','legend');
              
              // create one row per segment.
              var tr = legend.append("tbody").selectAll("tr").data(lD).enter().append("tr");
                  
              // create the first column for each segment.
              tr.append("td").append("svg").attr("width", '16').attr("height", '16').append("rect")
                  .attr("width", '16').attr("height", '16')
                  .attr("fill",function(d){ return segColor(d.type); });
                  
              // create the second column for each segment.
              tr.append("td").text(function(d){ return d.type;});
      
              // create the third column for each segment.
              tr.append("td").attr("class",'legendFreq')
                  .text(function(d){ return d3.format(",")(d.freq);});
      
              // create the fourth column for each segment.
              tr.append("td").attr("class",'legendPerc')
                  .text(function(d){ return getLegend(d,lD);});
      
              // Utility function to be used to update the legend.
              leg.update = function(nD){
                  // update the data attached to the row elements.
                  var l = legend.select("tbody").selectAll("tr").data(nD);
      
                  // update the frequencies.
                  l.select(".legendFreq").text(function(d){ return d3.format(",")(d.freq);});
      
                  // update the percentage column.
                  l.select(".legendPerc").text(function(d){ return getLegend(d,nD);});        
              }
              
              function getLegend(d,aD){ // Utility function to compute percentage.
                  return d3.format("%")(d.freq/d3.sum(aD.map(function(v){ return v.freq; })));
              }
      
              return leg;
          }
          
          // calculate total frequency by segment for all state.
          var tF = ['Ischemic_Stroke','sICH','SAH'].map(function(d){ 
              return {type:d, freq: d3.sum(fData.map(function(t){ return t.freq[d];}))}; 
          });    
          
          // calculate total frequency by state for all segment.
          var sF = fData.map(function(d){return [d.State,d.total];});
      
          var hG = histoGram(sF), // create the histogram.
              pC = pieChart(tF), // create the pie-chart.
              leg= legend(tF);  // create the legend.
      }
      var freqData=[
          {State:'under25',freq:{Ischemic_Stroke:1912, sICH:3421, SAH:741}}
          ,{State:'25to40',freq:{Ischemic_Stroke:10021, sICH:9305, SAH:2735}}
          ,{State:'41to50',freq:{Ischemic_Stroke:32802, sICH:21629, SAH:4770}}
          ,{State:'51to60',freq:{Ischemic_Stroke:76317, sICH:30285, SAH:5049}}
          ,{State:'61to70',freq:{Ischemic_Stroke:124540, sICH:30833, SAH:4103}}
          ,{State:'71to80',freq:{Ischemic_Stroke:165554, sICH:33013, SAH:3853}}
          ,{State:'80up',freq:{Ischemic_Stroke:94421, sICH:19040, SAH:2010}}
          
          
          ];
          
          dashboard('#dashboard',freqData);
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
        color: "#5599FF",/*here*/
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
        color: "#FF8888",/*here*/
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
        color: "#5599FF",/*here*/
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
        color: "#FF8888",/*here*/
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
        color: "#5599FF",/*here*/
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
        color: "#FF8888",/*here*/
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
  
    
    