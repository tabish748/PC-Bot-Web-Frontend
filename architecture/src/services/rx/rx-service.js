// services/userService.js

import RxRepository from '../../repositories/rx/rx-repository.js';

export async function requestRxDownloadToken(data) {
  try {
    const response = await RxRepository.requestRxDownloadToken(data);
    return response;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}


// Add more rx-related business logic and operations here
