function PointInfo(params){
  var self = this;
  self.params = params;
  self.mesh = null;

  self.x = 0;
  self.y = 0;
  self.fix_x = 0;
  self.fix_y = 0;

  self.setMesh = function(mesh){
    self.mesh = mesh;

    updateInfo();
    updateFixedInfo();
  }

  self.updateCoordinate = function(params){
    self.x = params.x;
    self.y = params.y;

    updateInfo();
  }

  self.updateFixedCoordinate = function(params){
    self.fix_x = params.x;
    self.fix_y = params.y;

    updateFixedInfo();
  }

  function updateInfo(){
    var x = self.x;
    var y = self.y;

    var lati = self.params.mapInfo.getLatitude(y);
    var longi = self.params.mapInfo.getLongitude(x);
    var meshArray = self.mesh.meshArray;

    document.getElementById('pos').innerHTML = "(" + x + " , " + y + ")";
    document.getElementById('lati').innerHTML = "(" + lati + " , " + longi + ")";
    document.getElementById('60_lati').innerHTML = conv60(lati) + " , " + conv60(longi);
    document.getElementById('value').innerHTML = meshArray[y][x] + " mm";

    // 周辺の値
    document.getElementById('v_m2m2').innerHTML = getMeshValue(y-2,x-2);
    document.getElementById('v_m1m2').innerHTML = getMeshValue(y-2,x-1);
    document.getElementById('v_0m2').innerHTML  = getMeshValue(y-2,x);
    document.getElementById('v_p1m2').innerHTML = getMeshValue(y-2,x+1);
    document.getElementById('v_p2m2').innerHTML = getMeshValue(y-2,x+2);

    document.getElementById('v_m2m1').innerHTML = getMeshValue(y-1,x-2);
    document.getElementById('v_m1m1').innerHTML = getMeshValue(y-1,x-1);
    document.getElementById('v_0m1').innerHTML  = getMeshValue(y-1,x);
    document.getElementById('v_p1m1').innerHTML = getMeshValue(y-1,x+1);
    document.getElementById('v_p2m1').innerHTML = getMeshValue(y-1,x+2);

    document.getElementById('v_m20').innerHTML = getMeshValue(y,x-2);
    document.getElementById('v_m10').innerHTML = getMeshValue(y,x-1);
    document.getElementById('v_00').innerHTML  = getMeshValue(y,x);
    document.getElementById('v_p10').innerHTML = getMeshValue(y,x+1);
    document.getElementById('v_p20').innerHTML = getMeshValue(y,x+2);

    document.getElementById('v_m2p1').innerHTML = getMeshValue(y+1,x-2);
    document.getElementById('v_m1p1').innerHTML = getMeshValue(y+1,x-1);
    document.getElementById('v_0p1').innerHTML  = getMeshValue(y+1,x);
    document.getElementById('v_p1p1').innerHTML = getMeshValue(y+1,x+1);
    document.getElementById('v_p2p1').innerHTML = getMeshValue(y+1,x+2);
    
    document.getElementById('v_m2p2').innerHTML = getMeshValue(y+2,x-2);
    document.getElementById('v_m1p2').innerHTML = getMeshValue(y+2,x-1);
    document.getElementById('v_0p2').innerHTML  = getMeshValue(y+2,x);
    document.getElementById('v_p1p2').innerHTML = getMeshValue(y+2,x+1);
    document.getElementById('v_p2p2').innerHTML = getMeshValue(y+2,x+2);
  }

  function updateFixedInfo(){
    var x = self.fix_x;
    var y = self.fix_y;

    var lati = self.params.mapInfo.getLatitude(y);
    var longi = self.params.mapInfo.getLongitude(x);
    var meshArray = self.mesh.meshArray;

    document.getElementById('click_pos').innerHTML = "(" + x + " , " + y + ")";
    document.getElementById('click_lati').innerHTML = "(" + lati + " , " + longi + ")";
    document.getElementById('click_60_lati').innerHTML = conv60(lati) + " , " + conv60(longi);
    document.getElementById('click_value').innerHTML = meshArray[y][x] + " mm";

    // 周辺の値
    document.getElementById('f_m2m2').innerHTML = getMeshValue(y-2,x-2);
    document.getElementById('f_m1m2').innerHTML = getMeshValue(y-2,x-1);
    document.getElementById('f_0m2').innerHTML  = getMeshValue(y-2,x);
    document.getElementById('f_p1m2').innerHTML = getMeshValue(y-2,x+1);
    document.getElementById('f_p2m2').innerHTML = getMeshValue(y-2,x+2);

    document.getElementById('f_m2m1').innerHTML = getMeshValue(y-1,x-2);
    document.getElementById('f_m1m1').innerHTML = getMeshValue(y-1,x-1);
    document.getElementById('f_0m1').innerHTML  = getMeshValue(y-1,x);
    document.getElementById('f_p1m1').innerHTML = getMeshValue(y-1,x+1);
    document.getElementById('f_p2m1').innerHTML = getMeshValue(y-1,x+2);

    document.getElementById('f_m20').innerHTML = getMeshValue(y,x-2);
    document.getElementById('f_m10').innerHTML = getMeshValue(y,x-1);
    document.getElementById('f_00').innerHTML  = getMeshValue(y,x);
    document.getElementById('f_p10').innerHTML = getMeshValue(y,x+1);
    document.getElementById('f_p20').innerHTML = getMeshValue(y,x+2);

    document.getElementById('f_m2p1').innerHTML = getMeshValue(y+1,x-2);
    document.getElementById('f_m1p1').innerHTML = getMeshValue(y+1,x-1);
    document.getElementById('f_0p1').innerHTML  = getMeshValue(y+1,x);
    document.getElementById('f_p1p1').innerHTML = getMeshValue(y+1,x+1);
    document.getElementById('f_p2p1').innerHTML = getMeshValue(y+1,x+2);
    
    document.getElementById('f_m2p2').innerHTML = getMeshValue(y+2,x-2);
    document.getElementById('f_m1p2').innerHTML = getMeshValue(y+2,x-1);
    document.getElementById('f_0p2').innerHTML  = getMeshValue(y+2,x);
    document.getElementById('f_p1p2').innerHTML = getMeshValue(y+2,x+1);
    document.getElementById('f_p2p2').innerHTML = getMeshValue(y+2,x+2);
  }

  function getMeshValue(y,x){
    var meshArray = self.mesh.meshArray;

    if (x < 0 || y < 0 || meshArray[0].length <= x || meshArray.length <= y){
      return "-";
    }else{
      return meshArray[y][x];
    }
  }

  function conv60(input){
    var degree = Math.floor(input);
    var minute = Math.floor((input - degree) * 60);
    var second = Math.floor((((input - degree) * 60) - minute) * 60);

    return degree + "度 " + minute + "分 " + second + "秒";
  }
}

module.exports = PointInfo;
