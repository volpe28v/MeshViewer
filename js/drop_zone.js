var Mesh = require("./mesh");

var dropZone = Vue.component('drop-zone',{
  template: '<div id="drop_zone">\
<div id="drop_msg">ここにMSMデータの csv ファイルをドロップしてください</div>\
<slot name="content"></slot>\
</div>',

  mounted: function(){
    var self = this;

    // ドロップゾーン作成
    var dropZone = document.getElementById("drop_zone");
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
      var fileArray = [];
      for (var i = 0, f; f = files[i]; i++) {
        fileArray.push(f);
      }
      fileArray.sort(function(a,b){
        if (a.name > b.name) return 1;
        if (a.name < b.name) return -1;
        return 0;
      });

      for (var i = 0; i < fileArray.length; i++) {
        var f = fileArray[i];
        var file_name = escape(f.name);

        var reader = new FileReader();
        reader.onload = (function(theFile) {
          var current = i;
          return function(e) {
            var mesh = new Mesh(theFile.name, e.target.result);

            self.$emit('add-mesh',mesh);
          };
        })(f);

        reader.readAsText(f);
      }
    }
  }
});

module.exports = dropZone;
