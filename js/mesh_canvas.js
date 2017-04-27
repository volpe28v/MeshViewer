var meshCanvas = Vue.component('mesh-canvas',{
  template: '<div>\
<canvas id="draw_canvas" width="481" height="505"></canvas>\
<canvas id="cursor_canvas" width="481" height="505"></canvas>\
  </div>',
 
  props: ['mesh'],

  watch: {
    mesh: function(){
      this.drawMesh();
    }
  },

  mounted: function(){
    var self = this;

    self.canvas = document.getElementById('draw_canvas');
    self.context = self.canvas.getContext('2d');

    self.cursor = document.getElementById('cursor_canvas');
    self.cursor_ctx = self.cursor.getContext('2d');

    self.cursor.addEventListener('mouseover', self.onMouseOver, false);
    self.cursor.addEventListener('mouseout', self.onMouseOut, false);
    self.cursor.addEventListener('mousemove', self.onMouseMove, false);
    self.cursor.addEventListener('click', self.onClick, false);

    document.onkeydown = function (e){
      var key_code = e.keyCode;

      switch(key_code){
        case 72: //h
          self.moveFixCursor(-1,0);
          break;
        case 74: //j
          self.moveFixCursor(0,1);
          break;
        case 75: //k
          self.moveFixCursor(0,-1);
          break;
        case 76: //l
          self.moveFixCursor(1,0);
          break;
      }
    }

  },

  methods: {
    drawMesh: function(){
      var self = this;

      var meshArray = self.mesh.meshArray;

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
      self.drawCursorLine();
    },

    moveFixCursor: function(x,y){
      var self = this;

      self.fix_x += x;
      self.fix_y += y;

      self.drawCursorLine();

      self.$emit('move-fix-coordinate',
        {
          x: self.fix_x,
          y: self.fix_y
        });
    },

    onMouseOver: function(e) {
    },

    onMouseOut: function(e) {
    },

    onMouseMove: function(e) {
      var self = this;
      if (self.mesh == null) return;

      var rect = e.target.getBoundingClientRect();
      self.x = e.clientX - rect.left;
      self.y = e.clientY - rect.top;

      self.drawCursorLine();

      self.$emit('move-coordinate',
        {
          x: self.x,
          y: self.y
        });
    },

    drawCursorLine: function(){
      var self = this;
      self.cursor_ctx.clearRect(0,0,self.canvas.width, self.canvas.height);

      self.lineToContext(self.cursor_ctx, 0, self.y, self.cursor.width, self.y, 'deepskyblue', 0.3);
      self.lineToContext(self.cursor_ctx, self.x, 0, self.x, self.cursor.height, 'deepskyblue', 0.3);

      if (self.x != null){
        self.lineToContext(self.cursor_ctx, self.fix_x - 10, self.fix_y, self.fix_x + 10, self.fix_y, 'red', 0.5);
        self.lineToContext(self.cursor_ctx, self.fix_x, self.fix_y - 10, self.fix_x, self.fix_y + 10, 'red', 0.5);
      }
    },

    lineToContext: function(ctx, sx, sy, ex, ey, color, alpha){
      ctx.globalAlpha = alpha;

      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.moveTo(sx, sy);
      ctx.lineTo(ex, ey);
      ctx.closePath();
      ctx.stroke();
    },

    onClick: function(e) {
      var self = this;
      if (self.mesh == null) return;

      var x = self.x;
      var y = self.y;
      self.fix_x = x;
      self.fix_y = y;

      self.drawCursorLine();

      self.$emit('move-fix-coordinate',
        {
          x: x,
          y: y
        });
    },

    getMeshValue: function(y,x){
      var self = this;
      var meshArray = self.mesh.meshArray;

      if (x < 0 || y < 0 || meshArray[0].length <= x || meshArray.length <= y){
        return "-";
      }else{
        return meshArray[y][x];
      }
    }
  }
});

module.exports = meshCanvas;
