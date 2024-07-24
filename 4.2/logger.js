const fs = require('fs');

const logger = {
	log: msg => fs.appendFileSync('log.txt', `${msg}\n`),
};

module.exports = logger;
