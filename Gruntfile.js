module.exports = function(grunt) {
  grunt.initConfig({
    uglify: {
      dist: {
        files: {
          // 出力ファイル: 元ファイル
          'bundle.min.js': 'bundle.js'
        }
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.registerTask('default', ['uglify']);
};
