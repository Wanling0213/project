
    var totalVisitors = 23261;
    var visitorsDataSAH = {
        "SAH Male vs Female": [{
            click: visitorsChartDrilldownHandler,
            cursor: "pointer",
            explodeOnClick: false,
            innerRadius: "75%",
            legendMarkerType: "square",
            name: "SAH Stroke Male vs Female",
            radius: "100%",
            showInLegend: true,
            startAngle: 90,
            type: "doughnut",
            dataPoints: [
                { y: 10140, name: "男生", color: "#5599FF" },/*here*/
                { y: 13121, name: "女生", color: "#FF8888" }/*here*/
            ]
        }],
        "男生": [{/*here*/
            color: "#5599FF",/*here*/
            name: "男生",/*here*/
            type: "column",
            dataPoints: [
                { label: "25歲以下",x: 1, y: 225023 },
                { label: "25-40歲",x: 2, y: 248563 },
                { label: "41-50歲",x: 3, y: 288333 },
                { label: "51-60歲",x: 4, y: 301838 },
                { label: "61-70歲",x: 5, y: 282909 },
                { label: "71-80歲",x: 6, y: 281335 },
                { label: "80歲以上",x: 7, y: 244461 }
            ]
        }],
        "女生": [{/*here*/
            color: "#FF8888",/*here*/
            name: "女生",/*here*/
            type: "column",
            dataPoints: [
                { label: "25歲以下",x: 1, y: 21211 },
                { label: "25-40歲",x: 2, y: 258895 },
                { label: "41-50歲",x: 3, y: 306509 },
                { label: "51-60歲",x: 4, y: 332786 },
                { label: "61-70歲",x: 5, y: 342006 },
                { label: "71-80歲",x: 6, y: 350813 },
                { label: "80歲以上",x: 7, y: 26058 }
            ]
        }]
    };
    
    var newVSReturningVisitorsOptionsSAH = {
        animationEnabled: true,
        theme: "light2",
        title: {
            text: "蜘蛛網膜出血中風花費 男生vs女生"
        },
        
        legend: {
            fontFamily: "calibri",
            fontSize: 14,
            itemTextFormatter: function (e) {
                return e.dataPoint.name + ": " + Math.round(e.dataPoint.y / totalVisitors * 100) + "%";  
            }
        },
        data: []
    };
    
    var visitorsDrilldownedChartOptionsSAH = {
        animationEnabled: true,
        theme: "light2",
        axisX: {
            labelFontColor: "#717171",
            lineColor: "#a2a2a2",
            tickColor: "#a2a2a2"
        },
        axisY: {
            gridThickness: 0,
            includeZero: false,
            labelFontColor: "#717171",
            lineColor: "#a2a2a2",
            tickColor: "#a2a2a2",
            lineThickness: 1
        },
        data: []
    };
    
    var chart = new CanvasJS.Chart("chartSAH", newVSReturningVisitorsOptionsSAH);
    chart.options.data = visitorsDataSAH["SAH Male vs Female"];
    chart.render();
    
    function visitorsChartDrilldownHandler(e) {
        chart = new CanvasJS.Chart("chartSAH", visitorsDrilldownedChartOptionsSAH);
        chart.options.data = visitorsDataSAH[e.dataPoint.name];
        chart.options.title = { text: e.dataPoint.name }
        chart.render();
        $("#backButtonSAH").toggleClass("invisible");
    }
    
    $("#backButtonSAH").click(function() { 
        $(this).toggleClass("invisible");
        chart = new CanvasJS.Chart("chartSAH", newVSReturningVisitorsOptionsSAH);
        chart.options.data = visitorsDataSAH["SAH Male vs Female"];
        chart.render();
    });



