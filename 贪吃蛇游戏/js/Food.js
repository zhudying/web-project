function Food(x, y,img) {
	this.img = img;
	this.row = x;
	this.col = y;
}
// 重置食物
Food.prototype.reset = function(x, y) {
	this.row = x;
	this.col = y;
}