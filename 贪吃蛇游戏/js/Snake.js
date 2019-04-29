function Snake(pic_obj){
	this.arr = [
		{row: 10, col: 10},
		{row: 10, col: 11},
		{row: 10, col: 12},
		{row: 10, col: 13},
		{row: 10, col: 14},
		{row: 10, col: 15},
	];
	// 蛇头部图片
	this.head_pic = pic_obj.head_pic;
	// body图片
	this.body_pic = pic_obj.body_pic;
	// 尾部图片
	this.tail_pic = pic_obj.tail_pic;
	// 默认头部索引值
	this.head_idx = 2;
	// 默认尾部索引值
	this.tail_idx = 0;
	// 加锁
	this.lock = true;
	// 默认蛇头方向向右
	this.direction = 39;
}
// 蛇移动方法
Snake.prototype.move = function() {
	//创建新的头
	var newHerd = {
		row : this.arr[this.arr.length - 1].row,
		col : this.arr[this.arr.length - 1].col
	}
	// 头部向左时
	if (this.direction === 37){
		// 向前移动col减
		newHerd.col--;
	}else if (this.direction === 38){
		newHerd.row--;
	}else if (this.direction === 39){
		newHerd.col++;
	}else if (this.direction === 40){
		newHerd.row++;
	}
	// 新头放在尾部
	this.arr.push(newHerd);
	// 去除尾部
	this.arr.shift();
	// 开锁
	this.lock = true;
// 控制尾部方向与尾部相接的屁股有关
	// 尾巴 	
	var tail = this.arr[0];
	// 屁股
	var pg = this.arr[1];
	// 判断他俩在同行或同列
	// 同列
	if (tail.col === pg.col){
		// 尾巴的行大于屁股的行，说明尾巴在下端，尾尖向下
		this.tail_idx = tail.row > pg.row ? 3 : 1;
	}else {
		// 同理
		this.tail_idx = tail.col < pg.col ? 0 : 2;
	}
}
// 控制蛇头方向
Snake.prototype.change = function(direction) {
	// 过河拆桥
	if (!this.lock){
		return;
	}
	// 进来关锁
	this.lock = false;
	// 用户点击的按键 - 键盘键 =  | 2 | 或 0 （绝对值）
	var result = Math.abs(direction - this.direction);
	// 等于2或0 时说明在同行或同列，点击无效，返回
	if (result === 2 || result === 0){
		return;
	//否则 输出用户按键 
	}else {
		this.direction = direction;
	}
	// 判断方向与蛇头图片的关系
	if (direction === 37){
		// 向左时，索引值为 0 的图片
		this.head_idx = 0;
		// 同理
	}else if (direction === 38) {
		this.head_idx = 1;
	} else if (direction === 39) {
		this.head_idx = 2;
	} else if (direction === 40) {
		this.head_idx = 3;
	} 
}
// 蛇张长事件 即 增加数组个数
Snake.prototype.growUp = function() {
	// 蛇尾即是数组的头部
	var tail = this.arr[0];
	// 添加在在数组头部（蛇尾）
	this.arr.unshift(tail);
}
// // 蛇变短
// Snake.prototype.growDown= function() {
// 	// 减少数组个数
// 	// 蛇尾即数组的头部
// 	var tail = this.arr[0];
// 	// 放在数组头部（蛇尾）
// 	this.arr.shift(tail);
// }