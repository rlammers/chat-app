module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jasmine: {
			src: ['src/script.js'],
			options: {
				specs: 'spec/**/*.js'
			}
		},
		jshint: {
			files: ['Gruntfile.js', 'server.js', 'public/**/*.js'],
		},
		watch: {
			files: ['<%= jshint.files %>'],
			tasks: ['jshint', 'jasmine']
		},
		run: {
			chat_server: {
				cmd: 'node',
				args: [ 'server.js' ]
			}
		},

	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-run');
	grunt.loadNpmTasks('grunt-contrib-jasmine');

	grunt.registerTask('test', ['jshint', 'jasmine']);
	grunt.registerTask('default', ['jshint', 'run']);
};