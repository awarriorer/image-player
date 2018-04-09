import log from 'log';
import util from 'util';
import {cfg} from 'cfg';


export function initPlayer(vm){
	
	vm.prototype._randerCover = function() {
		
	};

	vm.prototype._play = function() {
		
	};

	vm.prototype._pause = function() {
		
	};

	vm.prototype._startAnimation = function() {
		
	};

	vm.prototype._endAnimation = function() {
		
	};

	vm.prototype._randerImg = function(img) {
		let self  = this;
		let cxt   = self._cxt;
		let showW = cfg.width;
		let showH = cfg.height;
		let imgW  = img.width;
		let imgH  = img.height;
		let sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight = 0;


		// clear
		cxt.clearRect(0, 0, showW, showH);
		// draw
		cxt.drawImage(img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);

	};

}
