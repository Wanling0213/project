   




//從這裡改 點下男生圖長出男生軌跡 點下女生圖長出女生軌跡
// 按下男生的要show女生的要hide
$(document).ready(function(){
  (function () {    
    const margin = 10;
    const width = 740;
    const height = 500;
    const svgBackground = "#fff";
    const svgBorder = "1px solid #fff";
    const nodeWidth = 24;
    const nodePadding = 16;
    const nodeOpacity = 0.8;
    const linkOpacity = 0.5;
    const nodeDarkenFactor = 0.3;
    const nodeStrokeWidth = 4;
    const arrow = "\u2192";
    const nodeAlignment = d3.sankeyCenter;
    const colorScale = d3.interpolateRainbow;
    const path = d3.sankeyLinkHorizontal();
    let initialMousePosition = {};
    let initialNodePosition = {};

    function addGradientStop(gradients, offset, fn) {
        return gradients.append("stop")
                        .attr("offset", offset)
                        .attr("stop-color", fn);
    }

    function color(index) {
        let ratio = index / (data.nodes.length - 1.0);
        return colorScale(ratio);
    }
    
    function darkenColor(color, factor) {
        return d3.color(color).darker(factor)
    }
    
    function getGradientId(d) {
        return `gradient_${d.source.id}_${d.target.id}`;
    }
    
    function getMousePosition(e) {
        e = e || d3.event;
        return {
            x: e.x,
            y: e.y
        };
    }
    
    function getNodePosition(node) {
        return {
            x: +node.attr("x"),
            y: +node.attr("y"),
            width: +node.attr("width"),
            height: +node.attr("height")
        };
    }
    
    function moveNode(node, position) {
        position.width = position.width || +(node.attr("width"));
        position.height = position.height || +(node.attr("height"));
        if (position.x < 0) {
            position.x = 0;
        }
        if (position.y < 0) {
            position.y = 0;
        }
        if (position.x + position.width > graphSize[0]) {
            position.x = graphSize[0] - position.width;
        }
        if (position.y + position.height > graphSize[1]) {
            position.y = graphSize[1] - position.height;
        }
        node.attr("x", position.x)
            .attr("y", position.y);
        let nodeData = node.data()[0];
        nodeData.x0 = position.x
        nodeData.x1 = position.x + position.width;
        nodeData.y0 = position.y;
        nodeData.y1 = position.y + position.height;
        sankey.update(graph);
        svgLinks.selectAll("linearGradient")
                .attr("x1", d => d.source.x1)
                .attr("x2", d => d.target.x0);
        svgLinks.selectAll("path")
                .attr("d", path);
    }
    
    function onDragDragging() {
        let currentMousePosition = getMousePosition(d3.event);
        let delta = {
            x: currentMousePosition.x - initialMousePosition.x,
            y: currentMousePosition.y - initialMousePosition.y
        };
        let thisNode = d3.select(this);
        let newNodePosition = {
            x: initialNodePosition.x + delta.x,
            y: initialNodePosition.y + delta.y,
            width: initialNodePosition.width,
            height: initialNodePosition.height
        };
        moveNode(thisNode, newNodePosition);        
    }
    
    function onDragEnd() {
        let node = d3.select(this)
                     .attr("stroke-width", 0);
    }
    
    function onDragStart() {
        let node = d3.select(this)
                     .raise()
                     .attr("stroke-width", nodeStrokeWidth);
        setInitialNodePosition(node);
        initialNodePosition = getNodePosition(node);
        initialMousePosition = getMousePosition(d3.event);
    }
    
    function reduceUnique(previous, current) {
        if (previous.indexOf(current) < 0) {
            previous.push(current);
        }
        return previous;
    }
    
    function setInitialMousePosition(e) {
        initialMousePosition.x = e.x;
        initialMousePosition.y = e.y;
    }
    
    function setInitialNodePosition(node) {
        let pos = node ? getNodePosition(node) : { x: 0, y: 0, width: 0, height: 0 };
        initialNodePosition.x = pos.x;
        initialNodePosition.y = pos.y;
        initialNodePosition.width = pos.width;
        initialNodePosition.height = pos.height;
    }
        
    function sumValues(previous, current) {
        previous += current;
        return previous;
    }
    
    const data = {
        nodes: [
            { id: "1_High" },
            { id: "1_Med" },
            { id: "1_Low" },
            { id: "2_High" },
            { id: "2_Med" },
            { id: "2_Low" },
            { id: "3_High" },
            { id: "3_Med" },
            { id: "3_Low" },
            { id: "4_High" },
            { id: "4_Med" },
            { id: "4_Low" }
        ],
        links: [
            { source: "1_High", target: "2_High", value: 13 },
            { source: "1_High", target: "2_Med", value:  8 },
            { source: "1_High", target: "2_Low", value:  6 },
            { source: "1_Med", target: "2_High", value: 8 },
            { source: "1_Med", target: "2_Med", value: 13 },
            { source: "1_Med", target: "2_Low", value:  11 },
            { source: "1_Low", target: "2_High", value: 7 },
            { source: "1_Low", target: "2_Med", value: 12 },
            { source: "1_Low", target: "2_Low", value:  18 },
            
            { source: "2_High", target: "3_High", value: 15 },
            { source: "2_High", target: "3_Med", value:  7 },
            { source: "2_High", target: "3_Low", value:  5 },
            { source: "2_Med", target: "3_High", value: 9 },
            { source: "2_Med", target: "3_Med", value: 13 },
            { source: "2_Med", target: "3_Low", value:  10 },
            { source: "2_Low", target: "3_High", value: 7 },
            { source: "2_Low", target: "3_Med", value: 11 },
            { source: "2_Low", target: "3_Low", value:  17 },
            
            { source: "3_High", target: "4_High", value: 18 },
            { source: "3_High", target: "4_Med", value:  8 },
            { source: "3_High", target: "4_Low", value:  4 },
            { source: "3_Med", target: "4_High", value: 12 },
            { source: "3_Med", target: "4_Med", value: 13 },
            { source: "3_Med", target: "4_Low", value:  8 },
            { source: "3_Low", target: "4_High", value: 9 },
            { source: "3_Low", target: "4_Med", value: 10 },
            { source: "3_Low", target: "4_Low", value:  14 }

        ]
    }

    const svg = d3.select("#canvas")
                  .attr("width", width)
                  .attr("height", height)
                  .style("background-color", svgBackground)
                  .style("border", svgBorder)
                  .append("g")
                  .attr("transform", `translate(${margin},${margin})`);
    
    // Define our sankey instance.
    const graphSize = [width - 2*margin, height - 2*margin];
    const sankey = d3.sankey()
                     .size(graphSize)
                     .nodeId(d => d.id)
                     .nodeWidth(nodeWidth)
                     .nodePadding(nodePadding)
                     .nodeAlign(nodeAlignment);
    let graph = sankey(data);
    
    // Loop through the nodes. Set additional properties to make a few things
    // easier to deal with later.
    graph.nodes.forEach(node => {
        let fillColor = color(node.index);
        node.fillColor = fillColor;
        node.strokeColor = darkenColor(fillColor, nodeDarkenFactor);
        node.width = node.x1 - node.x0;
        node.height = node.y1 - node.y0;
    });
    
    // Build the links.
    let svgLinks = svg.append("g")
                      .classed("links", true)
                      .selectAll("g")
                      .data(graph.links)
                      .enter()
                      .append("g");
    let gradients = svgLinks.append("linearGradient")
                            .attr("gradientUnits", "userSpaceOnUse")
                            .attr("x1", d => d.source.x1)
                            .attr("x2", d => d.target.x0)
                            .attr("id", d => getGradientId(d));
    addGradientStop(gradients, 0.0, d => color(d.source.index));
    addGradientStop(gradients, 1.0, d => color(d.target.index));
    svgLinks.append("path")
            .classed("link", true)
            .attr("d", path)
            .attr("fill", "none")
            .attr("stroke", d => `url(#${getGradientId(d)})`)
            .attr("stroke-width", d => Math.max(1.0, d.width))
            .attr("stroke-opacity", linkOpacity);
    
    // Add hover effect to links.
    svgLinks.append("title")
            .text(d => `${d.source.id} ${arrow} ${d.target.id}\n${d.value}`);

    let svgNodes = svg.append("g")
                      .classed("nodes", true)
                      .selectAll("rect")
                      .data(graph.nodes)
                      .enter()
                      .append("rect")
                      .classed("node", true)
                      .attr("x", d => d.x0)
                      .attr("y", d => d.y0)
                      .attr("width", d => d.width)
                      .attr("height", d => d.height)
                      .attr("fill", d => d.fillColor)
                      .attr("opacity", nodeOpacity)
                      .attr("stroke", d => d.strokeColor)
                      .attr("stroke-width", 0);
    
    let nodeDepths = graph.nodes
        .map(n => n.depth)
        .reduce(reduceUnique, []);
    
    nodeDepths.forEach(d => {
        let nodesAtThisDepth = graph.nodes.filter(n => n.depth === d);
        let numberOfNodes = nodesAtThisDepth.length;
        let totalHeight = nodesAtThisDepth
                            .map(n => n.height)
                            .reduce(sumValues, 0);
        let whitespace = graphSize[1] - totalHeight;
        let balancedWhitespace = whitespace / (numberOfNodes + 1.0);
        console.log("depth", d, "total height", totalHeight, "whitespace", whitespace, "balanced whitespace", balancedWhitespace);
    });
    
    // Add hover effect to nodes.
    svgNodes.append("title")
            .text(d => `${d.id}\n${d.value} unit(s)`);
            
    svgNodes.call(d3.drag()
                    .on("start", onDragStart)
                    .on("drag", onDragDragging)
                    .on("end", onDragEnd));

    console.log("sankey1.js loaded.");
})();
  // google.charts.load("current", {packages:["sankey"]});
  // google.charts.setOnLoadCallback(drawChartMale);
  // google.charts.setOnLoadCallback(drawChartFemale);
  //  function drawChartMale() {
  //   var data = new google.visualization.DataTable();
  //   data.addColumn('string', 'From');
  //   data.addColumn('string', 'To');
  //   data.addColumn('number', 'percent');
  //   data.addRows([
  //      [ '1_High', '2_High', 13.61 ],
  //      [ '1_High', '2_Med', 8.44 ],
  //      [ '1_High', '2_Low', 6.66 ],
  //      [ '1_Med', '2_High', 8.04 ],
  //      [ '1_Med', '2_Med', 13.31 ],
  //      [ '1_Med', '2_Low', 11.93 ],
  //      [ '1_Low', '2_High', 7.21 ],
  //      [ '1_Low', '2_Med', 12.24 ],
  //      [ '1_Low', '2_Low', 18.56 ],
       
  //      [ '2_High', '3_High', 15.47 ],
  //      [ '2_High', '3_Med', 7.86 ],
  //      [ '2_High', '3_Low', 5.24 ],
  //      [ '2_Med', '3_High', 9.37 ],
  //      [ '2_Med', '3_Med', 13.84 ],
  //      [ '2_Med', '3_Low', 10.77 ],
  //      [ '2_Low', '3_High', 7.4 ],
  //      [ '2_Low', '3_Med', 11.88 ],
  //      [ '2_Low', '3_Low', 17.88 ],

  //      [ '3_High', '4_High', 18.85 ],
  //      [ '3_High', '4_Med', 8.73 ],
  //      [ '3_High', '4_Low', 4.64 ],
  //      [ '3_Med', '4_High', 12.19 ],
  //      [ '3_Med', '4_Med', 13 ],
  //      [ '3_Med', '4_Low', 8.38 ],
  //      [ '3_Low', '4_High', 9.27 ],
  //      [ '3_Low', '4_Med', 10.51 ],
  //      [ '3_Low', '4_Low', 14.42 ],
  //   ]);

    
  //   // Set chart options
  //   var options = {
  //     height:380,
  //     width: 600,
  //     sankey: {
  //       link: { colorMode: 'gradient',color: { fill: '#a6cee3' } },
  //       node: { colors: [ '#1f78b4' ],
  //               label: { color: '#871b47' } },
  //     }
  //   };

  //   // Instantiate and draw our chart, passing in some options.
  //   var chart = new google.visualization.Sankey(document.getElementById('male_traj'));
  //   chart.draw(data, options);
  //  }
  //  function drawChartFemale() {
  //   var data = new google.visualization.DataTable();
  //   data.addColumn('string', 'From');
  //   data.addColumn('string', 'To');
  //   data.addColumn('number', 'percent');
  //   data.addRows([
  //      [ '1_High', '2_High', 12.94 ],
  //      [ '1_High', '2_Med', 8.75 ],
  //      [ '1_High', '2_Low', 6.62 ],
  //      [ '1_Med', '2_High', 8.55 ],
  //      [ '1_Med', '2_Med', 12.86 ],
  //      [ '1_Med', '2_Low', 12.08 ],
  //      [ '1_Low', '2_High', 7.27 ],
  //      [ '1_Low', '2_Med', 12.58 ],
  //      [ '1_Low', '2_Low', 18.11 ],
       
  //      [ '2_High', '3_High', 14.81 ],
  //      [ '2_High', '3_Med', 8.58 ],
  //      [ '2_High', '3_Low', 5.36 ],
  //      [ '2_Med', '3_High', 9.8 ],
  //      [ '2_Med', '3_Med', 14 ],
  //      [ '2_Med', '3_Low', 10.4 ],
  //      [ '2_Low', '3_High', 7.9 ],
  //      [ '2_Low', '3_Med', 12.04 ],
  //      [ '2_Low', '3_Low', 17.11 ],

  //      [ '3_High', '4_High', 19.15 ],
  //      [ '3_High', '4_Med', 8.57 ],
  //      [ '3_High', '4_Low', 4.8 ],
  //      [ '3_Med', '4_High', 12.91 ],
  //      [ '3_Med', '4_Med', 13.27 ],
  //      [ '3_Med', '4_Low', 8.44 ],
  //      [ '3_Low', '4_High', 8.86 ],
  //      [ '3_Low', '4_Med', 9.98 ],
  //      [ '3_Low', '4_Low', 14.04 ],
  //   ]);

    
  //   // Set chart options
  //   var options = {
  //     width: 600,
  //     height:380,
  //     sankey: {
  //       link: { color: { fill: '#d799ae' } },
  //       node: { colors: [ '#a61d4c' ],
  //               label: { color: '#871b47' } },
  //     }
  //   };

  //   // Instantiate and draw our chart, passing in some options.
  //   var chart = new google.visualization.Sankey(document.getElementById('female_traj'));
  //   chart.draw(data, options);
  //  }


  //   $("#male").click(function(){
  //          $("#male_traj").show('fast');
  //          $("#female_traj").hide('fast');
  //  });
  //  $("#female").click(function(){
  //          $("#male_traj").hide('fast');
  //          $("#female_traj").show('fast');
  //  });
});
 