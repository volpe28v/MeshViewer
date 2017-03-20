var GoogleMap = require("./google_map");
var DropZone = require("./drop_zone");
var Canvas = require("./canvas");
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

var dropZone = new DropZone(
  {
    id: "drop_zone",
    createMeshHandlers: [
      canvas.drawMesh,
      googleMap.setHeartMap
    ]
  });
