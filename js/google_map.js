var mapInfo = require("./map_info");

var googleMap = Vue.component('google-map',{
  template: '<div id="map_canvas" style="margin-top: 0px; width:481px; height:505px"></div>',

  props: ['active', 'x', 'y'],

  watch: {
    active: function(mesh){
      this.setHeartMap(mesh);
    },
    x: function(){
      this.setMarker();
    },
    y: function(){
      this.setMarker();
    }
  },

  mounted: function(){
    var self = this;

    var latlng = new google.maps.LatLng(38.65, 138.25);
    var opts = {
      zoom: 5,
      center: latlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    self.map = new google.maps.Map(document.getElementById('map_canvas'), opts);

    self.marker = new google.maps.Marker({
      position: latlng,
    });
    self.heatmap = null;
  },

  methods: {
    setHeartMap: function(mesh){
      var self = this;
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

          var lati = mapInfo.getLatitude(y);
          var longi = mapInfo.getLongitude(x);

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
    },

    setMarker: function() {
      var self = this;
      var lati = mapInfo.getLatitude(self.y);
      var longi = mapInfo.getLongitude(self.x);

      var latlng = new google.maps.LatLng(lati, longi);
      self.map.panTo(latlng);
      self.marker.setMap(self.map);
      self.marker.setPosition(latlng);
    }
  }
});


module.exports = googleMap;
