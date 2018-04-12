import log from 'log';
import util from 'util';
import {centerFiler} from './internal-rander-filter';
import {cfg} from 'cfg';


export function initPlayer(vm){
	let animationId   = null;
	let loopCount     = 0;
	let playIndex     = 0;
	let pauseing      = true;
	let loopDirection = null; 

	let requestAnimationFrame = util.getRequestAnimationFrame();
    let cancelAnimationFrame  = util.getCancelAnimationFrame();

	// init filter arr
	vm.prototype._randerFilters = [];

	vm.prototype._initPlayer = function() {
		let self = this;

		self._registeredRanderFilter(centerFiler);
	};


	vm.prototype._play = function(direction = 1) {
		let self  = this;
		let Img   = self.imgArr;
		let len   = Img.length - 1; 
		let startIndex = 0;
		let endIndex   = len;

		if(!pauseing){
			log.info("is playing~");

			return;
		}

		if(loopCount != 0){
			startIndex = cfg.loopStart;
			endIndex   = cfg.loopEnd;
		}

		if( pauseing && playIndex){
			startIndex = playIndex;
		}

		if(!util.isNumber(direction)){
			direction = 1;
		}

		direction = direction > 0 ? 1 : -1;
		
		if(direction < 0){
			[startIndex, endIndex] = [endIndex, startIndex]
		}
		

		pauseing = false;

		loopDirection = direction;

		this._startAnimation(startIndex, endIndex, direction);
	};

	vm.prototype._pause = function() {
		pauseing = true;
	};

	vm.prototype._reset = function() {
		let self = this;

		loopCount = 0;
		playIndex = 0;

		self._pause();
		self._randerCover();

	};

	vm.prototype._startAnimation = function(startIndex = 0, endIndex = 0, direction = 1) {
		let self  = this;
		let Img   = self.imgArr; 
		let len   = Img.length; 
		let index = startIndex;
    	let time  = (1000 / cfg.sequence) || 200;
        let startTime = 0;
        let needCancel = false;
        
	    function go(timestamp) {
	        let progress = timestamp - startTime;
			
	        if (progress >= time) {

	        	startTime = timestamp;

	        	if(pauseing){
	        		needCancel = true;

	        		return;
	        	}

	        	if(direction > 0 && index <= endIndex){
	        		self._randerImg(Img[index]);
	            	playIndex = index;
	            	index ++;
	        	}else if(direction < 0 && index > 0){
	        		self._randerImg(Img[index]);
	            	playIndex = index;
	            	index --;
	        	}else{
	        		self._loopEnd();
	        		needCancel = true;
	        	}
	        }

	        if(!needCancel){
	        	animationId = requestAnimationFrame(go);
	        }
	    }
 
    	requestAnimationFrame(go);
	}

	vm.prototype._endAnimation = function() {
		let self = this;

		cancelAnimationFrame(animationId);
	};

	vm.prototype._loopEnd = function() {
		let self = this;

		pauseing  = true;
		playIndex = 0;
		loopCount++;

		if(cfg.loop){

			if( cfg.loopDirection != 2 ){
				self._play(cfg.loopDirection);
			}else{
				let dir = 1;

				if(loopDirection == 1){
					dir = -1;
				}

				self._play(dir);
			}

		}

		self._eventEmitter.emit("_loopEnd", {
			loopCount
		})

	};

	vm.prototype._randerCover = function() {
		let self = this;
		let Img  = self.imgArr[0];

		self._randerImg(Img);
	};

	vm.prototype._randerImg = function(img) {
		let self    = this;
		let canvas  = self.canvas;
		let cxt     = self.cxt;
		let showW   = cxt.width; //canvas size
		let showH   = cxt.height;
		let filters = self._randerFilters;
		let opts = {
			canvas,
			img,
		}

		util.doChain(filters, opts, function(args){
			let o = args;
			
			// clear
			cxt.clearRect(0, 0, showW, showH);
			// draw
			cxt.drawImage(img, o.sx, o.sy, o.sWidth, o.sHeight, o.dx, o.dy, o.dWidth, o.dHeight);
		});
		
	};

	vm.prototype._registeredRanderFilter = function(next) {
		let self = this;
		
		if(next && util.isFunction(next)){
			self._randerFilters.push(next);
		}else{
			log.warm("filter need a function.");
		}
	};

	vm.prototype._removeAllRanderFilter = function() {
		let self = this;
		
		self._randerFilters = [];

	};
}
