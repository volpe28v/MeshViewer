function Canvas(params){
  var self = this;
  self.params = params;

  self.canvas = document.getElementById('mycanvas');
  self.context = self.canvas.getContext('2d');

  self.mesh = null;
  self.x = 0;
  self.y = 0;
  self.fix_x = 0;
  self.fix_y = 0;

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
      if (max < Number(flatten[i])) max = flatten[i];
      else if (min > Number(flatten[i])) min = flatten[i];
    }
 
    self.max = max;
    self.min = min;
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
    document.getElementById('v_m2m2').innerHTML = getMeshValue(y-2,x-2);
    document.getElementById('v_m1m2').innerHTML = getMeshValue(y-2,x-1);
    document.getElementById('v_0m2').innerHTML  = getMeshValue(y-2,x);
    document.getElementById('v_p1m2').innerHTML = getMeshValue(y-2,x+1);
    document.getElementById('v_p2m2').innerHTML = getMeshValue(y-2,x+2);

    document.getElementById('v_m2m1').innerHTML = getMeshValue(y-1,x-2);
    document.getElementById('v_m1m1').innerHTML = getMeshValue(y-1,x-1);
    document.getElementById('v_0m1').innerHTML  = getMeshValue(y-1,x);
    document.getElementById('v_p1m1').innerHTML = getMeshValue(y-1,x+1);
    document.getElementById('v_p2m1').innerHTML = getMeshValue(y-1,x+2);

    document.getElementById('v_m20').innerHTML = getMeshValue(y,x-2);
    document.getElementById('v_m10').innerHTML = getMeshValue(y,x-1);
    document.getElementById('v_00').innerHTML  = getMeshValue(y,x);
    document.getElementById('v_p10').innerHTML = getMeshValue(y,x+1);
    document.getElementById('v_p20').innerHTML = getMeshValue(y,x+2);

    document.getElementById('v_m2p1').innerHTML = getMeshValue(y+1,x-2);
    document.getElementById('v_m1p1').innerHTML = getMeshValue(y+1,x-1);
    document.getElementById('v_0p1').innerHTML  = getMeshValue(y+1,x);
    document.getElementById('v_p1p1').innerHTML = getMeshValue(y+1,x+1);
    document.getElementById('v_p2p1').innerHTML = getMeshValue(y+1,x+2);
    
    document.getElementById('v_m2p2').innerHTML = getMeshValue(y+2,x-2);
    document.getElementById('v_m1p2').innerHTML = getMeshValue(y+2,x-1);
    document.getElementById('v_0p2').innerHTML  = getMeshValue(y+2,x);
    document.getElementById('v_p1p2').innerHTML = getMeshValue(y+2,x+1);
    document.getElementById('v_p2p2').innerHTML = getMeshValue(y+2,x+2);

    d3.select('svg#latitude_line polyline')
      .transition()
      .duration(100)
      .attr('points', meshArray[y].map(function(d, i) {
        return i + ' ' + (56 - (50 * (Number(d) - self.min)/(self.max - self.min)));
      }).join(','));

    var longiArray = [];
    for( var i = 0; i < meshArray.length; i++){
      longiArray.push(meshArray[i][x]);
    }

    d3.select('svg#longitude_line polyline')
      .transition()
      .duration(100)
      .attr('points', longiArray.map(function(d, i) {
        return (60 - (50 * (Number(d) - self.min)/(self.max - self.min)) + " " + i);
      }).join(','));
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
    var meshArray = self.mesh.meshArray;

    document.getElementById('click_pos').innerHTML = "(" + x + " , " + y + ")";
    document.getElementById('click_lati').innerHTML = "(" + latitude + " , " + longitude + ")";
    document.getElementById('click_value').innerHTML = meshArray[y][x] + " mm";

    // 周辺の値
    document.getElementById('f_m2m2').innerHTML = getMeshValue(y-2,x-2);
    document.getElementById('f_m1m2').innerHTML = getMeshValue(y-2,x-1);
    document.getElementById('f_0m2').innerHTML  = getMeshValue(y-2,x);
    document.getElementById('f_p1m2').innerHTML = getMeshValue(y-2,x+1);
    document.getElementById('f_p2m2').innerHTML = getMeshValue(y-2,x+2);

    document.getElementById('f_m2m1').innerHTML = getMeshValue(y-1,x-2);
    document.getElementById('f_m1m1').innerHTML = getMeshValue(y-1,x-1);
    document.getElementById('f_0m1').innerHTML  = getMeshValue(y-1,x);
    document.getElementById('f_p1m1').innerHTML = getMeshValue(y-1,x+1);
    document.getElementById('f_p2m1').innerHTML = getMeshValue(y-1,x+2);

    document.getElementById('f_m20').innerHTML = getMeshValue(y,x-2);
    document.getElementById('f_m10').innerHTML = getMeshValue(y,x-1);
    document.getElementById('f_00').innerHTML  = getMeshValue(y,x);
    document.getElementById('f_p10').innerHTML = getMeshValue(y,x+1);
    document.getElementById('f_p20').innerHTML = getMeshValue(y,x+2);

    document.getElementById('f_m2p1').innerHTML = getMeshValue(y+1,x-2);
    document.getElementById('f_m1p1').innerHTML = getMeshValue(y+1,x-1);
    document.getElementById('f_0p1').innerHTML  = getMeshValue(y+1,x);
    document.getElementById('f_p1p1').innerHTML = getMeshValue(y+1,x+1);
    document.getElementById('f_p2p1').innerHTML = getMeshValue(y+1,x+2);
    
    document.getElementById('f_m2p2').innerHTML = getMeshValue(y+2,x-2);
    document.getElementById('f_m1p2').innerHTML = getMeshValue(y+2,x-1);
    document.getElementById('f_0p2').innerHTML  = getMeshValue(y+2,x);
    document.getElementById('f_p1p2').innerHTML = getMeshValue(y+2,x+1);
    document.getElementById('f_p2p2').innerHTML = getMeshValue(y+2,x+2);
  }

  function getMeshValue(y,x){
    var meshArray = self.mesh.meshArray;

    if (x < 0 || y < 0 || meshArray[0].length <= x || meshArray.length <= y){
      return "-";
    }else{
      return meshArray[y][x];
    }
  }

  function calcLatitude(y){
    return Math.round((self.params.mapInfo.startLatitude - (y * self.params.mapInfo.widthLongitude))*10000, 4)/10000;
  }

  function calcLongitude(x){
    return Math.round((self.params.mapInfo.startLongitude + (x * self.params.mapInfo.widthLatitude))*10000, 4)/10000;
  }
}

module.exports = Canvas;
