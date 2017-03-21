function FileList(params){
  var self = this;

  self.params = params;

  self.updateList = function(meshes){
    var list = document.getElementById(self.params.id);
    list.innerHTML = meshes.map(function(mesh){
      return "<li>" + mesh.name + "</li>";
    }).join("\n");
  }
}

module.exports = FileList;
