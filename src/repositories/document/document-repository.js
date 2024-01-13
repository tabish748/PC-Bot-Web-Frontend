
// repositories/userRepository.js

import documentAPI from "../../api/document/document-api.js";

class documentRepository 
{
  async getDocumentsByCategoryId(id) 
  {
    return documentAPI.getDocumentsByCategoryId(id);
  }

  async createDocument(data) 
  {
    return documentAPI.createDocument(data);
  }

  async uploadDocByText(data) 
  {
    return documentAPI.uploadDocByText(data);
  }

  async getDocumentIdByName(name) 
  {
    return documentAPI.getDocumentIdByName(name);
  }

  async getDocumentListsByDocumentNameAndUserId(name, id) 
  {
    return documentAPI.getDocumentListsByDocumentNameAndUserId(name, id);
  }
  async getDocumentListsByDocumentNameAndUserIdAndParentId(name, id, parentId) 
  {
    return documentAPI.getDocumentListsByDocumentNameAndUserIdAndParentId(name, id, parentId);
  }

  
  async getDataByDocumentListId(id) 
  {
    return documentAPI.getDataByDocumentListId(id);
  }

  
  async makePrimaryDocumentListTrue(documentListId, userId, documentId) 
  {
    return documentAPI.makePrimaryDocumentListTrue(documentListId, userId, documentId);
  }

  
  async uploadDocument(data) 
  {
    return documentAPI.uploadDocument(data);
  }
  
  async getGeneratedDocument(id) 
  {
    return documentAPI.getGeneratedDocument(id);
  }

  
  async updateDocumentDataByListId(data, id) 
  {
    return documentAPI.updateDocumentDataByListId(data, id);
  }
  
  async deleteDocumentData(name, id) 
  {
    console.log('servicess', id, name);
    return documentAPI.deleteDocumentData(name, id);
  }

  
  async DocumentDataByListId(id) 
  {
    return documentAPI.DocumentDataByListId(id);
  }

  
  async DeleteDocumentList(id) 
  {
    return documentAPI.DeleteDocumentList(id);
  }


  
  
  
  
  
  
}

export default new documentRepository();