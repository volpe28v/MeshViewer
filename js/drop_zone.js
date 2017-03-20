var Mesh = require("./mesh");

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
