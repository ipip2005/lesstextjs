'use strict';

let build = require('@microsoft/web-library-build');

build.karma.enabled = false;
build.webpack.enabled = false;
build.TypeScriptConfiguration.setTypescriptCompiler(require('typescript'));
build.initialize(require('gulp'));
