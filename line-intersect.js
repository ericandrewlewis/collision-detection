/**
 * Whether two line segments intersect. This uses the
 * vector cross product approach described below:
 * http://stackoverflow.com/a/565282/786339
 *
 * @param {Object} p point object with x and y coordinates
 *  representing the start of the 1st line.
 * @param {Object} p2 point object with x and y coordinates
 *  representing the end of the 1st line.
 * @param {Object} q point object with x and y coordinates
 *  representing the start of the 2nd line.
 * @param {Object} q2 point object with x and y coordinates
 *  representing the end of the 2nd line.
 */
function lineSegmentsIntersect(p, p2, q, q2) {
	/**
	 * An x,y coordinate representing the first line, setting its origin to 0.
	 *
	 * More or less a "vector".
	 * @type {Object} x,y coordinates
	 */
	var r = subtractPoints(p2, p);
	/**
	 * An x,y coordinate representing the second line, setting its origin to 0.
	 *
	 * More or less a "vector".
	 * @type {Object} x,y coordinates
	 */
	var s = subtractPoints(q2, q);

	/*
	 * Create a cross product between the line between the first two points in each line
	 * and the first line (in vector form).
	 *
	 * This tells us how the second line compares geometrically to the first line.
	 */
	var qminuspxr = crossProduct(subtractPoints(q, p), r);

	// Create the cross product of the two lines.
	// If the cross-product is 0, the lines are parallel.
	var rxs = crossProduct(r, s);

	// If there is no difference between the first two points on the lines,
	// and the lines are parallel, they are collinear.
	if (qminuspxr == 0 && rxs == 0) {
		// Are any of the points equal?
		if (equalPoints(p, q) || equalPoints(p, q2) || equalPoints(p2, q) || equalPoints(p2, q2)) {
			return true
		}
		// Do they overlap? (Are all the point differences in either direction the same sign)
		// Using != as exclusive or
		return ((q.x - p.x < 0) != (q.x - p2.x < 0) != (q2.x - p.x < 0) != (q2.x - p2.x < 0)) ||
			((q.y - p.y < 0) != (q.y - p2.y < 0) != (q2.y - p.y < 0) != (q2.y - p2.y < 0));
	}

	// If the lines are parallel, the segments don't intersect.
	if (rxs == 0) {
		return false;
	}


	var u = qminuspxr / rxs;
	var t = crossProduct(subtractPoints(q, p), s) / rxs;

	return (t >= 0) && (t <= 1) && (u >= 0) && (u <= 1);
}

/**
 * Calculate the cross product of the two points.
 *
 * @param {Object} point1 point object with x and y coordinates
 * @param {Object} point2 point object with x and y coordinates
 *
 * @return the cross product result as a float
 */
function crossProduct(point1, point2) {
	return point1.x * point2.y - point1.y * point2.x;
}

/**
 * Subtract the second point from the first.
 *
 * @param {Object} point1 point object with x and y coordinates
 * @param {Object} point2 point object with x and y coordinates
 *
 * @return the subtraction result as a point object
 */
function subtractPoints(point1, point2) {
	var result = {};
	result.x = point1.x - point2.x;
	result.y = point1.y - point2.y;

	return result;
}

/**
 * See if the points are equal.
 *
 * @param {Object} point1 point object with x and y coordinates
 * @param {Object} point2 point object with x and y coordinates
 *
 * @return if the points are equal
 */
function equalPoints(point1, point2) {
	return (point1.x == point2.x) && (point1.y == point2.y)
}