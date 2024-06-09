const setup = async () => {
	global._databaseInstance = await databaseProcess.stop();
};
module.exports = setup;
