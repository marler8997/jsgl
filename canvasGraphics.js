function createCanvasGraphics(canvas)
{
    ctx = canvas.getContext('2d');
    if(!ctx) {
	console.log('no 2d context');
	return null;
    }

    ctx.font = "20px Georgia"; // Default font for now

    return {
	ctx: ctx,
	backColor : '#000',
	width : canvas.width,
	height : canvas.height,

	setBackColor : function setBackColor(color) {
	    this.backColor = color;
	},
	startFrame : function startFrame() {
	    // draw the background
	    this.ctx.fillStyle = this.backColor;
	    this.ctx.fillRect(0, 0, this.width, this.height);
	},
	finishFrame : function finishFrame() {
	},
	setFillStyle : function setFillStyle(style) {
	    this.ctx.fillStyle = style;
	},
	fillRect: function fillRect(x, y, width, height) {
	    this.ctx.fillRect(x, y, width, height);
	},
	
	// Render Objects
	makeRect : function makeRect(x, y, width, height) {
	    return {
		x:x,
		y:y,
		width:width,
		height:height,
		color:'#fff',
		render:function rectRender(g) {
		    g.ctx.fillStyle = this.color;
		    g.ctx.fillRect(this.x, this.y, this.width, this.height);
		}
	    };
	}
    };
}

