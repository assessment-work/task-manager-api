// Server
const SERVER_HOST = process.env.TASK_MANAGER_API_SERVER_HOST ?? "localhost";
const SERVER_PORT = process.env.TASK_MANAGER_API_SERVER_PORT ?? 3000;

const SERVER = {
  HOST: SERVER_HOST,
  PORT: SERVER_PORT,
};

const configs = { SERVER };

export { configs };
