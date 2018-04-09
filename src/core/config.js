import util from 'util';
import log from 'log';

let cfg = {
	width: 0,
	height: 0,
	images: [],
	loop: false,
	loopStart: 0,
	loopEnd: 0,
	sequence: 20,//show image count in 1s
	logLevel: 4,
}

function get(key){
	return cfg[key]
}

function set(key, val){
	cfg[key] = val
}

function merge(options){
	let obj = util.mergeData(options, cfg);

	cfg = obj;
}

export {
	cfg,
	get,
	set,
	merge,
}