import config from '../config/config.js'
import { Client, ID, Databases, Storage, Query } from "appwrite"

class Operation {
  client;
  databases;
  storage;
  constructor() {
    this.client = new Client()
      .setEndpoint(config.appwriteEndpoint)
      .setProject(config.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  async createPost({ title, slug, content, coverImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        // ID.unique(),
        slug,
        { title, content, coverImage, status, userId }
      )
    } catch (error) {
      console.log("appwrite :: createPost :: error ", error);
    }
  }

  async updatePost(id, { title, content, coverImage, status }) {
    try {
      return await this.databases.updateDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        id,
        { title, content, coverImage, status }
      )
    } catch (error) {
      console.log("appwrite :: updatePost :: error ", error);
    }
  }

  async deletePost(id) {
    try {
      await this.databases.deleteDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        id,
      )
      return true;
    } catch (error) {
      console.log("appwrite :: deletePost :: error ", error);
      return false;
    }
  }

  async getPost(id) {
    try {
      return await this.databases.getDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        id,
      )
    } catch (error) {
      console.log("appwrite :: getPost :: error ", error);
      return false;
    }
  }

  async getPosts(querries = [Query.equal("status", ["active"])]) {
    try {
      return await this.databases.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        querries,
      )
    } catch (error) {
      console.log("appwrite :: getPosts :: error ", error);
      return false;
    }
  }

  // file service (image)
  async uploadFile(file) {
    try {
      return await this.storage.createFile(
        config.appwriteBucketId,
        ID.unique(),
        file
      )
    } catch (error) {
      console.log("appwrite :: uploadFile :: error ", error);
      return false;
    }
  }

  async deleteFile(id) {
    try {
      return await this.storage.deleteFile(
        config.appwriteBucketId,
        id,
      )
    } catch (error) {
      console.log("appwrite :: deleteFile :: error ", error);
      return false;
    }
  }

  getFileView(id) {
    return this.storage.getFileView(
      config.appwriteBucketId,
      id,
    )
  }

  downloadFile(id) {
    return this.storage.getFileDownload(
      config.appwriteBucketId,
      id,
    )
  }
}

const operation = new Operation();

export default operation;