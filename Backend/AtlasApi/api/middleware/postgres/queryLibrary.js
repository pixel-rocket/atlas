
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
            CONSTRAINT sender FOREIGN KEY (userId) REFERENCES users(userID) on delete cascade on update cascade,
            CONSTRAINT reciever FOREIGN KEY (friendId) REFERENCES users(userID) on delete cascade on update cascade    
        );`

 getUserWithLocation = (id) => {
     return `
        SELECT  *
        FROM users
        INNER JOIN locations on users.userId = locations.userId
        WHERE users.userId = '${id}';
        `
 }
getUser = (id) => {
    return `
        SELECT  *
        FROM users
        WHERE users.userId = '${id}';
        `
}

getPotentialFriend = (friendCode) => {
    return `
        SELECT  *
        FROM users
        WHERE currentFriendCode = '${friendCode}';
        `
}

getFriends = (id) => {
    return `
     SELECT  *
        FROM users
        INNER JOIN locations on users.userId = locations.userId
        INNER JOIN friends on users.userId = friends.userId
		WHERE friendid = ${id}; 
    ` //user id
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
        INSERT INTO locations (userId, country, lat,lng,timezone)
        VALUES ('${id}','${req.body.location.country}','${req.body.location.lat}', '${req.body.location.lng}', '${req.body.location.timezone}')
        ON CONFLICT DO NOTHING;`
 }

getUser = (id) => {
    return `
        SELECT  *
        FROM users
        WHERE users.userId = ${id};
        `
}

createFriend = (id, friendId) => {
    return `
        INSERT INTO friends (userId, friendId)
        VALUES ('${id}','${friendId}')
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
            country='${req.body.location.country}',
            lat='${req.body.location.lat}', 
            lng='${req.body.location.lng}', 
            timezone='${req.body.location.timezone}'
        WHERE userID = '${id}';`
}

updateFriendCode = (id, friendCode) => {
    return `
        UPDATE users
        SET currentFriendCode='${friendCode}'
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
     getUserWithLocation:getUserWithLocation,
     getPotentialFriend:getPotentialFriend,
     getFriends:getFriends,
     createUser:createUser,
     createLocation:createLocation,
     createFriend: createFriend,
     updateUser:updateUser,
     updateLocation:updateLocation,
     deleteUser:deleteUser,
     deleteLocation:deleteLocation,
     updateFriendCode:updateFriendCode,

     userTable,
     locationTable,
     friendTable,
 }