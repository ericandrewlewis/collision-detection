var start = new Date().getTime();
// Polyfill for the Array.findIndex()
if (!Array.prototype.findIndex) {
  Array.prototype.findIndex = function(predicate) {
    if (this == null) {
      throw new TypeError('Array.prototype.findIndex called on null or undefined');
    }
    if (typeof predicate !== 'function') {
      throw new TypeError('predicate must be a function');
    }
    var list = Object(this);
    var length = list.length >>> 0;
    var thisArg = arguments[1];
    var value;

    for (var i = 0; i < length; i++) {
      value = list[i];
      if (predicate.call(thisArg, value, i, list)) {
        return i;
      }
    }
    return -1;
  };
}

/**
 * Create a line segment.
 *
 * @param  {[type]} point1 [description]
 * @param  {[type]} point2 [description]
 * @return {[type]}        [description]
 */
lineSegment = function(name, point1, point2) {
	this.name = name;
	// Determine the sided-ness of the segment's endpoints.
	if ( point1.x < point2.x ) {
		this.leftEndpoint = point1;
		this.rightEndpoint = point2;
	} else if ( point2.x < point1.x ) {
		this.leftEndpoint = point2;
		this.rightEndpoint = point1;
	} else {
		if ( point1.y > point2.y ) {
			this.leftEndpoint = point1;
			this.rightEndpoint = point2;
		} else {
			this.leftEndpoint = point2;
			this.rightEndpoint = point1;
		}
	}
	this.slope = ( this.rightEndpoint.y - this.leftEndpoint.y ) / (this.rightEndpoint.x - this.leftEndpoint.x);
	this.b = this.leftEndpoint.y - (this.slope) * this.leftEndpoint.x;
	/**
	 * Get the y coordinate of a spot on the line given an x coordinate.
	 *
	 * Use slope-intercept formula for fast processing.
	 *
	 * @param  {[type]} x [description]
	 * @return {[type]}   [description]
	 */
	this.y = function(x) {
		return this.slope * x + this.b;
	};
	return this;
};

var lineSegments = [];
segmentData = [{
	name:'a',
	x1: 182,
	y1: 167,
	x2: 251,
	y2: 353
	},
	{
	name:'b',
	x1: 7,
	y1: 21,
	x2: 295,
	y2: 284
	},
	{
	name:'c',
	x1: 27,
	y1: 472,
	x2: 96,
	y2:  132
	},
	{
	name:'d',
	x1: 477,
	y1: 17,
	x2: 484,
	y2: 356
	}
];
// 182, 167 to 251, 353
// b: 7, 21 to 295, 284
// c: 27, 472 to 96, 132
// d: 477, 17 to 484, 356
for ( i = 0; i <=3; i++ ) {
	lineSegments.push( new lineSegment(
		segmentData[i].name,
		// { x: segmentData[i].x1, y: segmentData[i].y1 },
		// { x: segmentData[i].x2, y: segmentData[i].y2 }
		{ x: Math.ceil( 500 * Math.random() ), y: Math.ceil( 500 * Math.random() ) },
		{ x: Math.ceil( 500 * Math.random() ), y: Math.ceil( 500 * Math.random() ) }
	) );
}
var asdf = '';
lineSegments.forEach(function(lineSegment) {
	asdf += 'lineSegments.push( new lineSegment("'+lineSegment.name+'", {x: '+lineSegment.leftEndpoint.x + ', y: ' + lineSegment.leftEndpoint.y + '}, {x: '+lineSegment.rightEndpoint.x +', y: '+ lineSegment.rightEndpoint.y + '}) );';
});


// console.log(asdf);
// console.log( JSON.stringify(lineSegments));
lineSegments = [];
lineSegments.push(
	new lineSegment("a", {x: 256, y: 428}, {x: 455, y: 79}) );
lineSegments.push( new lineSegment("b", {x: 161, y: 26}, {x: 401, y: 251}) );
lineSegments.push( new lineSegment("c", {x: 20, y: 41}, {x: 480, y: 464}) );
lineSegments.push( new lineSegment("d", {x: 37, y: 2}, {x: 50, y: 51}) );

/**
 * Create and return event queue.
 *
 * An event queue is an array with built-in sorting by ascending x-coordinates
 * and falling back to descending y-coordinates.
 */
function EventQueue() {
	//
	var events = new Array();
	events.sort = function() {
		return Array.prototype.sort.call(this, function(point1, point2) {
			if ( point1.x < point2.x ) {
				return -1;
			} else if ( point2.x < point1.x ) {
				return 1;
			} else {
				if ( point1.y > point2.y ) {
					return -1;
				} else if ( point2.y > point1.y ) {
					return 1;
				} else {
					return 0;
				}
			}
		});
	};
	return events;
};

eq = EventQueue();

//     Initialize event queue EQ = all segment endpoints;
lineSegments.forEach(function(lineSegment) {
	eq.push({
		type: 'leftEndpoint',
		x: lineSegment.leftEndpoint.x,
		y: lineSegment.leftEndpoint.y,
		lineSegment: lineSegment
	});
	eq.push({
		type: 'rightEndpoint',
		x: lineSegment.rightEndpoint.x,
		y: lineSegment.rightEndpoint.y,
		lineSegment: lineSegment
	});
});
//     Sort EQ by increasing x and y;
eq.sort();

