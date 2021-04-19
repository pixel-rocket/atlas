const userTable = `
CREATE TABLE IF NOT EXISTS users(
            userId varchar PRIMARY KEY,
            nickname varchar,
            picture varchar,
            showLocation boolean,
            currentFriendCode varchar
        );`


const locationTable = `
        CREATE TABLE IF NOT EXISTS locations(
            userId varchar,
            city varchar,
            country varchar,
            lat varchar,
            lng varchar,
            timezone varchar, 
            FOREIGN KEY (userId) REFERENCES users(userId) on delete cascade on update cascade
        );`
 const friendTable = `
        CREATE TABLE IF NOT EXISTS friends(
            id serial primary key,
            userId varchar,
            friendId varchar,
            FOREIGN KEY (userId) REFERENCES users(userID) on delete cascade on update cascade,
            FOREIGN KEY (friendId) REFERENCES users(userID) on delete cascade on update cascade    
        );`
 getUser = (id) => {
     return `
        SELECT *
        FROM users
        WHERE userId = '${id}'`
 }

 createUser = (id, req) => {
    return `
        INSERT INTO users (userId, nickname, picture, showLocation)
        VALUES ('${id}','${req.body.nickname}','${req.body.picture}',${req.body.showLocation})
        ON CONFLICT DO NOTHING;
    `
 }
 createLocation = (id, req) => {
     return `
        INSERT INTO locations (userId, city, country, lat,lng,timezone)
        VALUES ('${id}','${req.body.location.city}','${req.body.location.country}','${req.body.location.lat}', '${req.body.location.lng}', '${req.body.location.timezone}')
        ON CONFLICT DO NOTHING;`
 }
 updateUser = (id, req) => {
    return `
        UPDATE users
        SET userID='${id}',
            nickname='${req.body.nickname}',
            picture='${req.body.picture}',
            showLocation=${req.body.showLocation}
        WHERE userID = '${id}';`
}
 updateLocation = (id, req) => {
    return `
        UPDATE locations
        SET userID='${id}',
            city='${req.body.location.city}',
            country='${req.body.location.country}',
            lat='${req.body.location.lat}', 
            lng='${req.body.location.lng}', 
            timezone='${req.body.location.timezone}'
        WHERE userID = '${id}';`
}
deleteUser = (id) => {
    return `
        DELETE FROM users
        WHERE userID = '${id}';`
}
deleteLocation = (id) => {
    return `
        DELETE FROM locations
        WHERE userID = '${id}';`
}
 module.exports = {
     getUser:getUser,
     createUser:createUser,
     createLocation:createLocation,
     updateUser:updateUser,
     updateLocation:updateLocation,
     deleteUser:deleteUser,
     deleteLocation:deleteLocation,
     userTable,
     locationTable,
     friendTable,
 }