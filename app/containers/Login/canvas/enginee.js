function Enginee(cnv){
	this.cxt = cnv.getContext("2d");
	this.cnv = cnv;
	this.board = null;
	this.balls = [];
	this.items = [];
	this.buffs = [];
	this.func = {
		itemCrash:null,
		goodGame:null
	};
}
Enginee.prototype.setBoard = function(board){
	this.board = board;
	return this;
}
Enginee.prototype.addBall = function(ball){
	this.balls.push(ball);
	return this;

}
Enginee.prototype.getBall = function(index){
	return this.balls[index ? index: 0];
}
Enginee.prototype.clearBalls = function(){
	this.balls = [];
	return this;
}
Enginee.prototype.addBuff = function(buff){
	this.buffs.push(buff);
	return this;

}
Enginee.prototype.addItem = function(item){
	this.items.push(item);
	return this;
}
Enginee.prototype.addItems = function(items){
	this.items = this.items.concat(items);
	return this;
}
Enginee.prototype.clearItems = function(items){
	this.items = [];
	return this;
}
Enginee.prototype.removeItem = function(item){
	if (!this.items || !this.items.length) return;
	this.items.splice(this.items.indexOf(item), 1);
	return this;
}
Enginee.prototype.play = function(){
	//小球轨迹
	if (this.balls && this.balls.length) {
		this.balls.forEach((item)=>{
			item.y += item.vy;
			item.x += item.vx;
			if (item.y > this.cnv.height - item.radius){ //碰到下边界
				item.y = this.cnv.height - item.radius;
				item.vy = -item.vy;
				if (this.func.goodGame) {
					this.func.goodGame.forEach(function(f){
						f();
					});
				}
			}else if(item.x > this.cnv.width- item.radius){//碰到右边界
				item.x = this.cnv.width- item.radius;
				item.vx = -item.vx;
			}else if (item.x <item.radius) { //碰到左边界
				item.x = item.radius;
				item.vx = -item.vx;
			}else if (item.y <item.radius) {//碰到上边界
				item.y = item.radius;
				item.vy = -item.vy;
			}
			//小球碰撞版
			if(item.x  > this.board.x &&
					item.x < this.board.x + this.board.w &&
					item.y + item.radius > this.board.y){ //碰到上挡板
				item.y = this.board.y - item.radius;
				item.vy = -item.vy;
			}
			//小球碰到碰撞物
			var crashItem = null;
			for (var i = 0; i < this.items.length; i++) {
				var stone = this.items[i];
				if (item.x+item.radius > stone.x && 
					item.x + item.radius < stone.x+ stone.w &&
				item.y > stone.y && item.y < stone.y+stone.h ) { //碰到左边
					item.x = stone.x - item.radius;
					item.vx = - item.vx;
					crashItem = stone;
					break;
				}else if(item.x-item.radius < stone.x + stone.w &&
						item.x - item.radius > stone.x &&
						item.y > stone.y && item.y < stone.y+stone.h){ //碰到右边
					item.x = stone.x + stone.w + item.radius;
					item.vx = - item.vx;
					crashItem = stone;
					break;
				}
				else if(item.y+item.radius > stone.y && 
					item.y + item.radius<stone.y+stone.h && 
						item.x> stone.x && item.x < stone.x+stone.w){ //碰到上边
					item.y = stone.y - item.radius;
					item.vy = -item.vy;
					crashItem = stone;
					break;
				}
				else if(item.y-item.radius < stone.y + stone.h && 
						item.y - item.radius > stone.y &&
					item.x> stone.x && item.x < stone.x+stone.w){ //碰到下边
					item.y = stone.y + stone.h + item.radius;
					item.vy = -item.vy;
					crashItem = stone;
					break;
				}
			}
			if (crashItem) {
				this.removeItem(crashItem);
				if (this.func.itemCrash) {
					this.func.itemCrash.forEach(function(f){
						f();
					});
				}
			}

			item.fill(this.cxt);
		});
	}
	//挡板
	if (this.board) {
		this.board.x += this.board.vx
		if (this.board.x <0){ //碰到左边界
			this.board.x = 0;
		}else if(this.board.x+ this.board.w > this.cnv.width){ //碰到右边界
			this.board.x = this.cnv.width - this.board.w;
		}

		// this.board.vx = 2;
		this.board.fill(this.cxt);
	}
	//碰撞元素
	if (this.items && this.items.length) {
		this.items.forEach((item)=>{
			item.fill(this.cxt);
		});
	}
	//buff元素
	if (this.buffs && this.buffs.length) {
		this.buffs.forEach((buff) => {
			buff.x += buff.vx;
			buff.y += buff.vy;
			if (buff.y > this.cnv.height - buff.radius){ //碰到下边界
				buff.y = this.cnv.height - buff.radius;
				buff.vy = -buff.vy;
				
			}else if(buff.x > this.cnv.width- buff.radius){//碰到右边界
				buff.x = this.cnv.width- buff.radius;
				buff.vx = -buff.vx;
			}else if (buff.x <buff.radius) { //碰到左边界
				buff.x = buff.radius;
				buff.vx = -buff.vx;
			}else if (buff.y <buff.radius) {//碰到上边界
				buff.y = buff.radius;
				buff.vy = -buff.vy;
			}
			//buff碰到挡板
			//小球碰撞版
			if(buff.canActive(this.cnv, this.board)){ //是否开启buff功能
				buff.active(this.cnv, this.board);
			}else{
				buff.fill(this.cxt);
			}
			
			
			
		});
	}
	
}
Enginee.prototype.run = function(){
	var _this = this;
	(function drawFrame(){
        _this.timer = window.requestAnimationFrame(drawFrame);
        _this.cxt.clearRect(0, 0, _this.cnv.width, _this.cnv.height);
        // balls.forEach(function(ball){
        //  enginee.uniformVelocity(ball);
        // });
        _this.play();
        // vy += gravity;
    })();
}
Enginee.prototype.stop = function(){
	window.cancelAnimationFrame(this.timer)
}
Enginee.prototype.getBoard = function(){
	return this.board;
};
Enginee.prototype.moveBoard = function(x){
	if (!this.board) return;
	this.board.x = x;
};
Enginee.prototype.on = function(key, func){
	if (this.func[key]) {
		this.func[key].push(func);
	}else{
		this.func[key] = [func];
	}
}
// Enginee.prototype.update = function(cnv){
// 	this.this.cxt = cnv.getContext("2d");
// 	this.cnv = cnv;
// 	this.items.forEach((item) =>{
// 		// item.w = 
// 	});
// }
export default Enginee;