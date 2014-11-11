module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jasmine: {
			src: ['src/**/*.js', 'server.js'],
			options: {
				specs: 'spec/**/*.js'
			}
		},
		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			all: ['src/**/*.js', 'spec/**/*.js']
		},
		watch: {
			scripts: {
				files: ['server.js', 'src/**/*.js'],
				tasks: ['test']
			}
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