import { getRandomNum} from '../../../util/common.js';

function Buff(x, y, radius,color, type, interval){
	this.x = x || 0;
	this.y = y || 0;
	this.radius = radius || 12;
	this.color = color ||"#00ff00";
	this.scaleX = 1;
	this.scaleY = 1;
	this.vx = 3;
	this.vy = 3;
	//什么类型
	this.type = type || 1;//加长buff
	this.interval = interval||5000;
	this.duration = 10000;
	// this.canShowBuff = false;
	this.hidden = true;
	this.init.call(this);

}
Buff.prototype.init = function(){
	window.setInterval(() => {
		if (!this.hidden) return;
		this.vx = getRandomNum(-3,3);
		this.vy = getRandomNum(-3,3);
		this.hidden = false;
	},this.interval)
}
Buff.prototype.fill = function(cxt){

	if (this.hidden) return;
	cxt.save();
	cxt.translate(this.x, this.y);
	cxt.rotate(this.rotation);
	cxt.scale(this.scaleX, this.scaleY);
	cxt.fillStyle = this.color;
	cxt.beginPath();
	cxt.arc(0, 0, this.radius, 0, 360 * Math.PI /180, false);
	cxt.closePath();
	cxt.fill();
	cxt.beginPath();
	cxt.font = "20px 黑体";
	cxt.fillStyle = "yellow";
	cxt.textAlign="center";
	cxt.fillText("w",0, this.radius/2);
	cxt.restore();
}
Buff.prototype.canActive = function(cnv, board){
	return  this.hidden === false && this.x > board.x &&
					this.x < board.x + board.w &&
					this.y + this.radius > board.y
}
Buff.prototype.active = function(cnv, board){
	this.hidden = true;
	board.w *= 2;
	if (board.w > cnv.width) {
		board.w = cnv.widt;
	}
	window.setTimeout(() => {
		board.w /= 2
	},this.duration)
}
// Buff.prototype.setHidden = function(){
// 	this.hidden = true;
// 	this.x = 0;
// 	this.y = 0;
// 	window.setTimeout(() => {
// 		// if (this.hidden) {
// 		// 	this._hidde = false;
// 		// }
// 		this.hidden = false;
// 	},this.interval)
// }


export default Buff;