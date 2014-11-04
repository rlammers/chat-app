module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
			files: ['Gruntfile.js', 'server.js', 'public/*.js'],
		},
		qunit: {
			files: ['test/*.html']
		},
		watch: {
			files: ['<%= jshint.files %>'],
			tasks: ['jshint']
		},
		run: {
			your_target: {
				cmd: 'node',
				args: [ 'server.js' ]
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-run');

	grunt.registerTask('test', ['jshint', 'qunit']);
	grunt.registerTask('default', ['jshint', 'qunit', 'run']);
};