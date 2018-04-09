
import {init} from './init'
import {initLoadImage} from './load-image'
import {initInterface} from './interface'

function ImagePlayer(select, options){
	this.init(select, options);
}


init(ImagePlayer);
initLoadImage(ImagePlayer);
initInterface(ImagePlayer);

module.exports = ImagePlayer;
