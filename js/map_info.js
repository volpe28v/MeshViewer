module.exports = {
  startLatitude: 46.7,
  startLongitude: 120,
  widthLatitude: 0.0625,
  widthLongitude: 0.05,

  getLatitude: function(y){
    return Math.round((this.startLatitude - (y * this.widthLongitude))*10000, 4)/10000;
  },
  getLongitude: function(x){
    return Math.round((this.startLongitude + (x * this.widthLatitude))*10000, 4)/10000;
  }
};
