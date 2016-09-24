module.exports = function(horseman, config){
	var config = config || {
		protocol: "http",
		url: "www.google.com"
	};

	return horseman
	.log("Opening url: " + config.url)
	.open(config.protocol + "://" + config.url);

}