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
  static signin(req, res) {
    const { User } = req.body;
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
    bcrypt.hash(req.body.password, salt, (err, hash) => {
      const id = generateId("client");

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

      const { password, ...newStaff } = data.findStaff("id", id);

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
