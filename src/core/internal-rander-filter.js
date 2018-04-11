import util from 'util';
import log from 'log';

export function centerFiler(opts, next){
	let canvas = opts.canvas;
	let img    = opts.img;
	let showW  = canvas.width; //canvas size
	let showH  = canvas.height;
	let imgW   = img.width; //origin size
	let imgH   = img.height;

	let dx = 0; // draw start x and y
	let dy = 0; 
	let dWidth  = showW; // draw width and height, image show width, can scale
	let dHeight = showH; 
	
	let sx = 0; // cutting position in origin image size, x y。 
	let sy = 0; 
	let sWidth = imgW; //cutting size in origin image
	let sHeight = imgH;

	let cuttingW  = showW * imgH / showH; //image's width bigger it's height
	let cuttingH  = showH * imgW / showW; //images's height bigger it's width
	let cuttingX  = (imgW - cuttingW) / 2;
	let cuttingY  = (imgH - cuttingH) / 2;

	if(imgW > imgH){
		sx     = cuttingX;
		sWidth = cuttingW;
	}else{
		sy      = cuttingY;
		sHeight = cuttingH;
	}

	let setVal = {
		dx,
		dy,
		dWidth,
		dHeight,
		sx,
		sy,
		sWidth,
		sHeight,
	};

	opts = util.mergeData(opts, setVal)

	next();
};

export function test(opts, next){
	
	log.info(111222334);	
	log.info(opts);	

	next();
}