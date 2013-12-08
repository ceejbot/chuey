var
	_ = require('lodash')
	;

exports.rgb2hsv = function(r, g, b)
{
	r = r/255;
	g = g/255;
	b = b/255;
	var min = _.min([r, g, b]),
		max = _.max([r, g, b]),
		delta = max - min;

	var value = max, saturation, hue;

	if (max === min)
		hue = 0;
	else if (max === r)
		hue = (60 * ((g-b) / (max-min))) % 360;
	else if (max === g)
		hue = 60 * ((b-r) / (max-min)) + 120;
	else if (max === b)
		hue = 60 * ((r-g) / (max-min)) + 240;

	if (hue < 0)
		hue += 360;

	if (max === 0)
		saturation = 0;
	else
		saturation = 1 - (min/max);

	return {
		hue:        Math.round(hue),
		saturation: Math.round(saturation),
		value:      Math.round(value)
	};
};
