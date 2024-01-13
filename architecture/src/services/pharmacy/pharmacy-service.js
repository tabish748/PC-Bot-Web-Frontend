
import pharmacyRepository from "../../repositories/pharmacy/pharmacy-repository.js";

export async function findSearchTermSuggestions(data) {
  try {
    const response = await pharmacyRepository.findSearchTermSuggestions(data);
    return response;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

export async function findDrugPricesByZip(data) {
  try {
    const response = await pharmacyRepository.findDrugPricesByZip(data);
    return response;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

export async function findDrugPricesByGeo(data) {
  try {
    const response = await pharmacyRepository.findDrugPricesByGeo(data);
    return response;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}




