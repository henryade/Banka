import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import data from "./dbController";
import { generateRandomPassword } from "../utils/auth";
import mail from "../utils/email";

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
        }, process.env.JWT_KEY, { expiresIn: "10h" });
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
      let newUser = {};
      try {
        newUser = await data.createUser(req.body.firstName.replace(/\s/g, ""), req.body.lastName.replace(/\s/g, ""), req.body.email, hash, type, isAdmin);
        const { password, ...user } = newUser;
        const token = jwt.sign(user, process.env.JWT_KEY, { expiresIn: "10h" });
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
        newStaff = await data.createUser(req.body.firstName.replace(/\s/g, ""), req.body.lastName.replace(/\s/g, ""), req.body.email, hash, "staff", isAdmin);
      } catch (error) {
        return res.status(400).json({
          status: 400,
          error,
        });
      }
      const name = `${req.body.lastName} ${req.body.firstName}`;
      const message = mail.staffSignUp(name, req.body.email, plainPassword);
      mail.sendMail(message);
      const { password, ...staff } = newStaff;
      return res.status(201).json({
        status: 201,
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

  static async getUser(req, res) {
    return res.status(200).json({
      status: 200,
      data: await data.findOneUser(req.params.email),
    });
  }

  static async reset(req, res) {
    if (parseInt(req.body.id, 10) !== req.User.id) {
      return res.status(400).json({
        status: 400,
        error: "Bad URL. Reload link from email if not expired",
      });
    }
    bcrypt.compare(req.body.password, req.User.password, (err, response) => {
      if (response) {
        return res.status(400).json({
          status: 400,
          error: "New password must be different from the old password",
        });
      }
      bcrypt.hash(req.body.password, salt, async (error, hash) => {
        if (error) {
          return res.status(400).json({
            status: 400,
            error: "Error Occured",
          });
        }
        data.findUserByEmailAndUpdate(hash, req.body.email);
        return res.status(200).json({
          status: 200,
          message: "Password Change Successful",
        });
      });
      return null;
    });
    return null;
  }

  static async forgotPassword(req, res) {
    const token = jwt.sign({
      id: req.User.id,
      email: req.body.email,
    }, process.env.JWT_KEY, { expiresIn: 60 * 60 });

    const name = `${req.User.lastName} ${req.User.firstName}`;
    const message = mail.resetPassword(token, name, req.body.email);
    const result = await mail.sendMail(message);
    if (result === "Success" || result === undefined) {
      return res.status(200).json({
        status: 200,
        message: "Email Sent",
      });
    }
    return res.status(400).json({
      status: 400,
      error: result,
    });
  }

  static async passwordReset(req, res) {
    jwt.verify(req.params.token, process.env.JWT_KEY, async (err, decoded) => {
      if (err) {
        res.send("link expired");
        return null;
      }
      res.redirect(`https://henryade.github.io/Banka/forgot.html?email=${decoded.email}&id=${decoded.id}`);
    });
  }
}

export default UserController;
