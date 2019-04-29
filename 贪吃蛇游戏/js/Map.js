function Map(row, col, width, height){
	this.arr = [];
	this.row = row;
	this.col = col;
	this.width = width;
	this.height = height;
	// 大盒子存放17 * 45 行列的格子
	this.dom = document.createElement("div");
}
Map.prototype.fill = function() {
	// 循环渲染每一列
	for (var j = 0; j < this.row; j ++){
		// 创建行
		var row_dom = document.createElement("div");
		// 创建行的数组
		var arr_row = [];
		// 给行添加类名
		row_dom.className = "row";
		// 循环渲染每一行
		for (var i = 0; i < this.col; i++){
			// 创建小方格
			var col_dom = document.createElement("span");
			// 给小方格添加类名
			col_dom.className = "fangge";
			// 小方格放在行里
			row_dom.appendChild(col_dom);
			// 小方格放在行数组里
			arr_row.push(col_dom);

		}
		// 将行放在dom里
		this.dom.appendChild(row_dom);
		// 将行数组添加在大数组里
		this.arr.push(arr_row);
	}
	// 给元素添加类名
	this.dom.className = "map";
	// dom上树到body
	document.body.appendChild(this.dom);
}
// 清除屏幕
Map.prototype.clear = function() {
	// 数组i行
	for (var i = 0; i < this.arr.length; i++){
		// 数组j列
		for (var j = 0;j < this.arr[i].length; j++){
			// 清除背景图片
			this.arr[i][j].style.backgroundImage = "none";
		}
	}
} 
