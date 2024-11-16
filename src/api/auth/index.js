import axiosInstance from "../index";

export class AuthService {
  static path = "auth";

  static async getMe() {
    return await axiosInstance.get(`${this.path}/me`);
  }

  static async login(address, signature, message) {
    return await axiosInstance.post(`${this.path}/login`, {
      address,
      signature,
      message,
    });
  }

  static async getNonce(userAddress) {
    const response = await axiosInstance.get(`${this.path}/nonce`, {
      params: { address: userAddress },
    });

    return response.data.nonce;
  }
}
