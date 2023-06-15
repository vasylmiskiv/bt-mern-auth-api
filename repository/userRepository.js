import User from "../models/userModel.js";

class UserRepository {
  findUserByEmail = async (email) => {
    return await User.findOne({ email });
  };

  createUser = async (name, email, password) => {
    return await User.create({
      name,
      email,
      password,
    });
  };

  findUserById = async (userId) => {
    return await User.findById(userId).select("-password");
  };

  updateUser = async (user, updates) => {
    user.name = updates.name || user.name;
    user.email = updates.email || user.email;

    if (updates.password) {
      user.password = updates.password;
    }

    return await user.save();
  };
}

export default UserRepository;
