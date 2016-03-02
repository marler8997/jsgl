
var jsgl = jsgl || {};
jsgl.input = {
    KEY_A     : 65,
    KEY_D     : 68,
    KEY_W     : 87,

    KEY_SPACE : 32,

    KEY_LEFT  : 37,
    KEY_UP    : 38,
    KEY_RIGHT : 39,
    KEY_DOWN  : 40,

    keysDown : {},
    register : function() {
	addEventListener('keydown', function(e) {
	    jsgl.input.keysDown[e.keyCode] = true;
	});
	addEventListener('keyup', function(e) {
	    jsgl.input.keysDown[e.keyCode] = false;
	});
    }
};


