function drawArrayToCanvas(meshArray){
	var canvas = document.getElementById('mycanvas');
	var context = canvas.getContext('2d');

  console.log(meshArray);
  canvas.width = meshArray[0].length;
  canvas.height = meshArray.length;

  // 最大値,最小値を求める
  var flatten = Array.prototype.concat.apply([], meshArray);
  var max = Math.max.apply(null, flatten);
  var min = Math.min.apply(null, flatten);
  console.log(min + " " + max);

	var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
	var width = imageData.width, height = imageData.height;
	var pixels = imageData.data;  // ピクセル配列：4要素で1ピクセル

	for (var y = 0; y < height; ++y) {
		for (var x = 0; x < width; ++x) {
			var base = (y * width + x) * 4;
      var value = meshArray[y][x];
      //Yn=B+(A-B)*(Xn-Xmin)/(Xmax-Xmin)
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


function handleFileSelect(evt) {
	evt.stopPropagation();
	evt.preventDefault();

	var files = evt.dataTransfer.files; // FileList object.

	// files is a FileList of File objects. List some properties.
	var output = [];
	for (var i = 0, f; f = files[i]; i++) {
		output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
			f.size, ' bytes, last modified: ',
			f.lastModifiedDate.toLocaleDateString(), '</li>');
	}
	document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';

	var reader = new FileReader();

	reader.onload = (function(theFile) {
		return function(e) {
      console.log(reader.result);
      // csvファイルの中身を配列に
      var meshArray = convertCsvToArray(reader.result);
      drawArrayToCanvas(meshArray);
		};
	})(f);

	// Read in the image file as a data URL.
	reader.readAsText(files[0]);
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

// Setup the dnd listeners.
var dropZone = document.getElementById('drop_zone');
dropZone.addEventListener('dragover', handleDragOver, false);
dropZone.addEventListener('drop', handleFileSelect, false);

