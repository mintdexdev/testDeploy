import { Client, Account, ID } from "appwrite";
import config from "../config/config.js";

// all about account
class AuthService {
  client;
  account;
  constructor() {
    this.client = new Client()
      .setEndpoint(config.appwriteEndpoint) // Appwrite API Endpoint
      .setProject(config.appwriteProjectId); // Appwrite project ID
    this.account = new Account(this.client);
  }

  async createAccount({ name, email, password, }, userId = ID.unique()) {
    try {
      const userAccount = await this.account.create(
        userId, // userId
        email, // email
        password, // password
        name // name (optional) 
      )
      if (userAccount) {
        return this.login({ email, password });
      }
      return userAccount;
    } catch (error) {
      console.log(`Appwrite:createAccount: ${error}`);
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(
        email,
        password
      );
    } catch (error) {
      console.log(`Appwrite:login: ${error}`);
      throw error;
    }
  }

  async guestLogin() {
    try {
      return await this.account.createAnonymousSession();
    } catch (error) {
      console.log(`Appwrite:guestLogin: ${error}`);
    }
  }

  async logout() {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      console.log(`Appwrite:logout: ${error}`);
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.error(`Appwrite:getUser: ${error}`);
      return null;
    }
  }
}

const authService = new AuthService();
export default authService;