/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

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
    var max = 20; // デフォルト値
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

    self.value = meshArray[y][x];
    document.getElementById('pos').innerHTML = "(" + x + " , " + y + ")";
    document.getElementById('lati').innerHTML = "(" + self.latitude + " , " + self.longitude + ")";
    document.getElementById('value').innerHTML = self.value + " mm";

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
    self.params.clickHandlers.forEach(function(handler){
      handler({
        latitude: self.latitude,
        longitude: self.longitude,
        value: self.value
      });
    });

    document.getElementById('click_pos').innerHTML = "(" + self.x + " , " + self.y + ")";
    document.getElementById('click_lati').innerHTML = "(" + self.latitude + " , " + self.longitude + ")";
    document.getElementById('click_value').innerHTML = self.value + " mm";
  }
}

module.exports = Canvas;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var Mesh = __webpack_require__(4);

function DropZone(params){
  var self = this;

  self.params = params;
  self.meshes = [];

  // ドロップゾーン作成
  var dropZone = document.getElementById(params.id);
  dropZone.addEventListener('dragover', handleDragOver, false);
  dropZone.addEventListener('drop', handleFileSelect, false);

  function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
  }

  function handleFileSelect(evt) {
    evt.stopPropagation();
    evt.preventDefault();

    var files = evt.dataTransfer.files; // FileList object.
    var f = files[0];
    var file_name = escape(f.name);

    var reader = new FileReader();
    reader.onload = (function(theFile) {
      return function(e) {
        var mesh = new Mesh(reader.result);
        self.meshes.push(mesh);

        params.createMeshHandlers.forEach(function(handler){
          handler(mesh);
        });
      };
    })(f);

    reader.readAsText(f);
  }


}

module.exports = DropZone;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

function GoogleMap(params){
  var self = this;

  self.params = params;
  var latlng = new google.maps.LatLng(38.65, 138.25);
  var opts = {
    zoom: 5,
    center: latlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  self.map = new google.maps.Map(document.getElementById(params.id), opts);

  self.marker = new google.maps.Marker({
    position: latlng,
  });
  self.heatmap = null;


  self.setHeartMap = function(mesh){
    var meshArray = mesh.meshArray;

    // 最大値,最小値を求める
    var max = 20; // デフォルト値
    var min = 0;  // デフォルト値
    var flatten = Array.prototype.concat.apply([], meshArray);
    for (var i = 0; i < flatten.length; i++){
      if (max < flatten[i]) max = flatten[i];
      else if (min > flatten[i]) min = flatten[i];
    }

    var width = meshArray[0].length;
    var height = meshArray.length;

    var heatMapData = [];
    for (var y = 0; y < height; ++y) {
      for (var x = 0; x < width; ++x) {
        var base = (y * width + x) * 4;
        var value = meshArray[y][x];
        var norm_raw = 255 * (value - min)/(max - min);

        var lati = params.mapInfo.startLatitude - (y * params.mapInfo.widthLongitude);
        var longi = params.mapInfo.startLongitude + (x * params.mapInfo.widthLatitude);

        if (norm_raw != 0){
          heatMapData.push({location: new google.maps.LatLng(lati, longi), weight: norm_raw});
        }
      }
    }

    if (self.heatmap != null){ self.heatmap.setMap(null); }

    self.heatmap = new google.maps.visualization.HeatmapLayer({
      data: heatMapData,
      radius: 10,
      maxIntensity: 255,
      opacity: 0.4
    });
    self.heatmap.setMap(self.map);
  }

  self.setMarker = function(params) {
    var latlng = new google.maps.LatLng(params.latitude, params.longitude);
    self.map.panTo(latlng);
    self.marker.setMap(self.map);
    self.marker.setPosition(latlng);
  }
};

module.exports = GoogleMap;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = {
  startLatitude: 46.7,
  startLongitude: 120,
  widthLatitude: 0.0625,
  widthLongitude: 0.05,
};


/***/ }),
/* 4 */
/***/ (function(module, exports) {

function Mesh(csvText){
  var self = this;

  self.meshArray = convertCsvToArray(csvText);

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
}

module.exports = Mesh;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var GoogleMap = __webpack_require__(2);
var DropZone = __webpack_require__(1);
var Canvas = __webpack_require__(0);
var mapInfo = __webpack_require__(3);

var googleMap = new GoogleMap(
  {
    id: "map_canvas",
    mapInfo: mapInfo
  });

var canvas = new Canvas(
  {
    id: "mycanvas",
    mapInfo: mapInfo,
    moveHandlers:[],
    clickHandlers:[
      googleMap.setMarker
    ]
  });

var dropZone = new DropZone(
  {
    id: "drop_zone",
    createMeshHandlers: [
      canvas.drawMesh,
      googleMap.setHeartMap
    ]
  });


/***/ })
/******/ ]);