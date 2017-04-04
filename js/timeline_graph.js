var timelineGraph = Vue.component('timeline-graph',{
  template: '<svg id="timeline" width="505" height="60" style="margin-top: 0px; background: black; display: block;"></svg>',

  props: ['meshes', 'active', 'x', 'y'],

  watch: {
    meshes: function(){
      this.reflesh();
    },
    active: function(){
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
      if (this.meshes == null || this.meshes.length == 0){ return; }

      var self = this;
      var x = self.x;
      var y = self.y;

      var max = d3.max(self.meshes, function(d){ return Number(d.meshArray[y][x]);});
      var xWidth = 481 / self.meshes.length;
      xWidth = xWidth > 20 ? 20 : xWidth;

      var yScale = d3.scaleLinear()
        .domain([0, max])
        .range([2, 57]);

      var timeline = d3.select('svg#timeline')
        .selectAll('rect').data(self.meshes);
      timeline.enter().append('rect');
      timeline.exit().remove();

      timeline = d3.select('svg#timeline')
        .selectAll('rect')
        .transition()
        .attr("x", function(d, i){ return i * xWidth; })
        .attr("y", function(d){ return 56 - yScale(Number(d.meshArray[y][x]))})
        .attr("width", xWidth - 2)
        .attr("height", function(d){ return yScale(Number(d.meshArray[y][x]))})
        .attr("fill", function(d){ return d == self.active ? "#dccb18" : "deepskyblue";});
    }
  }
});

module.exports = timelineGraph;
