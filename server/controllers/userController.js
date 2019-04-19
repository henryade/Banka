import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { JWT_KEY } from "../config";
import data from "./dbController";

const salt = 10;

/**
 * User Controller Class
 */

class UserController {
 /**
 * @param {obj} req - request from body
 * @param {obj} res - response to request from body
 * @return {obj}    - returns response object
 */ 
  static signin(req, res) { 

    const User = data.findOneUser("email", req.body.email);
    if (!User) {
      return res.status(401).json({
        status: 401,
        error: "Auth failed",
      });
    }
    bcrypt.compare(req.body.password, User.password, (err, response) => {
      if (response) {
        const token = jwt.sign({
          email: User.email,
          id: User.id,
          firstName: User.firstName,
          lastName: User.lastName,
          type: User.type,
          isAdmin: User.isAdmin,
        }, JWT_KEY);
        return res.status(200).json({
          status: 200,
          data: {
            token,
            id: User.id,
            firstName: User.firstName,
            lastName: User.lastName,
            password: User.password,
            type: User.type,
            isAdmin: User.isAdmin,
          },
        });
      }
      return res.status(401).json({
        status: 401,
        error: "Auth failed",
      });
    });
  }

  /**
   * @param {obj} req - request from body
   * @param {obj} res - response to request from body
   * @return {obj}    - returns response object
   */

  static signup(req, res) {
    const User = data.findOneUser("email", req.body.email);
    if (User) {
      return res.status(400).json({
        status: 400,
        error: "email already exist",
      });
    }


    bcrypt.hash(req.body.password, salt, (err, hash) => {
      const id = Math.ceil(Math.random() * 6);

      const token = jwt.sign({
        email: req.body.email,
        id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        type: "client",
        isAdmin: false,
      }, JWT_KEY);
      data.createUser(token, id, req.body.firstName, req.body.lastName, req.body.email, hash, "client", false);
      const newUser = data.findOneUser("id", id);

      return res.status(201).json({
        status: 201,
        data: {
          token: newUser.token,
          id: newUser.id,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          email: newUser.email,
          type: newUser.type,
          isAdmin: newUser.isAdmin,
        },
      });
    });
  }
}

export default UserController;
