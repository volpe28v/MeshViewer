function MeshCollection(params){
  var self = this;

  self.params = params;
  self.meshes = [];
  self.active = null;

  self.add = function(mesh){
    self.meshes.push(mesh);
    self.meshes.sort(function(a,b){
      if (a.name > b.name) return 1;
      if (a.name < b.name) return -1;
      return 0;
    });
 
    self.params.changeCollectionHandlers.forEach(function(handler){
      handler(self.meshes);
    });

    if (self.active == null){
      self.active = mesh;
      self.params.changeActiveMeshHandlers.forEach(function(handler){
        handler(mesh);
      });
    }
  }
}

module.exports = MeshCollection;
