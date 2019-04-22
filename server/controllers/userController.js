import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { JWT_KEY } from "../config";
import data from "./dbController";
import { generateRandomPassword, generateId } from "../utils/auth";

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
  static async signin(req, res) {
    const { User } = await req.body;
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
        let { password, ...user } = User;
        user = { token, ...user };
        return res.status(200).json({
          status: 200,
          data: user,
        });
      }
      // return res.status(401).json({
      //   status: 401,
      //   error: "Auth failed",
      // });
    });
  }

  /**
   * @param {obj} req - request from body
   * @param {obj} res - response to request from body
   * @return {obj}    - returns response object
   */

  static signup(req, res) {
    bcrypt.hash(req.body.password, salt, async (err, hash) => {
      const token = jwt.sign({
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        type: "client",
        isAdmin: false,
      }, JWT_KEY);

      let newUser = {};
      try {
        newUser = await data.createUser(req.body.firstName, req.body.lastName, req.body.email, hash, "client", false);
        return res.status(201).json({
          status: 201,
          data: newUser,
        });
      } catch (error) {
        // const error = errorr;
        return res.status(400).json({
          status: 400,
          error,
        });
      }
    });
  }
  //     return res.status(201).json({
  //       status: 201,
  //       data: newUser,
  //     });
  //   });
  // }

  static createUser(req, res) {
    const plainPassword = generateRandomPassword();
    const id = req.body.userType === "admin" ? generateId() : generateId("staff");
    const isAdmin = req.body.userType === "admin";

    bcrypt.hash(plainPassword, salt, (err, hash) => {
      const token = jwt.sign({
        email: req.body.email,
        id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        type: "staff",
        isAdmin,
      }, JWT_KEY);
      data.createUser(token, id, req.body.firstName, req.body.lastName, req.body.email, hash, "staff", isAdmin);

      const newStaff = data.findStaff("id", id);

      return res.status(201).json({
        status: 201,
        plainPassword,
        data: newStaff,
      });
    });
  }

  static getAccounts(req, res) {
    return res.status(200).json({
      status: 200,
      data: data.findAccountByEmail(req.params.email),
    });
  }
}

export default UserController;
