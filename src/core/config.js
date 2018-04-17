import util from 'util';
import log from 'log';

let cfg = {
	width: 0,
	height: 0,
	images: [],
	coverImage: '',
	loop: false,
	loopDirection: 1, // 1:Forward -1:Reverse, 2: toggle
	loopStart: 0,
	loopEnd: 0,
	sequence: 20,//show image count in 1s
	autoPlay: false,
	logLevel: 4,
	bgColor: '#fff',
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
	get as getCfg,
	set as setCfg,
	merge as mergeCfg,
}