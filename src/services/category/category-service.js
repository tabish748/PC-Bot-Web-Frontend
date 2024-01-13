
import categoryRepository from "../../repositories/category/category-repository.js";

export async function getCategoryByType(type) {
  try {
    const response = await categoryRepository.getCategoryByType(type);
    return response;
  } catch (error) {
    console.error('Error logging in user:', error);
    throw error;
  }
}


