
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

export async function userList(page) {
  try {
    const response = await userRepository.userList(page);
    return response;
  } catch (error) {
    console.error('Error logging in user:', error);
    throw error;
  }
}


export async function getUserById(id) {
  try {
    const response = await userRepository.getUserById(id);
    return response;
  } catch (error) {
    console.error('Error logging in user:', error);
    throw error;
  }
}

export async function updateUser(id, data) {
  try {
    const response = await userRepository.updateUser(id, data);
    return response;
  } catch (error) {
    console.error('Error logging in user:', error);
    throw error;
  }
}



export async function getChildUsers(id) {
  try {
    const response = await userRepository.getChildUsers(id);
    return response;
  } catch (error) {
    console.error('Error logging in user:', error);
    throw error;
  }
}


export async function getUsersCountByGrant() {
  try {
    const response = await userRepository.getUsersCountByGrant();
    return response;
  } catch (error) {
    console.error('Error logging in user:', error);
    throw error;
  }
}







