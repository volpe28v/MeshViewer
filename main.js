function drawArrayToCanvas(meshArray){
	//console.log(meshArray);
	canvas.width = meshArray[0].length;
	canvas.height = meshArray.length;

	// 最大値,最小値を求める
	var flatten = Array.prototype.concat.apply([], meshArray);
	var max = flatten[0];
	var min = max;
	for (var i = 0; i < flatten.length; i++){
		if (max < flatten[i]) max = flatten[i];
		else if (min > flatten[i]) min = flatten[i];
	}
	//console.log(min + " " + max);

	var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
	var width = imageData.width, height = imageData.height;
	var pixels = imageData.data;  // ピクセル配列：4要素で1ピクセル

	for (var y = 0; y < height; ++y) {
		for (var x = 0; x < width; ++x) {
			var base = (y * width + x) * 4;
			var value = meshArray[y][x];
			// 0-255 に正規化
			var norm = 255 * (value - min)/(max - min);

			pixels[base + 0] = norm;
			pixels[base + 1] = norm;
			pixels[base + 2] = norm;
			pixels[base + 3] = 255;
		}
	}
	context.putImageData(imageData, 0, 0);
}

var meshArray = null;

function handleFileSelect(evt) {
	evt.stopPropagation();
	evt.preventDefault();

	var files = evt.dataTransfer.files; // FileList object.
	var f = files[0];
	var file_name = escape(f.name);
	document.getElementById('file_name').innerHTML = file_name;


	var reader = new FileReader();
	reader.onload = (function(theFile) {
		return function(e) {
			//console.log(reader.result);
			// csvファイルの中身を配列に
			meshArray = convertCsvToArray(reader.result);
			drawArrayToCanvas(meshArray);
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

var latitude;
var longitude;
function onMouseMove(e) {
	if (meshArray == null) return;

	var rect = e.target.getBoundingClientRect();
	x = e.clientX - rect.left;
	y = e.clientY - rect.top;

	latitude = Math.round((startLatitude - (y * widthLongitude))*10000, 4)/10000;
	longitude = Math.round((startLongitude + (x * widthLatitude))*10000, 4)/10000;

	var value = meshArray[y][x];
	document.getElementById('pos').innerHTML = "(" + x + " , " + y + ")";
	document.getElementById('lati').innerHTML = "(" + latitude + " , " + longitude + ")";
	document.getElementById('value').innerHTML = value + " mm";
}

function onClick(e) {
	if (meshArray == null) return;
  view_map(latitude, longitude);
}

function view_map(lati, longi) {
	var url1 = "http://maps.google.co.jp/maps?";
	var url2 = "&z=7&output=embed";

  var query = "q=" + lati + "," + longi;

	//地図表示
	document.getElementById("mapfield").src = url1 + query + url2;
}

// const
var startLatitude  = 46.7;
var startLongitude = 120;
var widthLatitude  = 0.0625;
var widthLongitude = 0.05;

// main
var canvas = document.getElementById('mycanvas');
var context = canvas.getContext('2d');
canvas.addEventListener('mouseover', onMouseOver, false);
canvas.addEventListener('mouseout', onMouseOut, false);
canvas.addEventListener('mousemove', onMouseMove, false);
canvas.addEventListener('click', onClick, false);

var dropZone = document.getElementById('drop_zone');
dropZone.addEventListener('dragover', handleDragOver, false);
dropZone.addEventListener('drop', handleFileSelect, false);

