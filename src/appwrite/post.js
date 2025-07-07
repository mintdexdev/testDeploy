import { Client, Databases, Query } from "appwrite";
import config from "../config/config.js";
import { returnFirstArg } from "html-react-parser/lib/utilities";

class PostService {
  client;
  database;

  constructor() {
    this.client = new Client()
      .setEndpoint(config.appwriteEndpoint)
      .setProject(config.appwriteProjectId);
    this.database = new Databases(this.client);
  }

  async createPost({ title, slug, content, coverImageId, status, userId }) {
    try {
      return await this.database.createDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug, // documentId
        { title, slug, content, coverImageId, status, userId },
      );

    } catch (error) {
      console.log(`Appwrite:createPost: ${error}`);
    }
  }

  async updatePost(slug, { title, content, coverImageId, status }) {
    try {
      return await this.database.updateDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug, // documentId
        { title, content, coverImageId, status },
      );

    } catch (error) {
      console.log(`Appwrite:updatePost: ${error}`);
    }
  }

  async deletePost(slug) {
    try {
      await this.database.deleteDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug, // documentId
      );
      return true;
    } catch (error) {
      console.log(`Appwrite:deletePost: ${error}`);
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.database.getDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug, // documentId
      );
    } catch (error) {
      console.log(`Appwrite:getPost: ${error}`);
      return false;
    }
  }

  async getAllPosts(queries = [Query.equal("status", ["active"])]) {
    try {
      return await this.database.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.log(`Appwrite:getAllPosts: ${error}`);
      return false;
    }
  }

  async getAllCurrentUserPosts(userId) {
    try {
      return await this.database.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        [Query.equal("userId", [String(userId)])]
      );
    } catch (error) {
      console.log(`Appwrite:getAllPosts: ${error}`);
      return false;
    }
  }


}
const postService = new PostService();

export default postService;