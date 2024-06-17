import { Client, Account, Databases, Storage, Avatars } from "appwrite";

export const appwriteConfig = {
    projectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    url: String(import.meta.env.VITE_APPWRITE_URL),
    storageId: String(import.meta.env.VITE_APPWRITE_STORAGE_ID),
    databaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    userCollectionId: String(import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID),
    postCollectionId: String(import.meta.env.VITE_APPWRITE_POSTS_COLLECTION_ID),
    savesCollectionId: String(import.meta.env.VITE_APPWRITE_SAVES_COLLECTION_ID)
}

export const client = new Client()

client.setProject(appwriteConfig.projectId)
client.setEndpoint(appwriteConfig.url)

export const account = new Account(client)
export const databases = new Databases(client)
export const storage = new Storage(client)
export const avatar = new Avatars(client)