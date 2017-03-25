function GoogleMap(params){
  var self = this;

  self.params = params;
  var latlng = new google.maps.LatLng(38.65, 138.25);
  var opts = {
    zoom: 5,
    center: latlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  self.map = new google.maps.Map(document.getElementById(params.id), opts);

  self.marker = new google.maps.Marker({
    position: latlng,
  });
  self.heatmap = null;


  self.setHeartMap = function(mesh){
    var meshArray = mesh.meshArray;

    // 最大値,最小値を求める
    var max = 20; // デフォルト値
    var min = 0;  // デフォルト値
    var flatten = Array.prototype.concat.apply([], meshArray);
    for (var i = 0; i < flatten.length; i++){
      if (max < flatten[i]) max = flatten[i];
      else if (min > flatten[i]) min = flatten[i];
    }

    var width = meshArray[0].length;
    var height = meshArray.length;

    var heatMapData = [];
    for (var y = 0; y < height; ++y) {
      for (var x = 0; x < width; ++x) {
        var base = (y * width + x) * 4;
        var value = meshArray[y][x];
        var norm_raw = 255 * (value - min)/(max - min);

        var lati = self.params.mapInfo.getLatitude(y);
        var longi = self.params.mapInfo.getLongitude(x);

        if (norm_raw != 0){
          heatMapData.push({location: new google.maps.LatLng(lati, longi), weight: norm_raw});
        }
      }
    }

    if (self.heatmap != null){
      self.heatmap.setMap(null);
      self.heatmap.setData([]);
    }

    self.heatmap = new google.maps.visualization.HeatmapLayer({
      data: heatMapData,
      radius: 10,
      maxIntensity: 255,
      opacity: 0.4
    });
    self.heatmap.setMap(self.map);
  }

  self.setMarker = function(params) {
    var lati = self.params.mapInfo.getLatitude(params.y);
    var longi = self.params.mapInfo.getLongitude(params.x);

    var latlng = new google.maps.LatLng(lati, longi);
    self.map.panTo(latlng);
    self.marker.setMap(self.map);
    self.marker.setPosition(latlng);
  }
};

module.exports = GoogleMap;
