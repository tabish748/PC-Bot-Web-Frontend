// api/userAPI.js

import BaseAPI from "../base-api.js";
import { XPI_KEY } from "../../libs/constants.js";

import {
  USER_COUNTS,
  USER_CREATE,
  USER_LOGIN,
  USER_LIST,
  GET_USER,
  UPDATE_USER,
  CHILD_USER,
} from "../data/endpoints/user-endpoints.js";
class UserAPI extends BaseAPI {
  constructor() {
    super("/users");
  }

  async createUser(data) {
    const token = localStorage.getItem("token");
    const url = `${this.baseUrl}${this.endpoint}${USER_CREATE}`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify(data),
    };
    return this.fetchWrapper(url, options);
  }

  async userList(page) {
    const token = localStorage.getItem("token");
    const url = `${this.baseUrl}${this.endpoint}${USER_LIST}?page=${page}`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    };
    return this.fetchWrapper(url, options);
  }

  async getUserById(id) {
    const token = localStorage.getItem("token");
    const url = `${this.baseUrl}${this.endpoint}${GET_USER}/${id}`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    };
    return this.fetchWrapper(url, options);
  }

  async updateUser(id, data) {
    const token = localStorage.getItem("token");
    const url = `${this.baseUrl}${this.endpoint}${UPDATE_USER}/${id}`;
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify(data),
    };
    return this.fetchWrapper(url, options);
  }

  async loginUser(data) {
    const url = `${this.baseUrl}/auth${USER_LOGIN}`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    const response = await this.fetchWrapper(url, options);

    if (response.status === 401) {
      localStorage.removeItem("token");
      // Redirect to login or show a message
      throw new Error("Unauthorized");
    }

    return response;
  }

  async getChildUsers(id) {
    const token = localStorage.getItem("token");
    const url = `${this.baseUrl}${this.endpoint}${CHILD_USER}/${id}`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    };
    return this.fetchWrapper(url, options);
  }

  async getUsersCountByGrant() {
    const token = localStorage.getItem("token");
    const url = `${this.baseUrl}${this.endpoint}${USER_COUNTS}`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    };
    return this.fetchWrapper(url, options);
  }

  // Add more user-related API methods here
}

export default new UserAPI();
