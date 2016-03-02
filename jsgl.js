
// Create or get the jsgl namespace
var jsgl = jsgl || {};

jsgl.AUTO     = 0;
jsgl.WEBGL    = 1;
jsgl.CANVAS   = 2;
jsgl.HEADLESS = 3;

// FrameRate Techniques
// 1. Drop Frames?
// 2. Slow down game?

// Game must provide a 'render' function and an 'update' function
jsgl.engine = function(width, height, graphicsEngine, game) {
    if(typeof(game) == 'undefined') {
	this.fatal('missing start object');
    }
    if(!('init' in game)) {
	this.fatal('start object is missing the init function');
    }
    if(!('update' in game)) {
	this.fatal('start object is missing the update function');
    }

    this.updatesToRender = 0;
    this.width = width;
    this.height = height;

    //this.backColor = '#000';
    this.renderObjects = [];

    this.game = game;

    // Create Graphics
    this.canvas = document.createElement('canvas');
    this.canvas.width  = width;
    this.canvas.height = height;
    
    if(graphicsEngine == jsgl.AUTO) {
	this.graphics = createWebGLGraphics(this.canvas);
	if(this.graphics) {
	    console.log('WebGL Graphics!');
	} else {
	    this.graphics = createCanvasGraphics(this.canvas);
	    if(this.graphics) {
		console.log('Canvas Graphics!');
	    } else {
		this.fatal('No WebGL or Canvas graphics');
	    }
	}
    } else if(graphicsEngine == jsgl.WEBGL) {
	this.graphics = createWebGLGraphics(this.canvas);
	if(!this.graphics) {
	    this.fatal('WebGL graphics not supported in this browser');
	}
    } else if(graphicsEngine == jsgl.CANVAS) {
	this.graphics = createCanvasGraphics(this.canvas);
	if(!this.graphics) {
	    this.fatal('Canvas graphics not supported in this browser');
	}
    } else {
	this.fatal('Unknown graphicsEngine');
    }
    this.game.init(this);

    document.body.appendChild(this.canvas);

    return this;
}

jsgl.engine.prototype.constructor = jsgl.engine;

jsgl.engine.prototype = {
    appendRenderObject : function appendRenderObject(obj) {
	this.renderObjects.push(obj);
    },
    startFixedFps: function (msPerFrame, frameDropAllowance) {
	new jsgl.GameLoopFixedFps(this, frameDropAllowance).start(msPerFrame);
    },
    startSmooth: function () {
	new jsgl.GameLoopSmooth(this).start();
    },
};


