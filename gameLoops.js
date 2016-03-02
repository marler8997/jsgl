var jsgl = jsgl || {};

// frameDropAllowance - Specifies how many frames you can drop in order
//    to keep the game running quickly.  A value of 0 means that the game
//    will render every single frame no matter how much it slows down the game.
//    A low value will result in game slow down if it can't keep up.
//    A higher value will result in dropped frames if the fps cannot be maintained.
//
// Note: The update callback for a fixed fps game loop does not contain a time variable
//
jsgl.GameLoopFixedFps = function (engine, frameDropAllowance) {
    var updatesToRender = 0;
    var render = function() {
	//setTimeout(function() { // UNCOMMENT TO SIMULATE SLOW RENDER TIME
	if(updatesToRender == 0) {
	    throw "ERROR(CodeBug) render called but there are no updates";
	}
	if(updatesToRender > 1) {
	    console.log("WARNING: dropped " + (updatesToRender - 1) + " frame(s)");
	}
	
	engine.graphics.startFrame();
	
	for(i = 0; i < engine.renderObjects.length; i++) {
	    engine.renderObjects[i].render(engine.graphics);
	}
	
	engine.graphics.finishFrame();
	updatesToRender = 0;
        //}, 40);
    };
    var update = function() {
	if(updatesToRender > 0) {
	    if(updatesToRender > frameDropAllowance) {
		return; // skip the update (slows the game down)
		//console.log("WARNING: " + (updatesToRender+1) + " update(s) since last render");
	    } else {
		//console.log("WARNING: " + (updatesToRender+1) + " update(s) since last render");
	    }
	}
	engine.game.update();
	updatesToRender++;
	if(updatesToRender == 1) {
            requestAnimationFrame(render);
	}
    };
    this.start = function(msPerFrame) {
	setInterval(update, msPerFrame);
    };
}

//
// This game loop will render frame as often as possible.
// This means that the time interval between game updates can vary so
// the game physics will need to account for the time elapsed between each update.
// in order to ensure consistent game speed. To accomodate this, the gameLoop
// will provide the milliseconds since the last update as an argument to the update
// callback.
//
jsgl.GameLoopSmooth = function(engine) {
    var render = function() {
	engine.graphics.startFrame();
	for(i = 0; i < engine.renderObjects.length; i++) {
	    engine.renderObjects[i].render(engine.graphics);
	}
	engine.graphics.finishFrame();
	setTimeout(update, 0);
    };
    var lastUpdate;
    var update = function() {
	var newUpdate = performance.now();
	engine.game.update(newUpdate - lastUpdate);
	lastUpdate = newUpdate;
	requestAnimationFrame(render);
    };
    this.start = function() {
	setTimeout(update, 0);
    };
    lastUpdate = performance.now();
};
