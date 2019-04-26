import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { JWT_KEY } from "../config";
import data from "./dbController";
import { generateRandomPassword } from "../utils/auth";

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
    bcrypt.compare(req.body.password, req.body.User.password, (err, response) => {
      if (response) {
        const token = jwt.sign(req.body, JWT_KEY);
        const { password, ...user } = req.body;
        const User = { token, ...user };
        return res.status(200).json({
          status: 200,
          data: User,
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
    bcrypt.hash(req.body.password, salt, async (err, hash) => {
      let newUser = {};
      try {
        newUser = await data.createUser(req.body.firstName, req.body.lastName, req.body.email, hash, "client", false);
        return res.status(201).json({
          status: 201,
          data: newUser,
        });
      } catch (error) {
        return res.status(400).json({
          status: 400,
          error,
        });
      }
    });
  }

  static createUser(req, res) {
    const plainPassword = generateRandomPassword();
    const isAdmin = req.body.userType === "admin";

    bcrypt.hash(plainPassword, salt, async (err, hash) => {
      const newStaff = await data.createUser(req.body.firstName, req.body.lastName, req.body.email, hash, "staff", isAdmin);
      return res.status(201).json({
        status: 201,
        plainPassword,
        data: newStaff,
      });
    });
  }

  static async getAccounts(req, res) {
    return res.status(200).json({
      status: 200,
      data: await data.findAccountByEmail(req.params.email),
    });
  }
}

export default UserController;
