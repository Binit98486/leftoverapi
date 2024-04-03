const UserModel = require("../models/user.model")
const AuthService = require("../services/auth.service")
const bcrypt = require("bcrypt")


class AuthController {
  constructor() {
    this.auth_svc = new AuthService()
  }
  login = async (req, res, next) => {
    console.log("hello");

    try {
      let data = req.body
      let result = this.auth_svc.loginValidate(data)
      let user = await UserModel.findOne({
        email: data.email
      })
      if (user) {
        console.log(user);
        if (bcrypt.compareSync(data.password, user.password)) {
          let access_token = this.auth_svc.generateAccessToken({
            id: user._id,
            name: user.name,
            role: user.role
          })

          res.json({
            result: {
              user: user,
              access_token: access_token,
            },
            msg: "Login Successful",
            status: true
          })
        } else {
          throw "Credentail doesn't match"
        }

      } else {
        throw "Email is not valid"
      }


    } catch (err) {
      console.log("Login Exception", err);
      next({
        status: 400,
        msg: err
      })

    }
  }

  register = async (req, res, next) => {
    try {
      let data = req.body;

      let validation = this.auth_svc.registerValidate(data);
      if (validation) {
        return res.status(400).json({ msg: validation, status: false });
      } else {

        let hash = bcrypt.hashSync(data.password, 10)
        data.password = hash
        let user = new UserModel(data)
        user.save()
          .then((ack) => {
            res.json({
              result: user,
              msg: "User Registered Sucessfully",
              status: true

            })
          })
          .catch((error) => {
            next({
              msg: error,
              status: 500
            })
          })
      }
    } catch (error) {
      return next({ status: 400, msg: error.message || 'Bad Request' });
    }
  };

}


module.exports = AuthController