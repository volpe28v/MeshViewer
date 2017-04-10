var mapInfo = require("./map_info");

var pointInfo = Vue.component('point-info',{
  template: '<div>\
<table>\
  <tr><td>座標</td><td>{{pos}}</td></tr>\
  <tr><td>緯度・経度</td><td>{{lati}}</td></tr>\
  <tr><td>60進数</td><td>{{lati_60}}</td></tr>\
  <tr><td>降水量</td><td>{{value}}</td></tr>\
</table>\
\
<table class="around">\
  <tr><td>{{meshValue(-2,-2)}}</td><td>{{meshValue(-1,-2)}}</td><td>{{meshValue(0,-2)}}</td><td>{{meshValue(1,-2)}}</td><td>{{meshValue(2,-2)}}</td></tr>\
  <tr><td>{{meshValue(-2,-1)}}</td><td>{{meshValue(-1,-1)}}</td><td>{{meshValue(0,-1)}}</td><td>{{meshValue(1,-1)}}</td><td>{{meshValue(2,-1)}}</td></tr>\
  <tr><td>{{meshValue(-2, 0)}}</td><td>{{meshValue(-1, 0)}}</td><td>{{meshValue(0, 0)}}</td><td>{{meshValue(1, 0)}}</td><td>{{meshValue(2, 0)}}</td></tr>\
  <tr><td>{{meshValue(-2, 1)}}</td><td>{{meshValue(-1, 1)}}</td><td>{{meshValue(0, 1)}}</td><td>{{meshValue(1, 1)}}</td><td>{{meshValue(2, 1)}}</td></tr>\
  <tr><td>{{meshValue(-2, 2)}}</td><td>{{meshValue(-1, 2)}}</td><td>{{meshValue(0, 2)}}</td><td>{{meshValue(1, 2)}}</td><td>{{meshValue(2, 2)}}</td></tr>\
</table>\
</div>',

  props: ['mesh', 'x', 'y'],

  data: function() {
    return {
      pos: "",
      lati: "",
      lati_60: "",
      value: 0
    }
  },

  watch: {
    mesh: function(){
      this.reflesh();
    },
    x: function(){
      this.reflesh();
    },
    y: function(){
      this.reflesh();
    }
  },

  methods: {
    reflesh: function(){
      var self = this;
      if (self.mesh == null){ return; }

      var x = self.x;
      var y = self.y;

      var lati = mapInfo.getLatitude(y);
      var longi = mapInfo.getLongitude(x);
      var meshArray = self.mesh.meshArray;

      self.pos = "(" + x + " , " + y + ")";
      self.lati = "(" + lati + " , " + longi + ")";
      self.lati_60 = self.conv60(lati) + " , " + self.conv60(longi);
      self.value = meshArray[y][x] + " mm";
    },

    meshValue: function(y,x){
      var self = this;
      if (self.mesh == null){ return 0;}

      var meshArray = self.mesh.meshArray;
      var x = self.x + x;
      var y = self.y + y;

      if (x < 0 || y < 0 || meshArray[0].length <= x || meshArray.length <= y){
        return "-";
      }else{
        return meshArray[y][x];
      }
    },

    conv60: function(input){
      var degree = Math.floor(input);
      var minute = Math.floor((input - degree) * 60);
      var second = Math.floor((((input - degree) * 60) - minute) * 60);

      return degree + "度 " + minute + "分 " + second + "秒";
    }
  }
});

module.exports = pointInfo;
