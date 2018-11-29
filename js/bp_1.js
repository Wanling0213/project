var data=[
        // group1 start (less than 25---"<25")
        ['group1','出院',243,137],
        ['group1','門診',2427,1794],
        ['group1','轉院',425,251],
        ['group1','死亡',296,247],
        ['group1','病危',43,27],
        ['group1','其他',116,70],
        // group1 end
        // group2 start (">=25 and <=40")
        ['group2','出院',525,294],
        ['group2','門診',10922,5204],
        ['group2','轉院',1842,766],
        ['group2','死亡',1125,490],
        ['group2','病危',307,136],
        ['group2','其他',312,138],
        // group2 end
        // group3 start (">=41 and <=50")
        ['group3','出院',1188,629],
        ['group3','門診',31345,14130],
        ['group3','轉院',4307,1857],
        ['group3','死亡',2629,1027],
        ['group3','病危',809,351],
        ['group3','其他',665,264],
        // group3 end
        // group4 start (">=51 and <=60")
        ['group4','出院',2080,1140],
        ['group4','門診',60511,29948],
        ['group4','轉院',6711,3332],
        ['group4','死亡',2868,1582],
        ['group4','病危',1230,642],
        ['group4','其他',1039,568],
        // group4 end
        // group5 start (">=61 and <=70")
        ['group5','出院',2690,1839],
        ['group5','門診',77590,53359],
        ['group5','轉院',8833,6025],
        ['group5','死亡',2701,1917],
        ['group5','病危',1199,978],
        ['group5','其他',1305,1040],
        // group5 end
        // group6 start (">=71 and <=80")
        ['group6','出院',4002,2389],
        ['group6','門診',88651,71758],
        ['group6','轉院',11417,9021],
        ['group6','死亡',4534,3070],
        ['group6','病危',1752,1930],
        ['group6','其他',2102,1794]
        // group6 end
        // // group7 start (">80") 這裡有bug
        // ['group7','出院',2217,1561],
        // ['group7','門診治療',40368,44267],
        // ['group7','轉院',6187,7385],
        // ['group7','死亡',3636,3405],
        // ['group7','病危',1374,2205],
        // ['group7','其他',1421,1445]
        // // group7 end
    ];
    var color_B ={group1:"#AA0000", group2:"#EE7700",  group3:"#FFCC22", group4:"#008800", group5:"#0044BB", group6:"#7700BB"};
    var color_G ={group1:"#FF88C2", group2:"#FFAA33",  group3:"#FFDD55", group4:"#66DD00", group5:"#77DDFF", group6:"#5599FF"};
    var svg = d3.select("#bp1").append("svg").attr("width", 960).attr("height", 800);
    
    svg.append("text").attr("x",250).attr("y",50)
      .attr("class","header").text("男生");
      
    svg.append("text").attr("x",750).attr("y",50)
      .attr("class","header").text("女生");
    
    var g =[svg.append("g").attr("transform","translate(150,100)")
        ,svg.append("g").attr("transform","translate(650,100)")];
    
    var bp=[ viz.bP()
        .data(data)
        .min(12)
        .pad(1)
        .height(600)
        .width(200)
        .barSize(35)
        .fill(d=>color_B[d.primary])		
      ,viz.bP()
        .data(data)
        .value(d=>d[3])
        .min(12)
        .pad(1)
        .height(600)
        .width(200)
        .barSize(35)
        .fill(d=>color_G[d.primary])
    ];
        
    [0,1].forEach(function(i){
      g[i].call(bp[i])
      
      g[i].append("text").attr("x",-50).attr("y",-8).style("text-anchor","middle").text("年齡");/*here*/
      g[i].append("text").attr("x", 250).attr("y",-8).style("text-anchor","middle").text("轉歸結果");/*here*/
      
      g[i].append("line").attr("x1",-100).attr("x2",0);
      g[i].append("line").attr("x1",200).attr("x2",300);
      
      g[i].append("line").attr("y1",610).attr("y2",610).attr("x1",-100).attr("x2",0);
      g[i].append("line").attr("y1",610).attr("y2",610).attr("x1",200).attr("x2",300);
      
      g[i].selectAll(".mainBars")
        .on("mouseover",mouseover)
        .on("mouseout",mouseout);
    
      g[i].selectAll(".mainBars").append("text").attr("class","label")
        .attr("x",d=>(d.part=="primary"? -30: 30))
        .attr("y",d=>+6)
        .text(d=>d.key)
        .attr("text-anchor",d=>(d.part=="primary"? "end": "start"));
      
      g[i].selectAll(".mainBars").append("text").attr("class","perc")
        .attr("x",d=>(d.part=="primary"? -100: 80))
        .attr("y",d=>+6)
            .text(function(d){ return d3.format("0.0%")(d.percent)})
        .attr("text-anchor",d=>(d.part=="primary"? "end": "start"));
    });
    
    function mouseover(d){
      [0,1].forEach(function(i){
        bp[i].mouseover(d);
        
        g[i].selectAll(".mainBars").select(".perc")
        .text(function(d){ return d3.format("0.0%")(d.percent)});
      });
    }
    function mouseout(d){
      [0,1].forEach(function(i){
        bp[i].mouseout(d);
        
        g[i].selectAll(".mainBars").select(".perc")
        .text(function(d){ return d3.format("0.0%")(d.percent)});
      });
    }
    d3.select("#bp1").style("height", "1000px");