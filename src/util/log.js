/* eslint-disable no-console */


import {get} from 'cfg';

// 修改有修浏览器不支持
console.info  = console.info  || console.log;
console.log   = console.log   || console.log;
console.warn  = console.warn  || console.log;
console.error = console.error || console.log;

/**
 * 日志
 */
export default {
	debug: function() {
		var level = get('logLevel');

		if (parseInt(level) > 3) {
			console.log.apply(console, arguments);
		}
	},
	info: function() {
		var level = get('logLevel');

		if (parseInt(level) > 2) {
			console.info.apply(console, arguments);
		}
	},
	warn: function() {
		var level = get('logLevel');

		if (parseInt(level) > 1) {
			console.warn.apply(console, arguments);
		}
	},
	error: function() {
		var level = get('logLevel');

		if (parseInt(level) > 0) {
			console.error.apply(console, arguments);
		}
	}
}

/* eslint-enable no-console */