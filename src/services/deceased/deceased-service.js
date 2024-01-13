
import deceasedRepository from "../../repositories/deceased/deceased-repository.js";

export async function createDeceased(data) {
  try {
    const response = await deceasedRepository.createDeceased(data);
    return response;
  } catch (error) {
    console.error('Error logging in user:', error);
    throw error;
  }
}


export async function getDeceasedById(id) {
  try {
    console.log('idservice', id)
    const response = await deceasedRepository.getDeceasedById(id);
    return response;
  } catch (error) {
    console.error('Error logging in user:', error);
    throw error;
  }
}



export async function updateDeceasedById(id, data) {
  try {
    console.log('idservice', id)
    const response = await deceasedRepository.updateDeceasedById(id, data);
    return response;
  } catch (error) {
    console.error('Error logging in user:', error);
    throw error;
  }
}



