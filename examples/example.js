function bodyLoaded() {
    new jsgl.engine(652, 403, jsgl.CANVAS, {
	init: function init(engine) {
            this.square = engine.graphics.makeRect(20, 20, 30, 30);
            this.square.color = '#aaa';
            engine.appendRenderObject(this.square);
	},
	update: function update() {
            this.square.x++;
	    if(this.square.x >= 200) {
		this.square.x = 0 - this.square.width;
	    }
	},
	
	
    }).startFixedFps(20);
}
