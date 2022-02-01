import Api from "../api";

class User {
  fetchUsers = async (params = {}) => {
    const { body } = await Api.get(`user`, null, params);
    return body;
  };
}

export default new User();
