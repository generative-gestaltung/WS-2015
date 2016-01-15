
/* 
 * math functions
 */

var rand = function (min, max) {
	return min + Math.random()*(max-min);
}
var blend = function (x0, x1, t) {
	return x0*(1-t) + x1*t;
}
    
var blend2d = function (x0, x1, t) {
	return {x : blend (x0.x, x1.x, t),
    y : blend (x0.y, x1.y, t)};
}

var blend3d = function (x0, x1, t) {
	return {x : blend (x0.x, x1.x, t),
            y : blend (x0.y, x1.y, t),
            z : blend (x0.z, x1.z, t)};
}

var blendSet = function (set0, set1, t) {
	var ret = {};

    for (key in set0) {
    	ret[key] = blend (set0[key], set1[key], t);
    }
    return ret;
}

var blendPaths = function (path0, path1, t) {
	var ret = [];
	
	for (var i=0; i<path0.length; i++) {
		ret[i] = blendSet(path0[i], path1[i],t);
	}
	return ret;
}

var constrain = function (value, min, max) {
	if (value<min) return min;
	if (value>max) return max;
	return value;
}

/* 
 * draw functions
 */

var fillRGB = function (context, r, g, b) {
	r = Math.round(r);
	g = Math.round(g);
	b = Math.round(b);
	context.fillStyle = "rgba("+r+","+g+","+b+",1.0)";
}

var drawPath = function (context, points) {
	
	context.beginPath();
	context.moveTo(points[0].x, points[0].y);
	for (i in points) {
		context.lineTo(points[i].x, points[i].y);
	}
	context.closePath();
	context.stroke();
}


/*
 * animation keyframe stuff
 */

var createAnimation = function () {
    return {
        len : 0,
        keyframes : []
    }
}

var addKeyFrame = function (anim, keyframe) {
    anim.keyframes[anim.len] = keyframe;
	anim.len ++;
}

var playAnim = function (anim, frame) {
    var i;
    if (frame<0) frame=0;
    // loop
    maxT = anim.keyframes[anim.len-1].frame;
    frame = frame%maxT;

    for (i=0; i<anim.len; i++) {
        if (frame < anim.keyframes[i].frame)
          break; 
    }
  
    t0 = anim.keyframes[i-1].frame;
    t1 = anim.keyframes[i].frame;

    v0 = anim.keyframes[i-1].value;
    v1 = anim.keyframes[i].value;
      
    t = (frame - t0) / (t1-t0);
    return blend (v0, v1, t);
}
