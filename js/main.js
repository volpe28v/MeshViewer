var GoogleMap = require("./google_map");
var DropZone = require("./drop_zone");
var Canvas = require("./canvas");
var MeshCollection = require("./mesh_collection");
var FileList = require("./file_list");
var mapInfo = require("./map_info");

var googleMap = new GoogleMap(
  {
    id: "map_canvas",
    mapInfo: mapInfo
  });

var canvas = new Canvas(
  {
    id: "mycanvas",
    mapInfo: mapInfo,
    moveHandlers:[],
    clickHandlers:[
      googleMap.setMarker
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
      googleMap.setHeartMap
    ]
  });

var dropZone = new DropZone(
  {
    id: "drop_zone",
    createMeshHandlers: [
      meshCollection.add
    ]
  });
