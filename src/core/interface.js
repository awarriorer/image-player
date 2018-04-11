import log from 'log';
import util from 'util';

export function initInterface(vm){
	vm.prototype.ready = function(callback) {
		let self = this;

		if(self._ready){
			callback(self);
		}else{
			self._eventEmitter.on("ready", function(){
				callback(self);
			});
		}
	};

	vm.prototype.play = function() {
		this._play();
	};

	vm.prototype.pause = function() {
		this._pause();
	};

	vm.prototype.destroy = function() {
		
	};


}
