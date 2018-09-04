function Borad(x, y, w, h,color){
	this.x = x || 0;
	this.y = y || 0;
	this.w = w || 10;
	this.h = h || 10;
	this.color = color ||"#6699ff";
	this.scaleX = 1;
	this.scaleY = 1;
}
Borad.prototype.fill = function(cxt){
	cxt.save();
	cxt.translate(this.x, this.y);
	cxt.rotate(this.rotation);
	cxt.scale(this.scaleX, this.scaleY);
	cxt.fillStyle = this.color;
	cxt.beginPath();
	cxt.rect(0, 0, this.w, this.h);
	cxt.closePath();
	cxt.fill();
	cxt.restore();
}

export default Borad;