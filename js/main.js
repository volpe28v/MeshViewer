var GoogleMap = require("./google_map");
var DropZone = require("./drop_zone");
var Canvas = require("./canvas");
var MeshCollection = require("./mesh_collection");
var FileList = require("./file_list");
var PointInfo = require("./point_info");
var ProfileGraph = require("./profile_graph");
var mapInfo = require("./map_info");

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
    id: "mycanvas",
    mapInfo: mapInfo,
    moveHandlers:[
      pointInfo.updateCoordinate,
      profileGraph.updateCoordinate
    ],
    clickHandlers:[
      googleMap.setMarker,
      pointInfo.updateFixedCoordinate
    ]
  });

var fileList = new FileList(
  {
    id: "file_list"
  });

var meshCollection = new MeshCollection(
  {
    changeCollectionHandlers: [
      fileList.updateList
    ],
    changeActiveMeshHandlers: [
      canvas.drawMesh,
      googleMap.setHeartMap,
      fileList.updateActive,
      pointInfo.setMesh,
      profileGraph.setMesh
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
}
