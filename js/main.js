var GoogleMap = require("./google_map");
var DropZone = require("./drop_zone");
var Canvas = require("./canvas");
var MeshCollection = require("./mesh_collection");
var PointInfo = require("./point_info");
var ProfileGraph = require("./profile_graph");
var mapInfo = require("./map_info");

// vue vm
var fileList = require("./file_list");
var timelineGraph = require("./timeline_graph");

new Vue({
  el: '#app',
  data: {
    meshes: [],
    active: null,
    x: 0,
    y: 0
  },
  mounted: function(){
    console.log("vue created");

    var googleMap = new GoogleMap(
      {
        id: "map_canvas",
        mapInfo: mapInfo
      });

    var pointInfo = new PointInfo(
      {
        mapInfo: mapInfo
      }
    );

    var profileGraph = new ProfileGraph();

    var canvas = new Canvas(
      {
        mapInfo: mapInfo,
        moveHandlers:[
          pointInfo.updateCoordinate,
          profileGraph.updateCoordinate
        ],
        clickHandlers:[
          googleMap.setMarker,
          pointInfo.updateFixedCoordinate,
          function(params){
            self.x = params.x;
            self.y = params.y;
          }
        ]
      });

    var self = this;
    var meshCollection = new MeshCollection(
      {
        changeCollectionHandlers: [
          function(meshes){ self.meshes = meshes; }
        ],
        changeActiveMeshHandlers: [
          canvas.drawMesh,
          googleMap.setHeartMap,
          pointInfo.setMesh,
          profileGraph.setMesh,
          function(mesh){ self.active = mesh; }
        ]
      });

    var dropZone = new DropZone(
      {
        id: "drop_zone",
        createMeshHandlers: [
          meshCollection.add
        ]
      });

    window.onload = function () {
      document.getElementById("pre_mesh").onclick = function(){
        meshCollection.pre();
      };
      document.getElementById("next_mesh").onclick = function(){
        meshCollection.next();
      };

      document.onkeydown = function (e){
        var key_code = e.keyCode;

        switch(key_code){
          case 72: //h
            canvas.moveFixCursor(-1,0);
            break;
          case 74: //j
            canvas.moveFixCursor(0,1);
            break;
          case 75: //k
            canvas.moveFixCursor(0,-1);
            break;
          case 76: //l
            canvas.moveFixCursor(1,0);
            break;
        }
      }
    }
  }
});
