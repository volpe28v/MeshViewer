function ProfileGraph(){
  var self = this;

  self.mesh = null;
  self.x = 0;
  self.y = 0;

  self.setMesh = function(mesh){
    self.mesh = mesh;

    var meshArray = mesh.meshArray;

    // 最大値,最小値を求める
    var flatten = Array.prototype.concat.apply([], meshArray);
    var max = d3.max(flatten, function(d){ return Number(d)});
    max = max > 10 ? max : 10;

    self.max = max;

    update();
  }

  self.updateCoordinate = function(params){
    self.x = params.x;
    self.y = params.y;

    update();
  }

  function update(){
    var x = self.x;
    var y = self.y;
    var meshArray = self.mesh.meshArray;

    var latiScale = d3.scaleLinear()
      .domain([0, self.max])
      .range([55, 5]);
     
    d3.select('svg#latitude_line polyline')
      .transition()
      .duration(100)
      .attr('points', meshArray[y].map(function(d, i) {
        return i + ' ' + latiScale(Number(d));
      }).join(','));

    var longiScale = d3.scaleLinear()
      .domain([0, self.max])
      .range([58, 8]);
 
    var longiArray = meshArray.map(function(m){return m[x];});
    d3.select('svg#longitude_line polyline')
      .transition()
      .duration(100)
      .attr('points', longiArray.map(function(d, i) {
        return longiScale(Number(d)) + " " + i;
      }).join(','));
  }
}

module.exports = ProfileGraph;
