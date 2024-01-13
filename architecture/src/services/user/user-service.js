
import userRepository from '../../repositories/user/user-repository.js';

export async function createUser(user) {
  try {
    const response = await userRepository.createUser(user);
    return response;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

export async function loginUser(user) {
  try {
    const response = await userRepository.loginUser(user);
    return response;
  } catch (error) {
    console.error('Error logging in user:', error);
    throw error;
  }
}

