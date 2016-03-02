//
// Compatibility with older browsers
//
if (!('bind' in Function.prototype)) {
    console.log('WARNING: bind prototype not defined');
    Function.prototype.bind= function(owner) {
        var that= this;
        var args= Array.prototype.slice.call(arguments, 1);
        return function() {
            return that.apply(owner,
                args.length===0? arguments : arguments.length===0? args :
                args.concat(Array.prototype.slice.call(arguments, 0))
            );
        };
    };
}


