var fileList = new Vue({
  el: '#file_list',
  data: {
    meshes: [],
    active: null
  },
  methods: {
    updateList: function(meshes){
      this.meshes = meshes;
    },
    updateActive: function(active){
      this.active = active;
    },
    isActive: function(mesh){
      return mesh == this.active;
    }
  }
})

module.exports = fileList;
