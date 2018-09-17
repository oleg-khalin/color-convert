let hexInput = document.querySelector(".hex"),
		body = document.querySelector("body"),
		rgbInput = document.querySelector(".rgb");

const HEX2RGBarray = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];

body.style.background = hexInput.value;

const brightness = (r, g, b) => (r * 299 + g * 587 + b * 114) / 1000;

const convertHEX2RGB = (color) => {

	let RGB = [], error = 0;

	if(color.slice(0, 1) !== '#')
		error++;

	for(let i = 0, j = 0; i < 7, j < 3; i+=2, j++)
		RGB[j] = HEX2RGBarray.indexOf(typeof color.slice(i+1, i+2) === 'string' ? color.slice(i+1, i+2).toUpperCase() : color.slice(i+1, i+2))*16 + HEX2RGBarray.indexOf(typeof color.slice(i+2, i+3) === 'string' ? color.slice(i+2, i+3).toUpperCase() : color.slice(i+2, i+3));

	for(let k=1;k<7;k++)
		if(HEX2RGBarray.indexOf(typeof color[k] === 'string' ? color[k].toUpperCase() : color[k]) === -1)
			error++;

	error === 0 ? rgbInput.value = `rgb(${RGB[0]}, ${RGB[1]}, ${RGB[2]})` : rgbInput.value = `rgb`;

	body.style.background = `rgb(${RGB[0]}, ${RGB[1]}, ${RGB[2]})`;

	// document.querySelectorAll('input').style.color = '#000';
	if(brightness(RGB[0], RGB[1], RGB[2]) < 123) {
		hexInput.style.color = '#fff';
		hexInput.style.borderColor = '#fff';
		rgbInput.style.color = '#fff';
		rgbInput.style.borderColor = '#fff';
	}
	else {
		hexInput.style.color = '#000';
		hexInput.style.borderColor = '#000';
		rgbInput.style.color = '#000';
		rgbInput.style.borderColor = '#000';
	}
}


const convertRGB2HEX = (color) => {
	let HEX = '#',
			error = 0,
			helpArray = [];

	const re = /\s*,\s*/;

	if(color.slice(0, 4) !== 'rgb(')
		error++;


	color.substr(-1) === ')' ? helpArray = color.substring(color.lastIndexOf("(") + 1, color.lastIndexOf(")")).split(re) : helpArray = color.substring(color.lastIndexOf("(") + 1).split(re)

	
	for(let i = 0; i < helpArray.length; i++) {
		HEX += HEX2RGBarray[Math.floor(parseInt(helpArray[i])/16)] + HEX2RGBarray[parseInt(helpArray[i])%16];
		if(Number.isInteger(parseInt(helpArray[i])) === false || helpArray[i] > 255 || helpArray[i] < 0)
			error++;
	}


	error === 0 ? hexInput.value = HEX : hexInput.value = '#';
	body.style.background = HEX;
}

const convert = (color) => {
	if(color.slice(0, 3) === 'rgb') {
		// if(color !== rgbInput.value)

		convertRGB2HEX(color);
	}
	else if (color.slice(0, 1) === '#') {
		convertHEX2RGB(color);
	}
}




hexInput.addEventListener("input", function(){convert(hexInput.value)});
rgbInput.addEventListener("input", function(){convert(rgbInput.value)});