import { MongoClient } from "mongodb";

const requiredEnvVars = [
  "MONGODB_URI",
  "MONGODB_DATABASE",
  "MONGODB_USERS_COLLECTION",
];

let client;
let clientPromise;

function getMongoConfig() {
  const missingVars = requiredEnvVars.filter((name) => !process.env[name]);

  if (missingVars.length > 0) {
    throw new Error(
      `Variáveis de ambiente ausentes para MongoDB Atlas: ${missingVars.join(", ")}`
    );
  }

  return {
    uri: process.env.MONGODB_URI,
    database: process.env.MONGODB_DATABASE,
    usersCollection: process.env.MONGODB_USERS_COLLECTION,
  };
}

function getClientPromise() {
  if (clientPromise) {
    return clientPromise;
  }

  const { uri } = getMongoConfig();

  if (process.env.NODE_ENV === "development") {
    if (!globalThis._mongoClientPromise) {
      client = new MongoClient(uri);
      globalThis._mongoClientPromise = client.connect();
    }

    clientPromise = globalThis._mongoClientPromise;
    return clientPromise;
  }

  client = new MongoClient(uri);
  clientPromise = client.connect();
  return clientPromise;
}

async function getUsersCollection() {
  const { database, usersCollection } = getMongoConfig();
  const mongoClient = await getClientPromise();
  return mongoClient.db(database).collection(usersCollection);
}

function normalizeEmail(email) {
  return String(email || "")
    .trim()
    .toLowerCase();
}

export async function findUserByEmail(email) {
  const collection = await getUsersCollection();
  return collection.findOne({ email: normalizeEmail(email) });
}

export async function createUser({ email, senhaHash }) {
  const collection = await getUsersCollection();

  const result = await collection.insertOne({
    email: normalizeEmail(email),
    senhaHash,
    createdAt: new Date(),
  });

  return result.insertedId;
}
