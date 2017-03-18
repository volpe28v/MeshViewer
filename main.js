function drawToCanvas(){
	var canvas = document.getElementById('mycanvas');
	var context = canvas.getContext('2d');
	// キャンバス全体のピクセル情報を取得
	var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
	var width = imageData.width, height = imageData.height;
	var pixels = imageData.data;  // ピクセル配列：4要素で1ピクセル
	// ピクセル単位で操作できる
	for (var y = 0; y < height; ++y) {
		for (var x = 0; x < width; ++x) {
			var base = (y * width + x) * 4;
			// なんかピクセルに書き込む
			pixels[base + 0] = x;
			pixels[base + 1] = y;
			pixels[base + 2] = Math.max(255 - x - y, 0);
			pixels[base + 3] = 255;
		}
	}
	// 変更した内容をキャンバスに書き戻す
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

