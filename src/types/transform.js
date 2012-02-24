var scaleOps = {
    add: 'mul',
    sub: 'div'
};

function RatchetTransform(opts) {
    opts = opts || {};
    
    // ensure the scale units are set to an empty string
    opts.scale = opts.scale || {};
    opts.scale.units = '';
    
    // create new translation rotation and scale values, duplicating the value provided 
    this.translate = new XYZ('translate', opts.translate);
    this.rotate = new XYZ('rotate', opts.rotate);
    this.scale = new XYZ('scale', opts.scale);
}

RatchetTransform.prototype = {};

['add', 'sub'].forEach(function(op) {
    RatchetTransform.prototype[op] = function() {
        // create new values to receive target values
        var newTransform = new RatchetTransform();
        
        // calculate the translation change
        newTransform.translate = XYZ.prototype[op].apply(
            this.translate,
            Array.prototype.map.call(arguments, function(item) { return item.translate; })
        );
        
        // calculate the scale change (mapping add to mul)
        newTransform.scale = XYZ.prototype[scaleOps[op]].apply(
            this.scale,
            Array.prototype.map.call(arguments, function(item) { return item.scale; })
        );
        
        // calculate the rotation update
        newTransform.rotate = XYZ.prototype[op].apply(
            this.rotate,
            Array.prototype.map.call(arguments, function(item) { return item.rotate; })
        );
        
        return newTransform;
    };
});