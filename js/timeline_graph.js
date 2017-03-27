function TimelineGraph(){
  var self = this;

  self.meshes = null;
  self.active = null;
  self.x = 0;
  self.y = 0;

  function reflesh(){
    var x = self.x;
    var y = self.y;

    var max = d3.max(self.meshes, function(d){ return Number(d.meshArray[y][x]);});
    var xWidth = 481 / self.meshes.length;
    xWidth = xWidth > 20 ? 20 : xWidth;

    var yScale = d3.scaleLinear()
      .domain([0, max])
      .range([2, 57]);

    var timeline= d3.select('svg#timeline')
      .selectAll('rect').data(self.meshes);
    timeline.enter().append('rect');
    timeline.exit().remove();
    timeline
      .transition()
      .attr("x", function(d, i){ return i * xWidth; })
      .attr("y", function(d){ return 56 - yScale(Number(d.meshArray[y][x]))})
      .attr("width", xWidth - 2)
      .attr("height", function(d){ return yScale(Number(d.meshArray[y][x]))})
      .attr("fill", function(d){ return d == self.active ? "#dccb18" : "deepskyblue";});
  }

  self.updateMeshes = function(meshes){
    self.meshes = meshes;
    reflesh();
  }

  self.updateActive = function(active){
    self.active = active;
    reflesh();
  }

  self.updateCoordinate = function(params){
    self.x = params.x;
    self.y = params.y;
    reflesh();
  }
}

module.exports = TimelineGraph;
