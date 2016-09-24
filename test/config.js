module.exports = function(horseman, config){
	config = config || {
		userAgent: 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:27.0) Gecko/20100101 Firefox/27.0'
	};

	return horseman
	.log("Setting User Agent: " + config.userAgent)
	.userAgent(config.userAgent);

}