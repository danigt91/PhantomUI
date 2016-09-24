var Phantom = require("phantom");
var Horseman = require('node-horseman');

(function(process, require, Phantom, Horseman, config){

	var horseman = new Horseman();

	// pipelines availables
	var enviromentFunc = function(){};
	var configFunc = function(){};
	var stepsFunc = function(){};

	/* Getting config */
	if(!config){

		// default configs values
		var protocol = "http";
		var url = "localhost:80";
		var jsConfig = "config.js", jsEnvironment = "environment.js", jsSteps = "steps.js";
		var pathType = "./";		

		if(process.argv.length < 5){

			// config from prompt

			var prompt = require('prompt');
	  		prompt.start();

			prompt.get(['jsConfig', 'jsEnvironment', 'jsSteps'], function (err, result) {
				if (err) { return onErr(err); }
				console.log('Command-line input received:');
				console.log('  JS Config File: ' + result.jsConfig);
				console.log('  JS Environment File: ' + result.jsEnvironment);
				console.log('  JS Steps File: ' + result.jsSteps);

				config = {

					protocol: protocol,
					url: url,
					jsEnvironment: result.jsEnvironment,
					jsConfig: result.jsConfig,
					jsSteps: result.jsSteps,
					pathType: pathType

				};

				start(config);
			});

		}else{

			// config from args input

			var iArgs = 2;
			if(process.argv.length > iArgs){
				jsConfig = process.argv[iArgs];
			}
			iArgs++;
			if(process.argv.length > iArgs){
				jsEnvironment = process.argv[iArgs];
			}
			iArgs++;
			if(process.argv.length > iArgs){
				jsSteps = process.argv[iArgs];
			}
			iArgs++;
			if(process.argv.length > iArgs){
				pathType = process.argv[iArgs];
			}

			config = {

				protocol: protocol,
				url: url,
				jsEnvironment: jsEnvironment,
				jsConfig: jsConfig,
				jsSteps: jsSteps,
				pathType: pathType

			};

			start(config);

		}

	}else{
		// config from external source
		start(config);
	}

	function start(config){

		// Gettings Pipeline items
		configFunc = require(config.pathType + config.jsConfig);
		enviromentFunc = require(config.pathType + config.jsEnvironment);
		stepsFunc = require(config.pathType + config.jsSteps);

		// Start Pipeline
		horseman
		.log("Starting...")
		.do(function(done){
			// Configuration (Browser, Display, ...)
			configFunc(horseman).then(done);
		})
		.do(function(done){
			// Environment (Url, Protocol, ...)
			enviromentFunc(horseman).then(done);
		})
		.do(function(done){
			// Steps
			stepsFunc(horseman).then(done);
		})
		.close(); // Closing Pipeline...

	}

})(process, require, Phantom, Horseman);