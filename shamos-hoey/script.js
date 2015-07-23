
//     Initialize event queue EQ = all segment endpoints;
//     Sort EQ by increasing x and y;
//     Initialize sweep line SL to be empty;
//     return FALSE;      // No  Intersections
// }
function generateLineSegmentEndpoints() {
	var endpoints = [];
	for ( i=0; i<=500; i++ ) {
		endpoints[i] = {
			x1: Math.floor( Math.random() * 300 ),
			y1: Math.floor( Math.random() * 300 ),
			x2: Math.floor( Math.random() * 300 ),
			y2: Math.floor( Math.random() * 300 )
		};
	}
	return endpoints;
}

var lines = generateLineSegmentEndpoints();
var lineEndpoints = [];
lines.forEach(function(line, id ) {
	lineEndpoints.push({
		x: line.x1,
		y: line.y1,
		id: id
	});
	lineEndpoints.push({
		x: line.x2,
		y: line.y2,
		id: id
	});
});
// Sort the lines in ascending x and y directions.
lineEndpoints.sort(function(a,b) {
	if ( a.x < b.x ) {
		return -1;
	}
	if ( b.x < a.x ) {
		return 1;
	}
	if ( a.y < b.y ) {
		return -1;
	}
	if ( b.y < a.y ) {
		return 1;
	}
	return 0;
});

var inSweepLine = [];
lineEndpoints.forEach(function(endpoint) {
	if ( inSweepLine[endpoint.id] ) {
		delete inSweepLine[endpoint.id];
		return;
	} else {
		inSweepLine[endpoint.id] = true;
	}
	// For any line that's currently in the sweep line,
	// check if the current line intersects it.
	inSweepLine.forEach(function(val, id) {
		if ( id === endpoint.id ) {
			return;
		}
		// this is awkward.
		// if ( lineSegmentsIntersect( {x: endpoint.x, y: endpoint.y}, {x: lineEndpoints[endpoint.id].x, y: lineEndpoints[endpoint.id].y},
			// {x: lineEndpoints[id].x, y: lineEndpoints[id].y}, {x: lineEndpoints[id].x, y: lineEndpoints[id].y} ) ) {
			// lines[id].hasIntersect = true;
			// lines[endpoint.id].hasIntersect = true;
		// }
	});
	// check if an intersection between two points exist.
});
lines.forEach(function(line) {
	var svgline = document.createElementNS('http://www.w3.org/2000/svg', 'line');
	svgline.setAttribute('x1', line.x1);
	svgline.setAttribute('y1', line.y1);
	svgline.setAttribute('x2', line.x2);
	svgline.setAttribute('y2', line.y2);
	if ( line.hasIntersect ) {
		var color = 'red', width = 5;
	} else {
		var color = 'blue', width = 10;
	}
	svgline.setAttribute('stroke', color);
	svgline.setAttribute('stroke-width', width);
	svg.appendChild(svgline);
});
// While (EQ is nonempty) {
//     Let E = the next event from EQ;
//     If (E is a left endpoint) {
//         Let segE = E's segment;
//         Add segE to SL;
//         Let segA = the segment Above segE in SL;
//         Let segB = the segment Below segE in SL;
//         If (I = Intersect( segE with segA) exists)
//             return TRUE;   // an Intersect Exists
//         If (I = Intersect( segE with segB) exists)
//             return TRUE;   // an Intersect Exists
//     }
//     Else {  // E is a right endpoint
//         Let segE = E's segment;
//         Let segA = the segment above segE in SL;
//         Let segB = the segment below segE in SL;
//         Delete segE from SL;
//         If (I = Intersect( segA with segB) exists)
//             return TRUE;   // an Intersect Exists
//     }
//     remove E from EQ;
// }