import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { JWT_KEY } from "../config";
import data from "./dbController";

const salt = 10;

class UserController {
  static signin(req, res) {
    if (!req.body.email) {
      return res.status(400).json({
        status: 400,
        error: "email is required",
      });
    }
    if (!req.body.password) {
      return res.status(400).json({
        status: 400,
        error: "password is required",
      });
    }
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

  static signup(req, res) {
    if (!req.body.email) {
      return res.status(400).json({
        status: 400,
        error: "email is required",
      });
    }
    if (!req.body.password) {
      return res.status(400).json({
        status: 400,
        error: "password is required",
      });
    }
    if (!req.body.firstName) {
      return res.status(400).json({
        status: 400,
        error: "first name is required",
      });
    }
    if (!req.body.lastName) {
      return res.status(400).json({
        status: 400,
        error: "last name is required",
      });
    }
    if (!req.body.confirmPassword || (req.body.password !== req.body.confirmPassword)) {
      return res.status(401).json({
        status: 401,
        error: "passwords do not match",
      });
    }
    const User = data.findOneUser("email", req.body.email);
    if (User) {
      return res.status(400).json({
        status: 400,
        error: "email already exist",
      });
    }


    bcrypt.hash(req.body.password, salt, (err, hash) => {
      const allUser = data.getUsers().map(x => x.id).sort();
      const id = allUser[allUser.length - 1] + 1;

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
