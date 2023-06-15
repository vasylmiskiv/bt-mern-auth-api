import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";

class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await this.userService.findUserByEmail(email);

    if (user && (await user.matchPassword(password))) {
      generateToken(res, user._id);

      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    } else {
      res.status(401);
      throw new Error("Invalid email or password");
    }
  });

  registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await this.userService.findUserByEmail(email);

    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    const user = await this.userService.createUser(name, email, password);

    if (user) {
      generateToken(res, user._id);

      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  });

  logoutUser = asyncHandler(async (req, res) => {
    res.cookie("jwt", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    res.status(200).json({ message: "User logged out" });
  });

  getUserProfile = asyncHandler(async (req, res) => {
    const user = await this.userService.findUserById(req.user._id);

    if (user) {
      res.status(200).json({
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  });

  updateUserProfile = asyncHandler(async (req, res) => {
    const user = await this.userService.findUserById(req.user._id);

    if (user) {
      const updatedUser = await this.userService.updateUser(user, req.body);

      res.status(200).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  });
}

export default UserController;
