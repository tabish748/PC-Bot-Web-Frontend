
import documentRepository from "../../repositories/document/document-repository.js";

export async function getDocumentsByCategoryId(id) {
  try {
    const response = await documentRepository.getDocumentsByCategoryId(id);
    return response;
  } catch (error) {
    console.error('Error logging in user:', error);
    throw error;
  }
}

export async function createDocument(data) {
  try {
    const response = await documentRepository.createDocument(data);
    return response;
  } catch (error) {
    console.error('Error logging in user:', error);
    throw error;
  }
}

export async function uploadDocByText(data) {
  try {
    const response = await documentRepository.uploadDocByText(data);
    return response;
  } catch (error) {
    console.error('Error logging in user:', error);
    throw error;
  }
}

export async function getDocumentIdByName(name) {
  try {
    const response = await documentRepository.getDocumentIdByName(name);
    return response;
  } catch (error) {
    console.error('Error logging in user:', error);
    throw error;
  }
}


export async function getDocumentListsByDocumentNameAndUserId(name, id) {
  try {
    console.log('nameee', name,id)
    const response = await documentRepository.getDocumentListsByDocumentNameAndUserId(name, id);
    return response;
  } catch (error) {
    console.error('Error logging in user:', error);
    throw error;
  }
}

export async function getDocumentListsByDocumentNameAndUserIdAndParentId(name, id, parentId) {
  try {
    const response = await documentRepository.getDocumentListsByDocumentNameAndUserIdAndParentId(name, id, parentId);
    return response;
  } catch (error) {
    console.error('Error logging in user:', error);
    throw error;
  }
}

export async function getDataByDocumentListId(id) {
  try {
    const response = await documentRepository.getDataByDocumentListId(id);
    return response;
  } catch (error) {
    console.error('Error logging in user:', error);
    throw error;
  }
}


export async function makePrimaryDocumentListTrue(documentListId, userId, documentId) {
  try {
    const response = await documentRepository.makePrimaryDocumentListTrue(documentListId, userId, documentId);
    return response;
  } catch (error) {
    console.error('Error logging in user:', error);
    throw error;
  }
}

export async function uploadDocument(data) {
  try {
    const response = await documentRepository.uploadDocument(data);
    return response;
  } catch (error) {
    console.error('Error logging in user:', error);
    throw error;
  }
}


export async function getGeneratedDocument(id) {
  try {
    const response = await documentRepository.getGeneratedDocument(id);
    return response;
  } catch (error) {
    console.error('Error logging in user:', error);
    throw error;
  }
}


export async function updateDocumentDataByListId(data, id) {
  try {
    const response = await documentRepository.updateDocumentDataByListId(data, id);
    return response;
  } catch (error) {
    console.error('Error logging in user:', error);
    throw error;
  }
}


export async function deleteDocumentData(name, id) {
  try {
    
    const response = await documentRepository.deleteDocumentData(name, id);
    return response;
  } catch (error) {
    console.error('Error logging in user:', error);
    throw error;
  }
}


export async function DocumentDataByListId(id) {
  try {
    
    const response = await documentRepository.DocumentDataByListId(id);
    return response;
  } catch (error) {
    console.error('Error logging in user:', error);
    throw error;
  }
}




export async function DeleteDocumentList(id) {
  try {
    
    const response = await documentRepository.DeleteDocumentList(id);
    return response;
  } catch (error) {
    console.error('Error logging in user:', error);
    throw error;
  }
}