var SweepLine = function() {
	this.lineSegments = [];
	this.x = 0;
	/**
	 * Sort the lines in the sweepLine by descending y value at curent point x.
	 *
	 * @return {[type]} [description]
	 */
	this.sort = function() {
		var self = this;
		return this.lineSegments.sort(function(segment1, segment2) {
			if ( segment1.name == 'a' || segment2.name == 'a' ) {
				// debugger;
			}
			if ( segment1.y(self.x) > segment2.y(self.x) ) {
				return -1;
			} else {
				return 1;
			}
		});
	};
	this.findIndexFromValue = function(value) {
		return this.lineSegments.findIndex(function(item) {
			return value == item;
		});
	};
	this.push = function(item) {
		this.lineSegments.push(item);
		this.sort();
		var found = this.findIndexFromValue(item);
		return found;
	};
	this.before = function(index) {
		if ( this.lineSegments[index-1] ) {
			return this.lineSegments[index-1];
		} else {
			return false;
		}
	};
	this.after = function(index) {
		if ( this.lineSegments[index+1] ) {
			return this.lineSegments[index+1];
		} else {
			return false;
		}
	};
	this.remove = function(index) {
		this.lineSegments.splice(index, 1);
	};
	return this;
};
//     Initialize sweep line SL to be empty;
var sweepLine = new SweepLine();
while ( eq.length ) {
	var event = eq[0];
	sweepLine.x = event.x;
	sweepLine.sort();
	var debug = '';
	sweepLine.lineSegments.forEach(function(lineSegment) {
		debug += ' ' + lineSegment.name + ' ';
	});
	console.log( 'sweep line order ' + debug );
	var lineSegment = event.lineSegment;
	console.log('sweeping at ' + event.x + ', ' + event.y );
	if ( event.type == 'leftEndpoint' ) {
		var index = sweepLine.push(lineSegment);
		var before = sweepLine.before(index);
		var after = sweepLine.after(index);
		if ( before ) {
			console.log( 'checking if ' + lineSegment.name + ' intersects with ' + before.name );
		}
		if ( before && lineSegmentsIntersect( {x:lineSegment.leftEndpoint.x, y:lineSegment.leftEndpoint.y},
		                                      {x:lineSegment.rightEndpoint.x, y:lineSegment.rightEndpoint.y},
		                                      {x:before.leftEndpoint.x, y:before.leftEndpoint.y},
		                                      {x:before.rightEndpoint.x, y:before.rightEndpoint.y} ) ) {
			var intersect = whereTwoLineSegmentsIntersect( lineSegment, before );
			console.log( 'pushing intersection ' + intersect.x + ', ' + intersect.y + 'into queue' );
			eq.push( intersect );

			eq.sort();
			lineSegment.hasIntersection = true;
			before.hasIntersection = true;
		}
		if ( after ) {
			console.log( 'checking if ' + lineSegment.name + ' intersects with ' + after.name );
		}
		if ( after && lineSegmentsIntersect( {x:lineSegment.leftEndpoint.x, y:lineSegment.leftEndpoint.y},
		                                      {x:lineSegment.rightEndpoint.x, y:lineSegment.rightEndpoint.y},
		                                      {x:after.leftEndpoint.x, y:after.leftEndpoint.y},
		                                      {x:after.rightEndpoint.x, y:after.rightEndpoint.y} ) ) {
			var intersect = whereTwoLineSegmentsIntersect( lineSegment, before );
			eq.push( intersect );
			eq.sort();
			lineSegment.hasIntersection = true;
			after.hasIntersection = true;
		}
	} else if ( event.type == 'rightEndpoint' ) {
		var index = sweepLine.findIndexFromValue(lineSegment);
		var before = sweepLine.before(index);
		var after = sweepLine.after(index);

		sweepLine.remove(index);
		if ( before && after && lineSegmentsIntersect( {x:after.leftEndpoint.x, y:after.leftEndpoint.y},
		                                      {x:after.rightEndpoint.x, y:after.rightEndpoint.y},
		                                      {x:before.leftEndpoint.x, y:before.leftEndpoint.y},
		                                      {x:before.rightEndpoint.x, y:before.rightEndpoint.y} ) ) {
			var intersect = whereTwoLineSegmentsIntersect( after, before );
			eq.push( intersect );
			eq.sort();
			before.hasIntersection = true;
			after.hasIntersection = true;
		}
	} else {
		// Since the sweepline will (probably) have the old order...
		var line1index = sweepLine.findIndexFromValue(event.line1);
		var line2index = sweepLine.findIndexFromValue(event.line2);
		if ( line1index < line2index ) {
			var lineGoingUp = event.line2, lineGoingUpIndex = line2index,
			    lineGoingDown = event.line1, lineGoingDownIndex = line1index;
		} else {
			var lineGoingUp = event.line1, lineGoingUpIndex = line1index,
			    lineGoingDown = event.line2, lineGoingDownIndex = line2index;
		}
		var before = sweepLine.before(lineGoingDownIndex),
		    after = sweepLine.after(lineGoingUpIndex);

		if ( before && lineSegmentsIntersect( {x:lineGoingUp.leftEndpoint.x, y:lineGoingUp.leftEndpoint.y},
		                                      {x:lineGoingUp.rightEndpoint.x, y:lineGoingUp.rightEndpoint.y},
		                                      {x:before.leftEndpoint.x, y:before.leftEndpoint.y},
		                                      {x:before.rightEndpoint.x, y:before.rightEndpoint.y} ) ) {
			var intersect = whereTwoLineSegmentsIntersect( lineGoingUp, before );
			console.log( 'pushing intersection ' + intersect.x + ', ' + intersect.y + 'into queue' );
			eq.push( intersect );
			eq.sort();
			lineGoingUp.hasIntersection = true;
			before.hasIntersection = true;
		}
		if ( after && lineSegmentsIntersect( {x:lineGoingDown.leftEndpoint.x, y:lineGoingDown.leftEndpoint.y},
		                                      {x:lineGoingDown.rightEndpoint.x, y:lineGoingDown.rightEndpoint.y},
		                                      {x:after.leftEndpoint.x, y:after.leftEndpoint.y},
		                                      {x:after.rightEndpoint.x, y:after.rightEndpoint.y} ) ) {
			var intersect = whereTwoLineSegmentsIntersect( lineGoingDown, after );
			console.log( 'pushing intersection ' + intersect.x + ', ' + intersect.y + 'into queue' );
			eq.push( intersect );
			eq.sort();
			lineGoingDown.hasIntersection = true;
			after.hasIntersection = true;
		}
	}
	eq.shift();
}

