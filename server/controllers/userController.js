import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { JWT_KEY } from "../config";
import data from "../models/migrations";

const salt = bcrypt.genSaltSync(10);

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
    const User = data.getUsers().find(m => m.email === req.body.email);
    if (!User) {
      return res.status(401).json({
        status: 401,
        error: "Auth failed",
      });
    }
    bcrypt.compare(req.body.password, User.password, (err, response) => {
      if (err) {
        return res.status(401).json({
          status: 401,
          error: "Auth failed",
        });
      }
      if (response) {
        const token = jwt.sign({
          email: User.email,
          id: User.id,
          firstName: User.firstName,
          lastName: User.lastName,
          type: User.type,
          isAdmin: User.isAdmin,
        }, JWT_KEY,
        {
          expiresIn: "1h",
        });
        return res.status(200).json({
          status: 200,
          data: {
            token,
            id: User.id,
            firstName: User.firstName,
            lastName: User.lastName,
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
}

export default UserController;
