function MeshCollection(params){
  var self = this;

  self.params = params;
  self.meshes = [];
  self.active = null;

  function changeActiveMesh(){
    self.params.changeActiveMeshHandlers.forEach(function(handler){
      handler(self.active);
    });
  }

  function getActivePos(){
    for (var i = 0; i < self.meshes.length; i++){
      if (self.meshes[i] == self.active) return i;
    }

    return 0;
  }

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
      changeActiveMesh();
    }
  }

  self.pre = function(){
    var activePos = getActivePos();
    activePos -= 1;
    if (activePos < 0){
      activePos = self.meshes.length - 1;
    }

    self.active = self.meshes[activePos];
    changeActiveMesh();
  }

  self.next = function(){
    var activePos = getActivePos();
    activePos += 1;
    if (activePos >= self.meshes.length){
      activePos = 0;
    }

    self.active = self.meshes[activePos];
    changeActiveMesh();
  }
}

module.exports = MeshCollection;