/**
 * Find where two line segments intersect.
 *
 * @param  {[type]} line1 [description]
 * @param  {[type]} line2 [description]
 * @return {[type]}       [description]
 */
function whereTwoLineSegmentsIntersect( line1, line2 ) {
	var x = ( line2.b - line1.b ) / ( line1.slope - line2.slope );
	var y = line1.slope * x + line1.b;
	return { x: x, y: y, line1: line1, line2: line2 };
}
var svg = document.querySelector('svg');
lineSegments.forEach(function(line) {
	var svgline = document.createElementNS('http://www.w3.org/2000/svg', 'line');
	svgline.setAttribute('x1', line.leftEndpoint.x);
	svgline.setAttribute('y1', line.leftEndpoint.y);
	svgline.setAttribute('x2', line.rightEndpoint.x);
	svgline.setAttribute('y2', line.rightEndpoint.y);
	if ( line.hasIntersection ) {
		var color = 'red', width = 2;
	} else {
		var color = 'blue', width = 10;
	}
	svgline.setAttribute('stroke', color);
	svgline.setAttribute('stroke-width', width);
	svg.appendChild(svgline);
});
var end = new Date().getTime();
var time = end - start;
console.log(time);
// var EventQueue = function(lineSegments) {
// 	this.events = [];
// 	lineSegments.forEach(function(lineSegment) {

// 	});
// 	this.addFromLineSegment(lineSegment) {

// 		get the "left" endpoint and set it appropriately
// 	}
// 	this.add(event) {

// 	}
// };

// var eq = new EventQueue(lineSegments);
//     Initialize output intersection list IL to be empty;

//     While (EQ is nonempty) {
//         Let E = the next event from EQ;
//         If (E is a left endpoint) {
//             Let segE = E's segment;
//             Add segE to SL;
//             Let segA = the segment Above segE in SL;
//             Let segB = the segment Below segE in SL;
//             If (I = Intersect( segE with segA) exists)
//                 Insert I into EQ;
//             If (I = Intersect( segE with segB) exists)
//                 Insert I into EQ;
//         }
//         Else If (E is a right endpoint) {
//             Let segE = E's segment;
//             Let segA = the segment Above segE in SL;
//             Let segB = the segment Below segE in SL;
//             Delete segE from SL;
//             If (I = Intersect( segA with segB) exists)
//                 If (I is not in EQ already)
//                     Insert I into EQ;
//         }
//         Else {  // E is an intersection event
//             Add E’s intersect point to the output list IL;
//             Let segE1 above segE2 be E's intersecting segments in SL;
//             Swap their positions so that segE2 is now above segE1;
//             Let segA = the segment above segE2 in SL;
//             Let segB = the segment below segE1 in SL;
//             If (I = Intersect(segE2 with segA) exists)
//                 If (I is not in EQ already)
//                     Insert I into EQ;
//             If (I = Intersect(segE1 with segB) exists)
//                 If (I is not in EQ already)
//                     Insert I into EQ;
//         }
//         remove E from EQ;
//     }
//     return IL;
// }

//     Initialize event queue EQ = all segment endpoints;
//     Sort EQ by increasing x and y;
//     Initialize sweep line SL to be empty;
//     return FALSE;      // No  Intersections
// }