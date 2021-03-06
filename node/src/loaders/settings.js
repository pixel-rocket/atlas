const expressSettings = require('./express')
const databaseInit = require('./postgres')

module.exports = async function initSettings(app,config) {
    Object.keys(config).forEach(key => {
        console.log(key, config[key])
    })
    console.log("Loading express settings");
    await expressSettings(app,config);
    console.log("Loaded express settings");

    console.log("Loading postgres database");
    await databaseInit.createDatabase(app,config)
    console.log("Database created");



}