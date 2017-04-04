var fileList = Vue.component('file-list',{
  template: '<ul id="file_list"><li v-for="mesh in meshes" v-bind:class="{\'selected-csv\': isActive(mesh)}">{{mesh.name}}</li></ul>',

  props: ['meshes', 'active'],

  methods: {
    isActive: function(mesh){
      return mesh == this.active;
    }
  }
});

module.exports = fileList;
