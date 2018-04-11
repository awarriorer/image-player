import log from 'log';
import {cfg, mergeCfg, setCfg, getCfg} from 'cfg';
import util from 'util'

export function initLoadImage(vm){
	vm.prototype.loadImage = function(imgUrlArr) {
		let self = this;
		let len  = imgUrlArr.length;
		let imgArr    = [];
		let errorArr  = [];
		let loadIndex = 0;

		return new Promise((resolve, reject) => {
			for(let i = 0; i < len; i++){
				let url = imgUrlArr[i];

				loadSingleImg(url, i).then((img)=>{
					imgArr.push(img);
					loadIndex++;

					checkCanBack();
				}).catch((url, index)=>{
					errorArr.push({
						index: index,
						src: url,
					});
					loadIndex++;

					checkCanBack();
				});
			}

			// check 
			function checkCanBack(){
				if(loadIndex >= len){
					resolve(imgArr, errorArr);
				}
			}

		});


	};
}

function loadSingleImg(url){

	return new Promise((resolve, reject) => {
		let Img = new Image();

		Img.onload = function(){
			resolve(Img);
		}

		Img.onerror = function(){
			reject(url);
		}

		Img.src = url;
	});
}

export default loadSingleImg;