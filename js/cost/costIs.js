

    var totalVisitors = 505567;
        var visitorsDataIs = {
            "Ischemic Stroke Male vs Female": [{
                click: visitorsChartDrilldownHandler,
                cursor: "pointer",
                explodeOnClick: false,
                innerRadius: "75%",
                legendMarkerType: "square",
                name: "Ischemic Stroke Male vs Female",
                radius: "100%",
                showInLegend: true,
                startAngle: 90,
                type: "doughnut",
                dataPoints: [
                    { y: 291430, name: "Male", color: "#1a4df3" },
                    { y: 214137, name: "Female", color: "#f33" }
                ]
            }],
            "Male": [{
                color: "#1a4df3",
                name: "男性",
                type: "column",
                dataPoints: [
                    { label: "25歲以下",x: 1, y: 177351 },
                    { label: "25-40歲",x: 2, y: 85278 },
                    { label: "41-50歲",x: 3, y: 68140 },
                    { label: "51-60歲",x: 4, y: 65363},
                    { label: "61-70歲",x: 5, y: 69894 },
                    { label: "71-80歲",x: 6, y: 80454 },
                    { label: "80歲以上",x: 7, y: 97143 }
                ]
            }],
            "Female": [{
                color: "#f33",
                name: "Female",
                type: "column",
                dataPoints: [
                    { label: "25歲以下",x: 1, y: 160518 },
                    { label: "25-40歲",x: 2, y: 106468 },
                    { label: "41-50歲",x: 3, y: 67701 },
                    { label: "51-60歲",x: 4, y: 65956 },
                    { label: "61-70歲",x: 5, y: 70523 },
                    { label: "71-80歲",x: 6, y: 82052 },
                    { label: "80歲以上",x: 7, y: 96986 }
                ]
            }]
        };
        
        var newVSReturningVisitorsOptionsIs = {
            animationEnabled: true,
            theme: "light2",
            title: {
                text: "缺血性腦中風花費 男生vs女生"
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
        
        var visitorsDrilldownedChartOptionsIs = {
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
        
        var chart = new CanvasJS.Chart("chartIs", newVSReturningVisitorsOptionsIs);
        chart.options.data = visitorsDataIs["Ischemic Stroke Male vs Female"];
        chart.render();
        
        function visitorsChartDrilldownHandler(e) {
            chart = new CanvasJS.Chart("chartIs", visitorsDrilldownedChartOptionsIs);
            chart.options.data = visitorsDataIs[e.dataPoint.name];
            chart.options.title = { text: e.dataPoint.name }
            chart.render();
            $("#backButtonIs").toggleClass("invisible");
        }
        
        $("#backButtonIs").click(function() { 
            $(this).toggleClass("invisible");
            chart = new CanvasJS.Chart("chartIs", newVSReturningVisitorsOptionsIs);
            chart.options.data = visitorsDataIs["Ischemic Stroke Male vs Female"];
            chart.render();
        });
    


