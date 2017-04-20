var profileRowGraph = Vue.component('profile-row-graph',{
  template: '<div>\
    <svg id="latitude_line" width="481" height="60" style="background: black; display: block;">\
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

      var latiScale = d3.scaleLinear()
        .domain([0, self.max])
        .range([55, 5]);

      d3.select('svg#latitude_line polyline')
        .transition()
        .duration(100)
        .attr('points', meshArray[y].map(function(d, i) {
          return i + ' ' + latiScale(Number(d));
        }).join(','));
    }
  }
});

module.exports = profileRowGraph;
