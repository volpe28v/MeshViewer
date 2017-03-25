function FileList(params){
  var self = this;

  self.params = params;
  self.meshes = null;
  self.active = null;

  function refleshList(){
    var list = document.getElementById(self.params.id);
    list.innerHTML = self.meshes.map(function(mesh){
      if (mesh == self.active){
        return '<li class="selected-csv">' + mesh.name + '</li>';
      }else{
        return '<li>' + mesh.name + '</li>';
      }
    }).join("\n");
  }

  self.updateList = function(meshes){
    self.meshes = meshes;
    refleshList();
  }

  self.updateActive = function(active){
    self.active = active;
    refleshList();
  }
}

module.exports = FileList;
