import { Client, Storage, ID } from "appwrite";
import config from "../config/config.js";


class ImageService {
  client;
  storage;

  constructor() {
    this.client = new Client()
      .setEndpoint(config.appwriteEndpoint)
      .setProject(config.appwriteProjectId);
    this.storage = new Storage(this.client);
  }

  async uploadImage(file) {
    try {
      return await this.storage.createFile(
        config.appwriteBucketId,
        ID.unique(), // fileId
        file, // file
      );
    } catch (error) {
      console.log(`Appwrite:uploadImage: ${error}`);
      return false;
    }
  }

  async deleteImage(imageId) {
    try {
      await this.storage.deleteFile(
        config.appwriteBucketId,
        imageId // fileId
      );
      return true;
    } catch (error) {
      console.log(`Appwrite:deleteImage: ${error}`);
      return false;
    }
  }

  viewImage(imageId) {
    return this.storage.getFileView(
      config.appwriteBucketId,
      imageId // fileId
    );
  }

}
const imageService = new ImageService();

export default imageService;