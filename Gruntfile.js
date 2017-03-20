module.exports = function(grunt) {
  grunt.initConfig({
    uglify: {
      dist: {
        files: {
          // 出力ファイル: 元ファイル
          'bundle.js': 'main.js'
        }
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.registerTask('default', ['uglify']);
};
