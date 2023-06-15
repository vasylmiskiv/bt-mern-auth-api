class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  findUserByEmail = async (email) => {
    return await this.userRepository.findUserByEmail(email);
  };

  createUser = async (name, email, password) => {
    return await this.userRepository.createUser(name, email, password);
  };

  findUserById = async (userId) => {
    return await this.userRepository.findUserById(userId);
  };

  updateUser = async (user, updates) => {
    return await this.userRepository.updateUser(user, updates);
  };
}

export default UserService;
