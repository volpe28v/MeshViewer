function Canvas(params){
  var self = this;
  self.params = params;

  self.canvas = document.getElementById('mycanvas');
  self.context = self.canvas.getContext('2d');

  self.mesh = null;

  self.canvas.addEventListener('mouseover', onMouseOver, false);
  self.canvas.addEventListener('mouseout', onMouseOut, false);
  self.canvas.addEventListener('mousemove', onMouseMove, false);
  self.canvas.addEventListener('click', onClick, false);

  self.drawMesh = function(mesh){
    self.mesh = mesh;
    var meshArray = mesh.meshArray;

    self.canvas.width = meshArray[0].length;
    self.canvas.height = meshArray.length;

    // 最大値,最小値を求める
    var flatten = Array.prototype.concat.apply([], meshArray);
    var max = d3.max(flatten, function(d){ return Number(d)});
    max = max > 10 ? max : 10;

    self.max = max;
    var imageData = self.context.getImageData(0, 0, self.canvas.width, self.canvas.height);
    var width = imageData.width, height = imageData.height;
    var pixels = imageData.data;  // ピクセル配列：4要素で1ピクセル

    for (var y = 0; y < height; ++y) {
      for (var x = 0; x < width; ++x) {
        var base = (y * width + x) * 4;
        var value = meshArray[y][x];
        // 255-0 に正規化
        var norm_raw = 255 * value / max;
        var norm = 255 - norm_raw;

        pixels[base + 0] = norm;
        pixels[base + 1] = norm;
        pixels[base + 2] = norm;
        pixels[base + 3] = 255;
      }
    }

    self.canvas.style.display = "block";
    document.getElementById('drop_msg').style.display = "none";
    self.context.putImageData(imageData, 0, 0);

    document.getElementById('file_name').innerHTML = mesh.name;
  }


  function onMouseOver(e) {
  }

  function onMouseOut(e) {
  }

  function onMouseMove(e) {
    if (self.mesh == null) return;

    var meshArray = self.mesh.meshArray;
    var rect = e.target.getBoundingClientRect();
    self.x = e.clientX - rect.left;
    self.y = e.clientY - rect.top;

    var x = self.x;
    var y = self.y;

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

    self.params.moveHandlers.forEach(function(handler){
      handler({
        x: x,
        y: y
      });
    });
  }

  function onClick(e) {
    if (self.mesh == null) return;

    var x = self.x;
    var y = self.y;
    self.fix_x = x;
    self.fix_y = y;

    self.params.clickHandlers.forEach(function(handler){
      handler({
        x: x,
        y: y
      });
    });
  }

  function getMeshValue(y,x){
    var meshArray = self.mesh.meshArray;

    if (x < 0 || y < 0 || meshArray[0].length <= x || meshArray.length <= y){
      return "-";
    }else{
      return meshArray[y][x];
    }
  }
}

module.exports = Canvas;
