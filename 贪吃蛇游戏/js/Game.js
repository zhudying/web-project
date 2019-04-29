function Game(block, food, map, snake, box, pause, sum){
	this.block = block;
	this.food = food;
	this.map = map;
	this.snake = snake;
	this.box = box;
	this.pause = pause;
	this.sum = sum;
	this.timer = null;
	this.flag = null;
	this.grade = 0;
	this.init();
}
// 初始化方法
Game.prototype.init = function() {
	this.renderSum();
	this.renderMap();
	this.renderFood();
	this.renderSnake();
	this.bindEvent();
	this.start();
}
// 渲染计分板
Game.prototype.renderSum = function() {
	this.sum.jfb();
}
// 渲染地图
Game.prototype.renderMap = function() {
	this.map.fill();
}
// 渲染食物
Game.prototype.renderFood = function() {
	var row = this.food.row;
	var col = this.food.col;
	// 食物加背景图片
	this.map.arr[row][col].style.backgroundImage = "url(" + this.food.img + ")";
	// 图片居中
	this.map.arr[row][col].style.backgroundSize = "cover";
}
// 渲染蛇
Game.prototype.renderSnake = function() {
	// 获取头部
	var head = this.snake.arr[this.snake.arr.length - 1];
	// 背景图片是在map里渲染的
	// 头部加背景图片
	this.map.arr[head.row][head.col].style.backgroundImage = "url(" + this.snake.head_pic[this.snake.head_idx] + ")"
	// 循环每一节蛇身体加背景图片
	for (var i = 0; i < this.snake.arr.length - 1; i++){
		// 数组行
		var row = this.snake.arr[i].row;
		// 数组列
		var col = this.snake.arr[i].col;
		// 身体加背景图片
		this.map.arr[row][col].style.backgroundImage = "url(" + this.snake.body_pic[0] + ")";
		// 获取尾部
		var tail = this.snake.arr[0];
		// 尾部背景图片
		this.map.arr[tail.row][tail.col].style.backgroundImage = "url(" + this.snake.tail_pic[this.snake.tail_idx] + ")"
	}
}
// 开始游戏
Game.prototype.start = function() {
	this.flag = true;
	// 存this
	var me = this;
	// 开启定时器
	this.timer = setInterval(function(){
		// 移动
		me.snake.move();
		// 检测是否撞墙
		me.checkMap();
		// 检测蛇与食物是否重合
		me.checkFood();
		// 检测蛇是否吃自己
		me.checkSnake();
		// 检测障碍物是否和食物重合
		me.checkBlock();
		if (me.flag){
			// 清屏
			me.map.clear();
			// 渲染食物
			me.renderFood();
			// 渲染蛇
			me.renderSnake();
			// 渲染障碍
			me.renderBlock ();
		}
	},200);
}
// 绑定键盘事件
Game.prototype.bindEvent = function() {
	// 存this
	var me = this;
	// 绑定键盘
	document.onkeydown = function(e) {
		// 按键与键盘一致
		var code = e.keyCode;
		// 方向键
		if (code === 37 || code === 38 || code === 39 ||code === 40){
			me.snake.change(code);	
		// 暂停键
		}else if(code === 32){
			// 游戏结束
			me.gameOver();
			me.pause.style.display = "block";	
		// 重新开始键
		}else if (code === 13){
			me.pause.style.display = "none";	
			me.box.style.display = "none";
			//游戏开始 
			me.start();
		}
	}	
}
// 游戏结束
Game.prototype.gameOver = function() {
	// 停止定时器
	clearInterval(this.timer);
	this.flag = false;
}
// 检测是否撞墙
Game.prototype.checkMap = function() {
	// 获取头部
	var head = this.snake.arr[this.snake.arr.length - 1];
	// 判定四边墙，头部row与地图尾row一致时撞墙
	if (head.row < 0 || head.row > this.map.row - 1 || head.col < 0 || head.col > this.map.col - 1) {
		// 游戏结束
		this.gameOver();
		// 结束盒子出现
		this.box.style.display = "block";
	}
}
//蛇吃食物
Game.prototype.checkFood = function() {
	// 获取头部
	var head = this.snake.arr[this.snake.arr.length - 1];
	// 获取食物
	var food = this.food;
	// 判定蛇吃食物 头部与食物的row，col一致
	if (head.row === food.row && head.col === food.col){
		// 蛇张长
		this.snake.growUp();
		// 重置食物
		this.resetFood();
		// // 加分
		this.grade++;
		// console.log(arr);
		this.sum.dom.innerHTML = "得分: "  +  this.grade * 10;
	}
}
// 重置食物（食物落在蛇或障碍物身上）
Game.prototype.resetFood = function() {
	// 随机生成row与col
	var row = parseInt(Math.random() * this.map.row);
	var col = parseInt(Math.random() * this.map.col);
	// 判定食物随机到蛇身上时
	for (var i = 0; i < this.snake.arr.length; i++){
		var one = this.snake.arr[i];
		// 蛇的row，col与食物的一致时,食物在蛇身上
		if (one.row === row && one.col === col){
			// 终止程序(递归函数)
			this.resetFood();
			// 返回
			return;
		}
	}
	// 生成的食物也不能出现在障碍物上
	for (var i = 0; i < this.block.arr.length; i++) {
		var one = this.block.arr[i];
		// 判定食物随机到障碍物上
		if (one.row === row && one.col === col) {
			// 再次随机重置食物
			this.resetFood();
			// 终止代码执行
			return;
		}
	}
	// 重置返回
	this.food.reset(row, col);
}
// 检测蛇吃自己事件
Game.prototype.checkSnake = function() {
	// 获取头部
	var head = this.snake.arr[this.snake.arr.length - 1];
	// 循环检测
	for (var i = 0; i < this.snake.arr.length - 1; i++){
		var one = this.snake.arr[i];
		// 蛇row与col与自己身体的roe与col一致时，吃到自己
		if (head.row === one.row && head.col === one.col){
		// 吃到自己游戏结束
		this.gameOver();
		this.box.style.display = "block";

		}
	}
}
// 渲染障碍物
Game.prototype.renderBlock = function() {
	// 循环渲染障碍物
	for (var i = 0; i < this.block.arr.length; i++) {
		// 简化代码
		var row = this.block.arr[i].row;
		var col = this.block.arr[i].col;
		// 障碍物渲染背景图片
		this.map.arr[row][col].style.backgroundImage = "url(" + this.block.img + ")";
		// 图片居中
		this.map.arr[row][col].style.backgroundSize= "cover";
	}
}
// 检测蛇是否落在障碍物上
Game.prototype.checkBlock = function() {
	// 获取蛇的头部
	var head = this.snake.arr[this.snake.arr.length - 1];
	// 循环渲染障碍物
	for (var i = 0; i < this.block.arr.length; i++) {
		var row = this.block.arr[i].row;
		var col = this.block.arr[i].col;
		// 判定蛇头与障碍物的row与col是否重合
		if (head.row === row && head.col === col) {
			// 游戏结束
			this.gameOver();
			this.box.style.display = "block";

		}
	}
}


