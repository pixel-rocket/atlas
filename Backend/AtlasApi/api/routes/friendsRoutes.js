const isAuth = require("../middleware/isAuth");
const userId = require("../middleware/getUserStub");
const friendPG = require("../middleware/postgres/friendPG")
const getConnection = require('../../loaders/connection')
const config = require('../../config/config')

module.exports = (app) => {

    app.get('/friends', isAuth, (req, res) => {

        const pool = getConnection();

        let id = userId(req);
        console.log('GET FRIEND |', id);

        let user = friendPG.getFriends(pool, id, function(data){
            return res.send(data);
        });
        
    });

    app.post('/friends', isAuth, (req, res) => {
        const pool = getConnection();

        let id = userId(req);
        console.log('POST | FRIEND |', id)
        let getFriendId = friendPG.getFriend(pool, req, function (data) {
            console.log("Post friend data:",data.data)
            if(!data.data){
                return res.send({
                    status: 400,
                    msg:"No friend associated with this code"
                })
            }
            friendPG.createFriend(pool, data.userid, id, function (response) {
                //TODO probably need a notification of some kind here
                console.log(`Friend added`);
                /*   return res.send(response);*/
            });
            friendPG.createFriend(pool, id, data.userid, function (response) {
                console.log(`Friend added`);
                //TODO return the friend user objects;
                return res.send(response);
            });
        });
    })

    app.put('/friends', isAuth, (req, res) => {

        const pool = getConnection();

        let id = userId(req);
        console.log('PUT |', id)

        let user = friendPG.updateFriend(pool, id, req);
        return res.send(req.body).status(200);
    })

    app.delete('/friends', isAuth, (req, res) => {

        const pool = getConnection();

        let id = userId(req);
        console.log('DELETE |', id, '||', req.body.friendId)

        let user = friendPG.deleteFriend(pool,id, req, function(response){
            return res.send(response);
        });
    })
};

