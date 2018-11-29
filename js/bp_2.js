var data=[
        // group1 start (less than 20---"<=20")
        ['group1','出院',62,37],
        ['group1','門診',370,235],
        ['group1','轉院',33,21],
        ['group1','死亡',7,8],
        ['group1','病危',0,4],
        ['group1','其他',12,5],
        // group1 end
        // group2 start (">20 and <=30")
        ['group2','出院',88,82],
        ['group2','門診',1720,787],
        ['group2','轉院',182,66],
        ['group2','死亡',76,39],
        ['group2','病危',20,9],
        ['group2','其他',71,20],
        // group2 end
        // group3 start (">30 and <=40")
        ['group3','出院',239,125],
        ['group3','門診',5947,2325],
        ['group3','轉院',549,190],
        ['group3','死亡',232,95],
        ['group3','病危',72,28],
        ['group3','其他',175,64],
        // group3 end
        // group4 start (">40 and <=50")
        ['group4','出院',504,231],
        ['group4','門診',14338,6113],
        ['group4','轉院',1298,530],
        ['group4','死亡',507,221],
        ['group4','病危',207,98],
        ['group4','其他',383,177],
        // group4 end
        // group5 start (">50 and <=60")
        ['group5','出院',689,407],
        ['group5','門診',20542,12606],
        ['group5','轉院',2011,1226],
        ['group5','死亡',627,379],
        ['group5','病危',371,214],
        ['group5','其他',510,359],
        // group5 end
        // group6 start (">60")
        ['group6','出院',1090,636],
        ['group6','門診',25926,19232],
        ['group6','轉院',2823,2098],
        ['group6','死亡',1126,753],
        ['group6','病危',524,520],
        ['group6','其他',784,670]
        // group6 end
    ];
    var color_B ={group1:"#AA0000", group2:"#EE7700",  group3:"#FFCC22", group4:"#008800", group5:"#0044BB", group6:"#7700BB"};
    var color_G ={group1:"#FF88C2", group2:"#FFAA33",  group3:"#FFDD55", group4:"#66DD00", group5:"#77DDFF", group6:"#5599FF"};
    var svg = d3.select("#bp2").append("svg").attr("width", 960).attr("height", 800);
    
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
      
      g[i].append("text").attr("x",-50).attr("y",-8).style("text-anchor","middle").text("年齡");
      g[i].append("text").attr("x", 250).attr("y",-8).style("text-anchor","middle").text("歸轉結果");
      
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
    d3.select("#bp2").style("height", "800px");