import Http from "axios";
import Cookies from "js-cookie";
import qs from "qs";
import { API_URL } from "../helpers";

class Api {
  constructor() {
    Http.defaults.baseURL = API_URL;
    Http.defaults.timeout = 300000;
  }

  async get(resource, responseType = null, params = {}) {
    const { token } = JSON.parse(localStorage.getItem("chat-token"));
    const config = {
      responseType,
      params,
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      paramsSerializer: (params) =>
        qs.stringify(params, { arrayFormat: "repeat" }),
    };
    try {
      const res = await Http.get(`${API_URL}${resource}`, config);

      return this.successResponse(res);
    } catch (error) {
      return this.errorResponse(error);
    }
  }

  async destroy(resource, data, params = {}) {
    const { token } = JSON.parse(localStorage.getItem("chat-token"));
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      data,
      params,
    };
    try {
      const res = await Http.delete(`${API_URL}${resource}`, config);
      return this.successResponse(res);
    } catch (error) {
      return this.errorResponse(error);
    }
  }

  async patch(resource, data) {
    const { token } = JSON.parse(localStorage.getItem("chat-token"));
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    };
    try {
      const res = await Http.patch(`${API_URL}${resource}`, data, config);
      return this.successResponse(res);
    } catch (error) {
      return this.errorResponse(error);
    }
  }

  async post(resource, params) {
    const parsedValue = localStorage.getItem("chat-token");
    let parsedToken;
    let token;
    if (parsedValue) {
      parsedToken = JSON.parse(localStorage.getItem("chat-token"));
      token = parsedToken.token;
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    };
    try {
      const response = await Http.post(resource, params, config);
      return this.successResponse(response);
    } catch (error) {
      return this.errorResponse(error);
    }
  }

  async put(resource, data, params) {
    const { token } = JSON.parse(localStorage.getItem("chat-token"));
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      params,
    };
    try {
      const res = await Http.put(`${API_URL}${resource}`, data, config);
      return this.successResponse(res);
    } catch (error) {
      return this.errorResponse(error);
    }
  }

  async filePut(resource, data, params) {
    const { token } = JSON.parse(localStorage.getItem("chat-token"));
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: token,
      },
      params,
    };
    try {
      const res = await Http.put(`${API_URL}${resource}`, data, config);
      return this.successResponse(res);
    } catch (error) {
      return this.errorResponse(error);
    }
  }
  async filePost(resource, data, params) {
    const { token } = JSON.parse(localStorage.getItem("chat-token"));
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: token,
      },
      params,
    };
    try {
      const res = await Http.post(`${API_URL}${resource}`, data, config);
      return this.successResponse(res);
    } catch (error) {
      return this.errorResponse(error);
    }
  }

  errorResponse(error) {
    switch (error.response.status) {
      case 401:
        // toastr.error('', 'Unauthorized');
        localStorage.removeItem("chat-token");
        Cookies.remove("chat-token");
        window.location.replace("/");
        break;
      default:
        if (!error.response.data.success) {
          return this.response(error.response);
        }
        return this.response({
          data: "Network Error",
          success: false,
        });
    }
  }

  successResponse(response) {
    return this.response(response);
  }

  response({ data, status, headers }) {
    return {
      body: data,
      status,
      headers,
    };
  }
}

export default new Api();
