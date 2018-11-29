
//從這裡改 點下男生圖長出男生軌跡 點下女生圖長出女生軌跡
// 按下男生的要show女生的要hide
$(document).ready(function(){
    
  google.charts.load("current", {packages:["sankey"]});
  google.charts.setOnLoadCallback(drawChartMale);
  google.charts.setOnLoadCallback(drawChartFemale);
   function drawChartMale() {
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'From');
    data.addColumn('string', 'To');
    data.addColumn('number', 'percent');
    data.addRows([
       [ '1_High', '2_High', 13.61 ],
       [ '1_High', '2_Med', 8.44 ],
       [ '1_High', '2_Low', 6.66 ],
       [ '1_Med', '2_High', 8.04 ],
       [ '1_Med', '2_Med', 13.31 ],
       [ '1_Med', '2_Low', 11.93 ],
       [ '1_Low', '2_High', 7.21 ],
       [ '1_Low', '2_Med', 12.24 ],
       [ '1_Low', '2_Low', 18.56 ],
       
       [ '2_High', '3_High', 15.47 ],
       [ '2_High', '3_Med', 7.86 ],
       [ '2_High', '3_Low', 5.24 ],
       [ '2_Med', '3_High', 9.37 ],
       [ '2_Med', '3_Med', 13.84 ],
       [ '2_Med', '3_Low', 10.77 ],
       [ '2_Low', '3_High', 7.4 ],
       [ '2_Low', '3_Med', 11.88 ],
       [ '2_Low', '3_Low', 17.88 ],

       [ '3_High', '4_High', 18.85 ],
       [ '3_High', '4_Med', 8.73 ],
       [ '3_High', '4_Low', 4.64 ],
       [ '3_Med', '4_High', 12.19 ],
       [ '3_Med', '4_Med', 13 ],
       [ '3_Med', '4_Low', 8.38 ],
       [ '3_Low', '4_High', 9.27 ],
       [ '3_Low', '4_Med', 10.51 ],
       [ '3_Low', '4_Low', 14.42 ],
    ]);

    
    // Set chart options
    var options = {
      height:380,
      width: 600,
      sankey: {
        link: { colorMode: 'gradient',color: { fill: '#a6cee3' } },
        node: { colors: [ '#1f78b4' ],
                label: { color: '#0066FF' } },/*here*/
      }
    };

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.Sankey(document.getElementById('male_traj'));
    chart.draw(data, options);
   }
   function drawChartFemale() {
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'From');
    data.addColumn('string', 'To');
    data.addColumn('number', 'percent');
    data.addRows([
       [ '1_High', '2_High', 12.94 ],
       [ '1_High', '2_Med', 8.75 ],
       [ '1_High', '2_Low', 6.62 ],
       [ '1_Med', '2_High', 8.55 ],
       [ '1_Med', '2_Med', 12.86 ],
       [ '1_Med', '2_Low', 12.08 ],
       [ '1_Low', '2_High', 7.27 ],
       [ '1_Low', '2_Med', 12.58 ],
       [ '1_Low', '2_Low', 18.11 ],
       
       [ '2_High', '3_High', 14.81 ],
       [ '2_High', '3_Med', 8.58 ],
       [ '2_High', '3_Low', 5.36 ],
       [ '2_Med', '3_High', 9.8 ],
       [ '2_Med', '3_Med', 14 ],
       [ '2_Med', '3_Low', 10.4 ],
       [ '2_Low', '3_High', 7.9 ],
       [ '2_Low', '3_Med', 12.04 ],
       [ '2_Low', '3_Low', 17.11 ],

       [ '3_High', '4_High', 19.15 ],
       [ '3_High', '4_Med', 8.57 ],
       [ '3_High', '4_Low', 4.8 ],
       [ '3_Med', '4_High', 12.91 ],
       [ '3_Med', '4_Med', 13.27 ],
       [ '3_Med', '4_Low', 8.44 ],
       [ '3_Low', '4_High', 8.86 ],
       [ '3_Low', '4_Med', 9.98 ],
       [ '3_Low', '4_Low', 14.04 ],
    ]);

    
    // Set chart options
    var options = {
      width: 600,
      height:380,
      sankey: {
        link: { color: { fill: '#d799ae' } },
        node: { colors: [ '#a61d4c' ],
                label: { color: '#C10066' } },/*here*/
      }
    };

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.Sankey(document.getElementById('female_traj'));
    chart.draw(data, options);
   }


    $("#male").click(function(){
           $("#male_traj").show('fast');
           $("#female_traj").hide('fast');
   });
   $("#female").click(function(){
           $("#male_traj").hide('fast');
           $("#female_traj").show('fast');
   });
});
 