'use strict';

let build = require('@microsoft/web-library-build');

build.karma.enabled = false;
build.webpack.enabled = false;
build.typescript.setConfig({ typescript: require('typescript') });
build.initialize(require('gulp'));
