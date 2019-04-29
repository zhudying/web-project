// 放在IIFE里面防止变量污染
(function() {
	// 获取元素
	var $carousel = $("#carousel");
	var $imgs = $("#img ul li");
	var $circle = $("#circle ol li");
	// 创建猫腻图
	var $maoni = $("<li class='maoni'></li>").appendTo($("#img ul"));
	// 定义数组将他们放在maoni容器里
	var arr = (function() {
		var temp = [];
		for (var i = 0; i < 3;i ++){
			for (var j = 0; j < 6 ;j ++){
				temp.push($("<div></div>").css({
					"width": 0,
					"height": 0,
					"background": "url(images/slider-img1.jpg) no-repeat " + (-138.33 * j) + "px " + (-143.66 * i) + "px",
					"position": "absolute",
					"left": j * 138.33,
					"top": i * 143.66 
				}).appendTo($maoni));	
			}
		}
		return temp;
	})();
	// 定义信号量
	var big_idx = 0;
	var small_idx = 0;
	// 定义锁
	var lock = true;
	// 开启定时器
	var timer = setInterval(function() {
		// 信号量改变
		small_idx++;
		// 边界判定
		if (small_idx > $circle.length - 1){
			small_idx = 0;
		}
		// 执行换图
		change.call($circle.eq(small_idx));
	}, 6000)
	// 鼠标进入停止定时器
	$carousel.mouseenter(function() {
		console.log(111);
		// 清除定时器
		clearInterval(timer);

	})
	// 鼠标离开重新开启定时器
	$carousel.mouseleave(function() {
		// 设表先关
		clearInterval(timer);
		// 重新开启定时器
		timer = setInterval(function() {
			// 信号量改变
			small_idx++;
			// 边界判定
			if (small_idx > $circle.length - 1){
				small_idx = 0;
			}
			// 执行换图
			change.call($circle.eq(small_idx));
		},6000)
	})

	// 点击事件
	$circle.click(change);
	function change() {
		// 关锁节流
		if (!lock){
			return;
		}
		// 关锁
		lock = false;
		// 改变圆点信号量
		small_idx = $(this).index();
		// 当圆点信号量和大图一样时
		if (small_idx === big_idx){
			// 开锁
			lock = true;
			return;
		}
		// 类名轮换
		$(this).addClass("cur").siblings().removeClass("cur");
		// 蒙版消失
		$(".mask").eq(big_idx).fadeOut(1000);
		// maoni加active
		$maoni.addClass("active");
		// 便利背景图
		$.each(arr,function(i,j) {
			j.css("background-image","url(images/slider-img" + (small_idx + 1) + ".jpg)").animate({
				"width": 138.33,
				"height": 143.66
			},300 + Math.random() * 3000)
		})
		// 延时器
		setTimeout(function(i) {
			// 猫腻图消失
			$.each(arr,function(i,j) {
				j.css({
					"width": 0,
					"height": 0
				})
			})
			// 改变信号量
			big_idx = small_idx;
			// 背景图出现
			$imgs.eq(big_idx).addClass("active").siblings().removeClass("active");
			// 蒙版出现
			$(".mask").eq(big_idx).fadeOut(0).stop(true).fadeIn(1000);
			lock = true;
		},3000)
	}
})();