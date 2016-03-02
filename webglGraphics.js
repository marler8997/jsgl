
var colornames={
    aqua:'#00ffff', black:'#000000', blue:'#0000ff', fuchsia:'#ff00ff',
    gray:'#808080', green:'#008000', lime:'#00ff00', maroon:'#800000',
    navy:'#000080', olive:'#808000', orange:'#ffa500', purple:'#800080',
    red:'#ff0000', silver:'#c0c0c0', teal:'#008080', white:'#ffffff',
    yellow:'#ffff00'
}
function getRgb(c){
    c = c.toLowerCase();
    if (/^[a-z]+$/.test(c)){
        c = colornames[c];
    }
    if(/^#([a-f0-9]{3}){1,2}$/.test(c)){
        if(c.length== 4){
            c= '#'+[c[1], c[1], c[2], c[2], c[3], c[3]].join('');
        }
        c= '0x'+c.substring(1);
        return [(c>>16)&255, (c>>8)&255, c&255];
    }
    else if(c.indexOf('rgb')== 0){
        c= c.match(/\d+(\.\d+)?%?/g);
        if(c){
            for(var i= 0;i<3;i++){
                if(c[i].indexOf('%')!= -1){
                         c[i]= Math.round(parseFloat(c[i])*2.55);
                    }
                if(c[i]<0) c[i]= 0;
                if(c[i]>255) c[i]= 255;
            }
            return c;
        }
    }
}

function createWebGLGraphics(canvas) {
    gl = null;
    
    try {
	// Try to grab the standard context.
        // If it fails, fallback to experimental.
	gl = canvas.getContext("webgl") ||
             canvas.getContext("experimental-webgl");
    }
    catch(e) {}
    
    // If we don't have a GL context, give up now
    if (!gl) {
	return null;
    }

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.enable(gl.DEPTH_TEST);
    
    return {
	gl: gl,

	setBackColor : function setBackColor(color) {
	    var rgb = getRgb(color);
	    gl.clearColor(rgb[0]/255, rgb[1]/255, rgb[2]/255, 1);
	},
	startFrame : function startFrame() {
	    
	},
	finishFrame : function finishFrame() {
	    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	},
	setFillStyle : function setFillStyle(style) {
	    //this.ctx.fillStyle = style;
	},
	fillRect: function fillRect(x, y, width, height) {
	    //this.ctx.fillRect(x, y, width, height);
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
		    //g.ctx.fillStyle = this.color;
		    //g.ctx.fillRect(this.x, this.y, this.width, this.height);
		}
	    };
	}
    };
}

