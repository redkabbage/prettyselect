/*
 *	prettySelect
 *	https://github.com/mattacular/prettyselect
 *
 *	Copyright (c) 2013 mstills
 *	Licensed under the MIT license.
 */
module.exports = function (grunt) {
	'use strict';

	grunt.initConfig({
		// scripts to be linted
		jshint: {
			all: [
				'Gruntfile.js',
				'jquery.prettyselect.js',
				'tests/tests.js'
			]
		},
		// before generating any new files, remove any previously-created files.
		clean: {
			tests: ['tmp'],
			expected: ['test/expected']
		},
		casperjs: {
			files: ['tests/**/*.js']
		}
	});

	grunt.loadTasks('tasks');

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-casperjs');

	// lint and test before declaring a revision stable
	grunt.registerTask('default', ['jshint', 'casperjs']);
};