module.exports = function(horseman){

	return horseman.log("Start steps...")
	.log("Typing github")
	.type('input[name="q"]', 'github')
	.log("Clicking button")
	.click('[name="btnK"]')
	.log("Waiting for selector div.g")
	.waitForSelector('div.g')
	.log("Counting elements with selector div.g")
	.count('div.g')
	.log("Number of results:")
	.log()
};