import axios from "axios";

const API_URL = "http://localhost:8081/api/user/";

class AuthApi {
  login(username, password) {
    return axios
      .post(API_URL + "signin", { username, password })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password,firstname, lastname,birthday) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password,
      firstname,
      lastname,
      birthday
    }).then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
  }

  businessRegister(username, email, password,firstname, lastname,businessName,businessWebsite,phoneNumber) {
    return axios.post(API_URL + "business/signup", {
      username,
      email,
      password,
      firstname,
      lastname,
      businessName,
      businessWebsite,
      phoneNumber
    }).then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
  }
}

export default new AuthApi();