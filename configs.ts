// Server
const SERVER_HOST = process.env.TASK_MANAGER_API_SERVER_HOST ?? "localhost";
const SERVER_PORT = process.env.TASK_MANAGER_API_SERVER_PORT ?? 3000;

// Database
const DATABASE_HOST = process.env.TASK_MANAGER_API_DATABASE_HOST ?? "localhost";
const DATABASE_PORT = process.env.TASK_MANAGER_API_DATABASE_PORT ?? 27017;
const DATABASE_NAME =
  process.env.TASK_MANAGER_API_DATABASE_NAME ?? "task_manager";
const DATABASE_USER = process.env.TASK_MANAGER_API_DATABASE_USER ?? "root";
const DATABASE_PASSWORD =
  process.env.TASK_MANAGER_API_DATABASE_PASSWORD ?? "password";

const SERVER = {
  HOST: SERVER_HOST,
  PORT: SERVER_PORT,
};

const DATABASE = {
  HOST: DATABASE_HOST,
  PORT: DATABASE_PORT,
  NAME: DATABASE_NAME,
  USER: DATABASE_USER,
  PASSWORD: DATABASE_PASSWORD,
};

const configs = { SERVER, DATABASE };

export { configs };
