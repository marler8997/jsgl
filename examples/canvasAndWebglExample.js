function createGameObject() {
    return {
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
    }
}
function bodyLoaded() {
    var canvasEngine = new jsgl.engine(324, 200, jsgl.CANVAS, createGameObject());
    canvasEngine.graphics.setBackColor('#eee');
    canvasEngine.startFixedFps(20);
    
    document.body.appendChild(document.createElement('br'));
    
    var webglEngine = new jsgl.engine(324, 200, jsgl.WEBGL , createGameObject());
    webglEngine.graphics.setBackColor('#eee');
    webglEngine.startFixedFps(20);
}
