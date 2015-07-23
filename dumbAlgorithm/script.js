/**
 * @author Peter Kelley
 * @author pgkelley4@gmail.com
 */
/**
 * Create a bunch of lines.
 * @return {[type]} [description]
 */
function generateLines() {
	var lines = [];
	for ( i = 0; i <=1000; i++ ) {
		lines.push({
			x1: Math.ceil(700* Math.random()) + 50,
			y1: Math.ceil(700* Math.random()) + 50,
			x2: Math.ceil(700* Math.random()) + 50,
			y2: Math.ceil(700* Math.random()) + 50
		});
	}
	return lines;
}

function dumbAlgorithm() {
	var svg = document.querySelector('svg');
	var start = new Date().getTime();
	var lines = generateLines();
	lines.forEach(function(line) {
		var svgline = document.createElementNS('http://www.w3.org/2000/svg', 'line');
		line.hasIntersect = false;
		lines.forEach(function(lineB) {
			if ( line.hasIntersect ) {
				return;
			}
			if ( line === lineB ) {
				return;
			}
			if ( lineSegmentsIntersect( {x: line.x1, y: line.y1}, {x: line.x2, y: line.y2},
				{x: lineB.x1, y: lineB.y1}, {x: lineB.x2, y: lineB.y2} ) ) {
				line.hasIntersect = true;
			}
		});
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
	var end = new Date().getTime();
	var time = end - start;
	console.log('Execution time: ' + time);
}