var MeshCollection = require("./mesh_collection");
var mapInfo = require("./map_info");

// vue vm
var dropZone = require("./drop_zone");
var fileList = require("./file_list");
var timelineGraph = require("./timeline_graph");
var googleMap = require("./google_map");
var pointInfo = require("./point_info");
var profileColGraph = require("./profile_col_graph");
var profileRowGraph = require("./profile_row_graph");
var meshCanvas = require("./mesh_canvas");

new Vue({
  el: '#app',
  data: {
    meshes: [],
    active: null,
    x: 0,
    y: 0,
    fix_x: 0,
    fix_y: 0,
    meshCollection: null
  },

  mounted: function(){
    var self = this;
    self.meshCollection = new MeshCollection(
      {
        changeCollectionHandlers: [
          function(meshes){ self.meshes = meshes; }
        ],
        changeActiveMeshHandlers: [
          function(mesh){ self.active = mesh; }
        ]
      });
  },

  methods: {
    addMesh: function(mesh){
      this.meshCollection.add(mesh);
    },
    preMesh: function(){
      this.meshCollection.pre();
    },
    nextMesh: function(){
      this.meshCollection.next();
    },
    moveCoordinate: function(params){
      this.x = params.x;
      this.y = params.y;
    },
    moveFixCoordinate: function(params){
      this.fix_x = params.x;
      this.fix_y = params.y;
    }
  }
});
