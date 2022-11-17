const router = require("express").Router();
let Login = require("../model/Login");

//check the availabilty of user in the data base
router.route("/get/:un/:pass").get(async (req, res) => {

    let UN = req.params.un;//username taken from the frontend login form
    let pass = req.params.pass;//password taken from the frontend login form

    const user = await Login.findOne({ username: UN, password: pass })
        .then((user) => {
            res.status(200).send({ status: "User fetched", login: user })
        }).catch(() => {
            
            res.status(500).send({ status: "Error with get user", error: err.message });
        })
})


module.exports = router;