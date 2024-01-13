// api/userAPI.js

import BaseAPI from '../base-api.js';
import { DEL_DOC_LIST, DOC_DATA_BY_LIST_ID,  DEL_DOC_DATA, UPDATE_DOC_DATA, GENERATED_DOC,DOC_MAKE_PRIMARY, DOCUMENT_BY_CAT_ID,ADD_DOCUMENT, UPLOAD_DOC_TEXT, DOC_ID_BY_NAME , DOC_LIST_BY_NAME, DATA_BY_DOC_LIST_ID, DOC_CHILD_USER_LIST } from '../data/endpoints/document-endpoints.js';

class documentAPI extends BaseAPI {
  constructor() 
  {
    super('/documents');
  }

  async getDocumentsByCategoryId(id) 
  {
    const token = localStorage.getItem('token');
    const url = `${this.baseUrl}${this.endpoint}${DOCUMENT_BY_CAT_ID}/${id}`;
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      }
    };
    return this.fetchWrapper(url, options);
  }

  async createDocument(data) 
  {
    const token = localStorage.getItem('token');
    const url = `${this.baseUrl}${this.endpoint}${ADD_DOCUMENT}`;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      },
      body: JSON.stringify(data),
    };
    return this.fetchWrapper(url, options);
  }

  async uploadDocByText(data) 
  {
    const token = localStorage.getItem('token');
    const url = `${this.baseUrl}${this.endpoint}${UPLOAD_DOC_TEXT}`;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      },
      body: JSON.stringify(data),
    };
    return this.fetchWrapper(url, options);
  }

  async getDocumentIdByName(name) 
  {
    const token = localStorage.getItem('token');
    const url = `${this.baseUrl}${this.endpoint}${DOC_ID_BY_NAME}/${name}`;
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`,
      }
    };
    return this.fetchWrapper(url, options);
  }

  
  async getDocumentListsByDocumentNameAndUserId(name, id) 
  {
    const token = localStorage.getItem('token');
    const url = `${this.baseUrl}${this.endpoint}${DOC_LIST_BY_NAME}/${name}/${id}`;
    console.log('url', url)
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`,
      }
    };
    return this.fetchWrapper(url, options);
  }

  async getDocumentListsByDocumentNameAndUserIdAndParentId(name, id, parentId) 
  {
    const token = localStorage.getItem('token');
    const url = `${this.baseUrl}${this.endpoint}${DOC_CHILD_USER_LIST}/${name}/${id}/${parentId}`;
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`,
      }
    };
    return this.fetchWrapper(url, options);
  }
  
  async makePrimaryDocumentListTrue(documentListId, userId, documentId) 
  {
    const token = localStorage.getItem('token');
    const url = `${this.baseUrl}${this.endpoint}${DOC_MAKE_PRIMARY}/${documentListId}/${userId}/${documentId}`;
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`,
      }
    };
    return this.fetchWrapper(url, options);
  }
  

  async  getDataByDocumentListId(id) 
  {
    const token = localStorage.getItem('token');
    const url = `${this.baseUrl}${this.endpoint}${DATA_BY_DOC_LIST_ID}/${id}`;
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`,
      }
    };
    return this.fetchWrapper(url, options);
  }

  async uploadDocument(data) 
  {
    const token = localStorage.getItem('token');
    const url = `${this.baseUrl}${this.endpoint}${UPLOAD_DOC}`;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      },
      body: JSON.stringify(data),
    };
    return this.fetchWrapper(url, options);
  }

  async  getGeneratedDocument(id) 
  {
    const token = localStorage.getItem('token');
    const url = `${this.baseUrl}${this.endpoint}${GENERATED_DOC}/${id}`;
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`,
      }
    };
    return this.fetchWrapper(url, options);
  }

  
  async updateDocumentDataByListId(data, id) 
  {
    const token = localStorage.getItem('token');
    const url = `${this.baseUrl}${this.endpoint}${UPDATE_DOC_DATA}/${id}`;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      },
      body: JSON.stringify(data),
    };
    return this.fetchWrapper(url, options);
  }


  async deleteDocumentData(name, id) 
  {
    const token = localStorage.getItem('token');
    const url = `${this.baseUrl}${this.endpoint}${DEL_DOC_DATA}/${name}/${id}`;
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      }
    };
    return this.fetchWrapper(url, options);
  }

  async DocumentDataByListId(id) 
  {
    const token = localStorage.getItem('token');
    const url = `${this.baseUrl}${this.endpoint}${DOC_DATA_BY_LIST_ID}/${id}`;
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`,
      }
    };
    return this.fetchWrapper(url, options);
  }

  
  async DeleteDocumentList(id) 
  {
    const token = localStorage.getItem('token');
    const url = `${this.baseUrl}${this.endpoint}${DEL_DOC_LIST}/${id}`;
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`,
      }
    };
    return this.fetchWrapper(url, options);
  }

  
  
  
}

export default new documentAPI();