module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
			files: ['Gruntfile.js', 'server.js', 'public/*.js'],
		},
		watch: {
			files: ['<%= jshint.files %>'],
			tasks: ['jshint']
		}
	});
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.registerTask('test', ['jshint']);
};