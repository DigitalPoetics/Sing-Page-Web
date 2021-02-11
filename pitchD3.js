

d3.csv('https://raw.githubusercontent.com/diagrammaticreadings/Sing-Page-Web/main/WCWsomuch.csv') //load csv
  .row(function (d) {return {Time:Number(d.Time),Frequency:Number(d.Frequency)};})
  .get(function(error,data){

    var margin = {top: -20, right: 0, bottom: 20, left: 0},
        width = 613 - margin.left - margin.right,
        height = 150 - margin.top - margin.bottom;

    var maxTime = d3.max(data,function(d){return d.Time;});
    var minTime = d3.min(data,function(d){return d.Time;});
    var maxFrequency = d3.max(data,function(d){return d.Frequency;});

    var y = d3.scaleLinear()
              .domain([50,250])
              .range([height,0]);
    var x = d3.scaleLinear()
              .domain([0,8.2]) //change the length of the audio
              .range([0,width]);

    var yAxis = d3.axisLeft(y).ticks(3); //yAxis
    var xAxis = d3.axisBottom(x); //xAxis

    var svg = d3.select('wave').attr('class', "waveBox").append('svg')
                .attr("class", "pitchD3")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)


    var chartGroup = svg.append('g')
                        .attr('transform', "translate(" + margin.left + "," + margin.top + ")");

    var line = d3.line() //line
                 .x(function(d){return x(d.Time);})
                 .y(function(d){return y(d.Frequency);});

    chartGroup.append('path').attr('class','line').attr('d',line(data));

    chartGroup.selectAll('dot')
              .data(data)
              .enter().append('circle')
              .attr('class','pitchpoint')
              .attr('r', 1)
              .attr('cx',function(d){return x(d.Time);})
              .attr('cy',function(d){return y(d.Frequency);});

    //X Axis
    chartGroup.append('g').attr('class','x axis').attr('transform','translate(0,'+height+')').call(xAxis);  //add xaxis

    //Y Axis
    var svgY = d3.select('#y-axis').append('svg') //separate svg element to create a Y axis outside
                .attr("class", "y-axis")
                .attr("height", height + margin.top + margin.bottom)
    var chartGroupY = svgY.append('g')
                          .attr('transform', "translate(0, -320)");
    chartGroupY.append('g').attr('class','y axis').call(yAxis);    //add yaxis             
    chartGroupY.append("text") //add y-label
              .attr("class", "y-label")
              .attr("text-anchor", "middle")
              .attr("x", -75)
              .attr("y", margin.left - 50)
              .attr("transform", "rotate(270)")
              .text("Pitch (Hz)");
  });








