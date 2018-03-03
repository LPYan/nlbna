var http = require("http");
var url = require("url");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {}
handle["/"] = requestHandlers.nextArrival;
handle["/nextArrival"] = requestHandlers.nextArrival;
handle["/nextArrivalImg"] = requestHandlers.nextArrivalImg;

var route = router.route;

function onRequest(request, response) {
  var pathname = url.parse(request.url).pathname;
  console.log("Request for " + pathname + " received.");

  route(handle, pathname, request, response);
}

http.createServer(onRequest).listen(8080);
console.log("Server has started.");
