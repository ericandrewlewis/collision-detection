/**
 * Create a line segment.
 *
 * @param  {[type]} point1 [description]
 * @param  {[type]} point2 [description]
 * @return {[type]}        [description]
 */
lineSegment = function(point1, point2) {
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
	return this;
};

var lineSegments = [];
for ( i = 0; i <=100; i++ ) {
	lineSegments.push( new lineSegment(
		{ x: Math.ceil( 100* Math.random() ), y: Math.ceil( 100* Math.random() ) },
		{ x: Math.ceil( 100* Math.random() ), y: Math.ceil( 100* Math.random() ) }
	) );
}
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

lineSegments.forEach(function(lineSegment) {
	eq.push({
		x: lineSegment.leftEndpoint.x,
		y: lineSegment.leftEndpoint.y
	});
	eq.push({
		x: lineSegment.rightEndpoint.x,
		y: lineSegment.rightEndpoint.y
	});
});
eq.sort();

var sweepLine = {};
while ( eq.length ) {
	var event = eq[0];

	eq.shift();
}
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

//     Initialize event queue EQ = all segment endpoints;
//     Sort EQ by increasing x and y;
//     Initialize sweep line SL to be empty;
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