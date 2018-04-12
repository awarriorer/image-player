import log from 'log';
import util from 'util';

let destroyed = false;

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
}

export function registeredInterface(vm){
	let self = vm;

	self.play = function(direction = 1) {
		log.info("播放~");
		self._play(direction);
	};

	self.pause = function() {
		self._pause();
	};

	self.reset = function() {
		self._reset();
	};

	self.loopEnd = function(fun) {
		let self = this;

		self._eventEmitter.on("_loopEnd", function(obj){
			fun && fun(obj);
		}); 
	};

	self.registeredFilter = function() {
		self._registeredRanderFilter();
	};

	self.removeFilter = function() {
		self._removeAllRanderFilter();
	};

	self.destroy = function() {

		self._reset();
		self._eventEmitter.removeAllListeners();

		let con = document.querySelector(self.select);

		con.removeChild(self.canvas);
		
		destroyed = true;
	};
}

export function registeredInterfaceFilter(vm){
	let self = vm;
	let funArr = ["play", "pause", "reset", "loopEnd", "registeredFilter", "removeFilter", "destroy"];


	for(let i = 0; i < funArr.length; i++){
		registeredEventFilter(self, funArr[i]);
	}
}

function registeredEventFilter(self, name){
	let originFun = self[name];

	return self[name] = function(){
		let thisArguments = arguments;

		if(destroyed){
			
			log.warn("player is destroyed");

			return;
		}

		// go on 
		originFun.apply(self, thisArguments);
	}
};




