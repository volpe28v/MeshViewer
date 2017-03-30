function Canvas(params){
  var self = this;
  self.params = params;

  self.canvas = document.getElementById('draw_canvas');
  self.context = self.canvas.getContext('2d');

  self.cursor = document.getElementById('cursor_canvas');
  self.cursor_ctx = self.cursor.getContext('2d');

  self.mesh = null;

  self.cursor.addEventListener('mouseover', onMouseOver, false);
  self.cursor.addEventListener('mouseout', onMouseOut, false);
  self.cursor.addEventListener('mousemove', onMouseMove, false);
  self.cursor.addEventListener('click', onClick, false);

  self.drawMesh = function(mesh){
    self.mesh = mesh;
    var meshArray = mesh.meshArray;

    self.canvas.width = self.cursor.width = meshArray[0].length;
    self.canvas.height = self.cursor.height = meshArray.length;

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

    drawCursorLine();
  }


  self.moveFixCursor = function(x,y){
    self.fix_x += x;
    self.fix_y += y;

    drawCursorLine();

    self.params.clickHandlers.forEach(function(handler){
      handler({
        x: self.fix_x,
        y: self.fix_y
      });
    });
  }

  function onMouseOver(e) {
  }

  function onMouseOut(e) {
  }

  function onMouseMove(e) {
    if (self.mesh == null) return;

    var rect = e.target.getBoundingClientRect();
    self.x = e.clientX - rect.left;
    self.y = e.clientY - rect.top;

    drawCursorLine();

    self.params.moveHandlers.forEach(function(handler){
      handler({
        x: self.x,
        y: self.y
      });
    });
  }

  function drawCursorLine(){
    self.cursor_ctx.clearRect(0,0,self.canvas.width, self.canvas.height);

    lineToContext(self.cursor_ctx, 0, self.y, self.cursor.width, self.y, 'deepskyblue', 0.3);
    lineToContext(self.cursor_ctx, self.x, 0, self.x, self.cursor.height, 'deepskyblue', 0.3);

    if (self.x != null){
      lineToContext(self.cursor_ctx, self.fix_x - 10, self.fix_y, self.fix_x + 10, self.fix_y, 'red', 0.5);
      lineToContext(self.cursor_ctx, self.fix_x, self.fix_y - 10, self.fix_x, self.fix_y + 10, 'red', 0.5);
    }
  }

  function lineToContext(ctx, sx, sy, ex, ey, color, alpha){
    ctx.globalAlpha = alpha;

    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.moveTo(sx, sy);
    ctx.lineTo(ex, ey);
    ctx.closePath();
    ctx.stroke();
  }


  function onClick(e) {
    if (self.mesh == null) return;

    var x = self.x;
    var y = self.y;
    self.fix_x = x;
    self.fix_y = y;

    drawCursorLine();

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
