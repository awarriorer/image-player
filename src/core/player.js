import log from 'log';
import util from 'util';
import {centerFiler} from './internal-rander-filter';
import {cfg} from 'cfg';


export function initPlayer(vm){
	let animationId = null;

	// init filter arr
	vm.prototype._randerFilters = [];

	vm.prototype._initPlayer = function() {
		let self = this;

		self._registeredRanderFilter(centerFiler);
	};


	vm.prototype._play = function() {
		log.info("play");

		this._startAnimation();
	};

	vm.prototype._pause = function() {
		
	};

	vm.prototype._startAnimation = function() {
		let self  = this;
		let Img   = self._imgArr; 
		let len   = Img.length; 
		let start = 0;
		let index = 0;
		let time  = 1000 / cfg.sequence;

		animationId = window.requestAnimationFrame(function(a){
			log.info(1112);
			log.info(a);
		});


	};

	vm.prototype._endAnimation = function() {
		let self = this;

		window.cancelAnimationFrame(animationId);
	};

	vm.prototype._randerCover = function() {
		let self = this;
		let Img  = self._imgArr[0];

		self._randerImg(Img);
	};

	vm.prototype._randerImg = function(img) {
		let self    = this;
		let canvas  = self._canvas;
		let cxt     = self._cxt;
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


const  fn=()=>{
	const 运行时间 = 当前时间 - 开始运行时间
	const animatePosition=(运行时间/总时间)   * 动画总距离

	//设置动画

	//递归调用自己
	requestAnimationFrame（fn）
	}

}

//第一次手动调用
requestAnimationFrame（fn）