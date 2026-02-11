const requiredEnvVars = [
  "MONGODB_DATA_API_URL",
  "MONGODB_DATABASE",
  "MONGODB_USERS_COLLECTION",
];

function getAuthHeaders() {
  if (process.env.MONGODB_DATA_API_KEY) {
    return {
      "api-key": process.env.MONGODB_DATA_API_KEY,
    };
  }

  if (process.env.MONGODB_DATA_API_BEARER_TOKEN) {
    return {
      Authorization: `Bearer ${process.env.MONGODB_DATA_API_BEARER_TOKEN}`,
    };
  }

  throw new Error(
    "Autenticação ausente. Defina MONGODB_DATA_API_KEY (recomendado) ou MONGODB_DATA_API_BEARER_TOKEN."
  );
}

function getMongoConfig() {
  const missingVars = requiredEnvVars.filter((name) => !process.env[name]);

  if (missingVars.length > 0) {
    throw new Error(
      `Variáveis de ambiente ausentes para MongoDB Atlas: ${missingVars.join(", ")}`
    );
  }

  return {
    dataApiUrl: process.env.MONGODB_DATA_API_URL,
    database: process.env.MONGODB_DATABASE,
    dataSource: process.env.MONGODB_DATA_SOURCE || "Cluster0",
    usersCollection: process.env.MONGODB_USERS_COLLECTION,
  };
}

async function callMongoDataApi(action, body) {
  const { dataApiUrl } = getMongoConfig();

  const response = await fetch(`${dataApiUrl}/action/${action}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  if (!response.ok) {
    const rawError = await response.text();
    throw new Error(
      `Erro MongoDB Atlas Data API (${action}): ${response.status} ${rawError}`
    );
  }

  return response.json();
}

function usersScope() {
  const { database, dataSource, usersCollection } = getMongoConfig();
  return {
    dataSource,
    database,
    collection: usersCollection,
  };
}

export async function findUserByEmail(email) {
  const scope = usersScope();

  const result = await callMongoDataApi("findOne", {
    ...scope,
    filter: { email: email.toLowerCase() },
  });

  return result.document || null;
}

export async function createUser({ email, senhaHash }) {
  const scope = usersScope();

  const result = await callMongoDataApi("insertOne", {
    ...scope,
    document: {
      email: email.toLowerCase(),
      senhaHash,
      createdAt: new Date().toISOString(),
    },
  });

  return result.insertedId;
}
