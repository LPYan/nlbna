var url = require("url");
var prevTime = null;

function nextArrival(request, response) {
	console.log("Request handler 'nextArrival' was called.");

	//var stop_id = request.url.searchParams.get('stop_id');
	var query = url.parse(request.url,true).query;
	console.log("stop_id: " + query.stop_id);
	
	var currDate = new Date();
	if (prevTime == null) { currDate.getTime(); }
	var timeDiff = currDate.getTime() - prevTime;
	prevTime = currDate.getTime();
	
	var minsArray1 = [0, 1, 4, 5, 8, 9,12,13,16,17,20,21,24,25,28,29,32,33,36,37,40,41,44,45,48,49,52,53,56,57];
	var minsArray2 = [2,10,18,26,34,42,50,58];
	var minsArray3 = [3,11,19,27,35,43,51,59];
	var minsArray4 = [6,14,22,30,38,46,54];
	var minsArray5 = [7,15,23,31,39,47,55];
	
	var imgElement = '';
	if (minsArray1.indexOf(currDate.getMinutes()) > -1) {
		imgElement = '<img id="epaperImg" src="/nextArrivalImg?stop_id=' + query.stop_id + '" width="1200" height="1600">';
	} else if (minsArray2.indexOf(currDate.getMinutes()) > -1) {
		imgElement = '<img id="epaperImg" src="http://nechk.papercast.net/data/medialib/6.jpg" width="1200" height="1600">';
	} else if (minsArray3.indexOf(currDate.getMinutes()) > -1) {
		imgElement = '<img id="epaperImg" src="http://nechk.papercast.net/data/medialib/7.png" width="1200" height="1600">';
	} else if (minsArray4.indexOf(currDate.getMinutes()) > -1) {
		imgElement = '<img id="epaperImg" src="http://nechk.papercast.net/data/medialib/8.jpg" width="1200" height="1600">';
	} else if (minsArray5.indexOf(currDate.getMinutes()) > -1) {
		imgElement = '<img id="epaperImg" src="http://nechk.papercast.net/data/medialib/9.jpg" width="1200" height="1600">';
	} else {
		imgElement = '<img id="epaperImg" src="/nextArrivalImg?stop_id=' + query.stop_id + '" width="1200" height="1600">';
	}

	var body = 
		'<html>'+
		'<head>'+
		'<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />'+
		'</head>'+
		'<body style="margin: 0px; background-color:white; color:black">'+
		'<p>測試：' + currDate + ' (' + timeDiff + ')</p>'+
		imgElement+
		'</body>'+
		'</html>';
	
	response.writeHead(200, {"Content-Type": "text/html"});
	response.write(body);
	response.end();
}

function nextArrivalImg(request, response) {
	console.log("Request handler 'nextArrivalImg' was called.");
  
	//var fs = require('fs');
	//var htmlConvert = require('html-convert');
	//var convert = htmlConvert();
	var webshot = require('webshot');

	var query = url.parse(request.url,true).query;
	console.log("stop_id: " + query.stop_id);
	var hyperlink = "https://nlb.kcbh.com.hk:8443/nextArrival/?stop_id=" + query.stop_id;
	 
	//Convert a website url 
	response.setHeader('Content-Type', 'image/png');
	//convert(hyperlink, {width: 900, height: 1200}).pipe(response);
	//convert(hyperlink, {width: 900, height: 1200}).pipe(fs.createWriteStream('out.png'));

	var options = {
		screenSize: { width: 690, height: 920}, 
		shotSize: { width: 690, height: 920},
		renderDelay: 3000
	};
	webshot(hyperlink, options).pipe(response);
}

exports.nextArrival = nextArrival;
exports.nextArrivalImg = nextArrivalImg;