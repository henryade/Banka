import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import data from "./dbController";
import { generateRandomPassword } from "../utils/auth";

dotenv.config();

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
        const token = jwt.sign({
          id: req.body.User.id,
          firstName: req.body.User.firstName,
          lastName: req.body.User.lastName,
          email: req.body.User.email,
          type: req.body.User.type,
          isAdmin: req.body.User.isAdmin,
        }, process.env.JWT_KEY);
        const { password, ...user } = req.body.User;
        return res.status(200).json({
          status: 200,
          data: { token, ...user },
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
      const isAdmin = false;
      const type = "client";
      const token = jwt.sign({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        type,
        isAdmin,
      }, process.env.JWT_KEY);
      let newUser = {};
      try {
        newUser = await data.createUser(req.body.firstName.replace(/\s/g, ""), req.body.lastName.replace(/\s/g, ""), req.body.email, hash, type, isAdmin);
        const { password, ...user } = newUser;
        return res.status(201).json({
          status: 201,
          data: { token, ...user },
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
      let newStaff = {};
      try {
        newStaff = await data.createUser(req.body.firstName, req.body.lastName, req.body.email, hash, "staff", isAdmin);
      } catch (error) {
        return res.status(400).json({
          status: 400,
          error,
        });
      }

      const { password, ...staff } = newStaff;
      return res.status(201).json({
        status: 201,
        plainPassword,
        data: staff,
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
