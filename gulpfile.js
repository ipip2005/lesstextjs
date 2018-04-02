'use strict';

let build = require('@microsoft/web-library-build');

build.typescript.setConfig({ typescript: require('typescript') });
build.initialize(require('gulp'));
