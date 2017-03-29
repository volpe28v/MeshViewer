var GoogleMap = require("./google_map");
var DropZone = require("./drop_zone");
var Canvas = require("./canvas");
var MeshCollection = require("./mesh_collection");
var FileList = require("./file_list");
var PointInfo = require("./point_info");
var ProfileGraph = require("./profile_graph");
var TimelineGraph = require("./timeline_graph");
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
var timelineGraph = new TimelineGraph();

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
      timelineGraph.updateCoordinate
    ]
  });

var fileList = new FileList(
  {
    id: "file_list"
  });

var meshCollection = new MeshCollection(
  {
    changeCollectionHandlers: [
      fileList.updateList,
      timelineGraph.updateMeshes
    ],
    changeActiveMeshHandlers: [
      canvas.drawMesh,
      googleMap.setHeartMap,
      fileList.updateActive,
      pointInfo.setMesh,
      profileGraph.setMesh,
      timelineGraph.updateActive
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
