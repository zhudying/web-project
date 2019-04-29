function Sum(width, height) {
	this.width = width;
	this.height = height;
	this.dom = document.createElement("div");
}
Sum.prototype.jfb = function() {
	// 添加类名
	this.dom.className = "fen";
	// 上树
	document.body.appendChild(this.dom);
	// 样式
	this.dom.innerHTML = "得分: "  +  0;

}