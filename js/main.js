var GoogleMap = require("./google_map");
var mapInfo = require("./map_info");

var googleMap = new GoogleMap({id: "map_canvas", mapInfo: mapInfo});

function drawArrayToCanvas(meshArray){
  canvas.width = meshArray[0].length;
  canvas.height = meshArray.length;

  // 最大値,最小値を求める
  var max = 20; // デフォルト値
  var min = 0;  // デフォルト値
  var flatten = Array.prototype.concat.apply([], meshArray);
  for (var i = 0; i < flatten.length; i++){
    if (max < flatten[i]) max = flatten[i];
    else if (min > flatten[i]) min = flatten[i];
  }

  var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
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

  canvas.style.display = "block";
  document.getElementById('drop_msg').style.display = "none";
  context.putImageData(imageData, 0, 0);
}


function handleFileSelect(evt) {
  evt.stopPropagation();
  evt.preventDefault();

  var files = evt.dataTransfer.files; // FileList object.
  var f = files[0];
  var file_name = escape(f.name);
  //document.getElementById('file_name').innerHTML = file_name;

  var reader = new FileReader();
  reader.onload = (function(theFile) {
    return function(e) {
      //console.log(reader.result);
      // csvファイルの中身を配列に
      meshArray = convertCsvToArray(reader.result);

      drawArrayToCanvas(meshArray);
      googleMap.setHearMap(meshArray);
    };
  })(f);

  reader.readAsText(f);
}

function convertCsvToArray(csvText){
  return csvText.split('\n')
    .filter(function(line){
      return line != "";
    })
    .map(function(line){
      return line.split(',').filter(function(elem){
        return elem != "";
      });
    });
}

function handleDragOver(evt) {
  evt.stopPropagation();
  evt.preventDefault();
  evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
}

function onMouseOver(e) {
}

function onMouseOut(e) {
}

function onMouseMove(e) {
  if (meshArray == null) return;

  var rect = e.target.getBoundingClientRect();
  x = e.clientX - rect.left;
  y = e.clientY - rect.top;

  latitude = Math.round((startLatitude - (y * widthLongitude))*10000, 4)/10000;
  longitude = Math.round((startLongitude + (x * widthLatitude))*10000, 4)/10000;

  value = meshArray[y][x];
  document.getElementById('pos').innerHTML = "(" + x + " , " + y + ")";
  document.getElementById('lati').innerHTML = "(" + latitude + " , " + longitude + ")";
  document.getElementById('value').innerHTML = value + " mm";

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
  if (meshArray == null) return;
  googleMap.setMarker(latitude, longitude);

  document.getElementById('click_pos').innerHTML = "(" + x + " , " + y + ")";
  document.getElementById('click_lati').innerHTML = "(" + latitude + " , " + longitude + ")";
  document.getElementById('click_value').innerHTML = value + " mm";
}

// const
var startLatitude  = 46.7;
var startLongitude = 120;
var widthLatitude  = 0.0625;
var widthLongitude = 0.05;

// グローバル
var x,y;
var latitude;
var longitude;
var value;
var meshArray = null;

// main
// canvas 作成
var canvas = document.getElementById('mycanvas');
var context = canvas.getContext('2d');
canvas.addEventListener('mouseover', onMouseOver, false);
canvas.addEventListener('mouseout', onMouseOut, false);
canvas.addEventListener('mousemove', onMouseMove, false);
canvas.addEventListener('click', onClick, false);

// ドロップゾーン作成
var dropZone = document.getElementById('drop_zone');
dropZone.addEventListener('dragover', handleDragOver, false);
dropZone.addEventListener('drop', handleFileSelect, false);

