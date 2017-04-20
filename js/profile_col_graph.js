var profileColGraph = Vue.component('profile-col-graph',{
  template: '<div>\
<svg id="longitude_line" width="60" height="505" style="margin-top: 60px; background: black; display: block;">\
  <polyline stroke="deepskyblue" stroke-width="2" fill="transparent" points=""></polyline>\
</svg>\
</div>',

  props: ['mesh', 'x', 'y'],

  data: function(){
    return {
      max: 0
    }
  },

  watch: {
    mesh: function(){
      this.setMesh();
    },
    x: function(){
      this.update();
    },
    y: function(){
      this.update();
    }
  },

  methods: {
    setMesh: function(){
      var self = this;

      var meshArray = self.mesh.meshArray;

      // 最大値,最小値を求める
      var flatten = Array.prototype.concat.apply([], meshArray);
      var max = d3.max(flatten, function(d){ return Number(d)});
      max = max > 10 ? max : 10;

      self.max = max;

      self.update();
    },

    update: function(){
      var self = this;

      var x = self.x;
      var y = self.y;
      var meshArray = self.mesh.meshArray;

      var longiScale = d3.scaleLinear()
        .domain([0, self.max])
        .range([58, 8]);

      var longiArray = meshArray.map(function(m){return m[x];});
      d3.select('svg#longitude_line polyline')
        .transition()
        .duration(100)
        .attr('points', longiArray.map(function(d, i) {
          return longiScale(Number(d)) + " " + i;
        }).join(','));
    }
  }
});

module.exports = profileColGraph;
