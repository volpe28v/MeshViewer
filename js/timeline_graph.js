function TimelineGraph(){
  var self = this;

  self.meshes = null;
  self.active = null;
  self.x = 0;
  self.y = 0;

  function reflesh(){
    var x = self.x;
    var y = self.y;

    var values = self.meshes.map(function(mesh){
      return {
        name: mesh.name,
        value: Number(mesh.meshArray[y][x])
      };
    });

    var max = d3.max(values, function(d){ return d.value;});

    var yScale = d3.scaleLinear()
      .domain([0, max])
      .range([0, 200]);

    var timeline= d3.select('svg#timeline')
      .selectAll('rect').data(values);
    timeline.enter().append('rect');
    timeline.exit().remove();
    timeline
      .attr("x", function(d, i){ return i * 30; })
      .attr("y", 0)
      .attr("width", 20)
      .attr("height", function(d){ return yScale(d.value)})
      .attr("fill", "deepskyblue");
  }

  self.updateMeshes = function(meshes){
    self.meshes = meshes;
    reflesh();
  }

  self.updateActive = function(active){
    self.active = active;
    //reflesh();
  }

  self.updateCoordinate = function(params){
    self.x = params.x;
    self.y = params.y;
    reflesh();
  }
}

module.exports = TimelineGraph;
