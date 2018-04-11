import log from 'log';
import {cfg, mergeCfg, setCfg, getCfg} from 'cfg';
import util from 'util';
import events from 'events';

export function init(vm){
	vm.prototype.init = function(select, options) {
		let self = this;
		let con  = document.querySelector(select);
		let conPostion = con.getBoundingClientRect();

		cfg.width  = conPostion.width;
		cfg.height = conPostion.height;

		// merge config
		mergeCfg(options);

		// create canvas
		let canvas = document.createElement("canvas");

		canvas.width  = cfg.width;
		canvas.height = cfg.height;

		let cxt = canvas.getContext("2d");

		cxt.fillStyle = cfg.bgColor;
		cxt.fillRect(0, 0, cfg.width, cfg.height);

		// rander dom
		con.appendChild(canvas);

		self._select = select;
		self._canvas = canvas;
		self._cxt    = cxt;
		self._ready  = false;
		self._eventEmitter = new events.EventEmitter();

		// load images
		self.loadImage(cfg.images).then((imgArr, errArr)=>{

			if(imgArr && imgArr.length == 0){
				log.warm("没有加载到合法图片资源,程序即将终止");

				return;
			}

			if(errArr && imgArr.length > 0){

				log.warm("以下资源没有成功加载");
				log.error(errArr);

				return;
			}

			// cover loopen
			let loopEnd = getCfg("loopEnd");
			if( !loopEnd || loopEnd == 0 ){
				setCfg("loopEnd", imgArr.length)
			}

			self._imgArr = imgArr;
			self._ready  = true;
			self._initPlayer();
			self._randerCover();
			self._eventEmitter.emit("ready")

			if(cfg.autoPlay){
				self._play();
			}
			
		});

	};
}
