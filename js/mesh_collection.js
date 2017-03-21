function MeshCollection(params){
  var self = this;

  self.params = params;
  self.meshes = [];
  self.active = null;

  self.add = function(mesh){
    self.meshes.push(mesh);
    if (self.active == null){
      self.active = mesh;
      params.changeActiveMeshHandlers.forEach(function(handler){
        handler(mesh);
      });
    }

    console.log(self.meshes.length);
  }
}

module.exports = MeshCollection;
