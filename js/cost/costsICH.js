
    var totalVisitors = 147526;
    var visitorsDatasICH = {
        "sICH Male vs Female": [{
            click: visitorsChartDrilldownHandler,
            cursor: "pointer",
            explodeOnClick: false,
            innerRadius: "75%",
            legendMarkerType: "square",
            name: "sICH Stroke Male vs Female",
            radius: "100%",
            showInLegend: true,
            startAngle: 90,
            type: "doughnut",
            dataPoints: [
                { y: 94374, name: "男生", color: "#5599FF" },/*here*/
                { y: 53152, name: "女生", color: "#FF8888" }/*here*/
            ]
        }],
        "男生": [{/*here*/
            color: "#5599FF",/*here*/
            name: "男生",/*here*/
            type: "column",
            dataPoints: [
                { label: "25歲以下",x: 1, y: 282890 },
                { label: "25-40歲",x: 2, y: 222375 },
                { label: "41-50歲",x: 3, y: 190178 },
                { label: "51-60歲",x: 4, y: 183125 },
                { label: "61-70歲",x: 5, y: 179836 },
                { label: "71-80歲",x: 6, y: 190667 },
                { label: "80歲以上",x: 7, y: 189140 }
            ]
        }],
        "女生": [{/*here*/
            color: "#FF8888",/*here*/
            name: "女生",/*here*/
            type: "column",
            dataPoints: [
                { label: "25歲以下",x: 1, y: 278187 },
                { label: "25-40歲",x: 2, y: 227841 },
                { label: "41-50歲",x: 3, y: 196349 },
                { label: "51-60歲",x: 4, y: 192424 },
                { label: "61-70歲",x: 5, y: 195079 },
                { label: "71-80歲",x: 6, y: 196543 },
                { label: "80歲以上",x: 7, y: 163200 }
            ]
        }]
    };
    
    var newVSReturningVisitorsOptions_sICH = {
        animationEnabled: true,
        theme: "light2",
        title: {
            text: "顱內出血腦中風花費 男生vs女生"
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
    
    var visitorsDrilldownedChartOptions_sICH = {
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
    
    var chart = new CanvasJS.Chart("chartsICH", newVSReturningVisitorsOptions_sICH);
    chart.options.data = visitorsDatasICH["sICH Male vs Female"];
    chart.render();
    
    function visitorsChartDrilldownHandler(e) {
        chart = new CanvasJS.Chart("chartsICH", visitorsDrilldownedChartOptions_sICH);
        chart.options.data = visitorsDatasICH[e.dataPoint.name];
        chart.options.title = { text: e.dataPoint.name }
        chart.render();
        $("#backButtonsICH").toggleClass("invisible");
    }
    
    $("#backButtonsICH").click(function() { 
        $(this).toggleClass("invisible");
        chart = new CanvasJS.Chart("chartsICH", newVSReturningVisitorsOptions_sICH);
        chart.options.data = visitorsDatasICH["sICH Male vs Female"];
        chart.render();
    });



