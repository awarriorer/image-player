
import {init} from './init'
import {initLoadImage} from './load-image'
import {initInterface} from './interface'
import {initPlayer} from './player'

function ImagePlayer(select, options){
	this.init(select, options);
}


init(ImagePlayer);
initLoadImage(ImagePlayer);
initPlayer(ImagePlayer);
initInterface(ImagePlayer);

module.exports = ImagePlayer;
