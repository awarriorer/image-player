window.onload = function(){

	function query(id){
		return document.querySelector(id)
	}

	var IP = new ImagePlayer("#con", options);


	IP.ready(function(){
		console.log("image player is ready!");

		// 绑定事件
		query("#play").onclick = IP.play;

		query("#playReverse").onclick = function(){
			IP.play(-1);
		};

		query("#pause").onclick = IP.pause;
		query("#openLoop").onclick = IP.openLoop;
		query("#closeLoop").onclick = IP.closeLoop;
		query("#reset").onclick = IP.reset;
		query("#destroy").onclick = IP.destroy;
	});

	IP.ready(function(){
		IP.loopEnd(function(obj){
			// console.log("循环结束~");
			// console.log(obj);
		});
	});

	IP.ready(function(){
		IP.registeredFilter(function(opts, next){
			// console.log("自定义过滤器");
			// console.log(opts);

			// 一定要把回调放出去，否则会终端执行
			next();
		});
	});

}