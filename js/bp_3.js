var data=[
        // group1 start (less than 20---"<=20")
        ['group1','出院',11,10],
        ['group1','門診',101,56],
        ['group1','轉院',9,4],
        ['group1','死亡',2,3],
        ['group1','病危',0,1],
        ['group1','其他',2,1],
        // group1 end
        // group2 start (">20 and <=30")
        ['group2','出院',17,19],
        ['group2','門診',460,192],
        ['group2','轉院',36,11],
        ['group2','死亡',12,6],
        ['group2','病危',3,3],
        ['group2','其他',16,5],
        // group2 end
        // group3 start (">30 and <=40")
        ['group3','出院',62,33],
        ['group3','門診',1639,582],
        ['group3','轉院',132,48],
        ['group3','死亡',74,26],
        ['group3','病危',17,7],
        ['group3','其他',41,20],
        // group3 end
        // group4 start (">40 and <=50")
        ['group4','出院',151,51],
        ['group4','門診',4471,1764],
        ['group4','轉院',423,137],
        ['group4','死亡',159,60],
        ['group4','病危',71,26],
        ['group4','其他',127,54],
        // group4 end
        // group5 start (">50 and <=60")
        ['group5','出院',199,125],
        ['group5','門診',6541,3731],
        ['group5','轉院',651,350],
        ['group5','死亡',202,126],
        ['group5','病危',98,78],
        ['group5','其他',166,122],
        // group5 end
        // group6 start (">60")
        ['group6','出院',342,194],
        ['group6','門診',8402,5723],
        ['group6','轉院',882,625],
        ['group6','死亡',325,232],
        ['group6','病危',182,153],
        ['group6','其他',311,223]
        // group6 end
    ];
    var color ={group1:"#3366CC", group2:"#DC3912",  group3:"#FF9900", group4:"#109618", group5:"#990099", group6:"#0099C6"};
    var svg = d3.select("#bp3").append("svg").attr("width", 960).attr("height", 800);
    
    svg.append("text").attr("x",250).attr("y",50)
      .attr("class","header").text("Male");
      
    svg.append("text").attr("x",750).attr("y",50)
      .attr("class","header").text("Female");
    
    var g =[svg.append("g").attr("transform","translate(150,100)")
        ,svg.append("g").attr("transform","translate(650,100)")];
    
    var bp=[ viz.bP()
        .data(data)
        .min(12)
        .pad(1)
        .height(600)
        .width(200)
        .barSize(35)
        .fill(d=>color[d.primary])		
      ,viz.bP()
        .data(data)
        .value(d=>d[3])
        .min(12)
        .pad(1)
        .height(600)
        .width(200)
        .barSize(35)
        .fill(d=>color[d.primary])
    ];
        
    [0,1].forEach(function(i){
      g[i].call(bp[i])
      
      g[i].append("text").attr("x",-50).attr("y",-8).style("text-anchor","middle").text("Channel");
      g[i].append("text").attr("x", 250).attr("y",-8).style("text-anchor","middle").text("State");
      
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
    d3.select("#bp3").style("height", "800px");