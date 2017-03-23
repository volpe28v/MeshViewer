function Canvas(params){
  var self = this;
  self.params = params;

  self.canvas = document.getElementById('mycanvas');
  self.context = self.canvas.getContext('2d');

  self.mesh = null;
  self.x = 0;
  self.y = 0;

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
    var max = 10; // デフォルト値
    var min = 0;  // デフォルト値
    var flatten = Array.prototype.concat.apply([], meshArray);
    for (var i = 0; i < flatten.length; i++){
      if (max < flatten[i]) max = flatten[i];
      else if (min > flatten[i]) min = flatten[i];
    }

    var imageData = self.context.getImageData(0, 0, self.canvas.width, self.canvas.height);
    var width = imageData.width, height = imageData.height;
    var pixels = imageData.data;  // ピクセル配列：4要素で1ピクセル

    for (var y = 0; y < height; ++y) {
      for (var x = 0; x < width; ++x) {
        var base = (y * width + x) * 4;
        var value = meshArray[y][x];
        // 255-0 に正規化
        var norm_raw = 255 * (value - min)/(max - min);
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

    updateFixedInfo();
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
    self.latitude = Math.round((params.mapInfo.startLatitude - (y * params.mapInfo.widthLongitude))*10000, 4)/10000;
    self.longitude = Math.round((params.mapInfo.startLongitude + (x * params.mapInfo.widthLatitude))*10000, 4)/10000;

    document.getElementById('pos').innerHTML = "(" + x + " , " + y + ")";
    document.getElementById('lati').innerHTML = "(" + self.latitude + " , " + self.longitude + ")";
    document.getElementById('value').innerHTML = meshArray[y][x] + " mm";

    // 周辺の値
    document.getElementById('v_m1m1').innerHTML = meshArray[y-1][x-1];
    document.getElementById('v_0m1').innerHTML = meshArray[y-1][x];
    document.getElementById('v_p1m1').innerHTML = meshArray[y-1][x+1];
    document.getElementById('v_m10').innerHTML = meshArray[y][x-1];
    document.getElementById('v_00').innerHTML = meshArray[y][x];
    document.getElementById('v_p10').innerHTML = meshArray[y][x+1];
    document.getElementById('v_m1p1').innerHTML = meshArray[y+1][x-1];
    document.getElementById('v_0p1').innerHTML = meshArray[y+1][x];
    document.getElementById('v_p1p1').innerHTML = meshArray[y+1][x+1];
  }

  function onClick(e) {
    if (self.mesh == null) return;

    var x = self.x;
    var y = self.y;
    self.fix_x = x;
    self.fix_y = y;

    var latitude = calcLatitude(y);
    var longitude = calcLongitude(x);

    self.params.clickHandlers.forEach(function(handler){
      handler({
        latitude: latitude,
        longitude: longitude,
        value: self.mesh.meshArray[y][x]
      });
    });

    updateFixedInfo();
  }

  function updateFixedInfo(){
    var x = self.fix_x;
    var y = self.fix_y;
    var latitude = calcLatitude(y);
    var longitude = calcLongitude(x);

    document.getElementById('click_pos').innerHTML = "(" + x + " , " + y + ")";
    document.getElementById('click_lati').innerHTML = "(" + latitude + " , " + longitude + ")";
    document.getElementById('click_value').innerHTML = self.mesh.meshArray[y][x] + " mm";
  }

  function calcLatitude(y){
    return Math.round((self.params.mapInfo.startLatitude - (y * self.params.mapInfo.widthLongitude))*10000, 4)/10000;
  }

  function calcLongitude(x){
    return Math.round((self.params.mapInfo.startLongitude + (x * self.params.mapInfo.widthLatitude))*10000, 4)/10000;
  }
}

module.exports = Canvas;
