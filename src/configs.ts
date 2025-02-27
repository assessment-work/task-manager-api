// Server
const SERVER_HOST = process.env.TASK_MANAGER_API_SERVER_HOST ?? "localhost";
const SERVER_PORT = process.env.TASK_MANAGER_API_SERVER_PORT ?? "3000";

// Database
const DATABASE_HOST = process.env.TASK_MANAGER_API_DATABASE_HOST ?? "localhost";
const DATABASE_PORT = process.env.TASK_MANAGER_API_DATABASE_PORT ?? "27017";
const DATABASE_NAME =
  process.env.TASK_MANAGER_API_DATABASE_NAME ?? "task_manager";
const DATABASE_USER = process.env.TASK_MANAGER_API_DATABASE_USER ?? "root";
const DATABASE_PASSWORD =
  process.env.TASK_MANAGER_API_DATABASE_PASSWORD ?? "password";

// Auth
const PASSWORD_SALT_ROUNDS =
  process.env.TASK_MANAGER_API_PASSWORD_SALT_ROUNDS ?? "10";
const JWT_SECRET = process.env.TASK_MANAGER_API_JWT_SECRET ?? "secret";
const JWT_EXPIRES_IN = process.env.TASK_MANAGER_API_JWT_EXPIRES_IN ?? "3600";

enum HTTP_STATUS_CODE {
  Ok = 200,
  Created = 201,
  Accepted = 202,
  NoContent = 204,
  PartialContent = 206,
  MultipleChoices = 300,
  MovedPermanently = 301,
  Found = 302,
  BadRequest = 400,
  Unauthorized = 401,
  PaymentRequired = 402,
  Forbidden = 403,
  NotFound = 404,
  MethodNotAllowed = 405,
  RequestTimeout = 408,
  Conflict = 409,
  Gone = 410,
  UnprocessableEntity = 422,
  TooManyRequests = 429,
  InternalServerError = 500,
  NotImplemented = 501,
  BadGateway = 502,
  ServiceUnavailable = 503,
  GatewayTiemout = 504,
}

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

const AUTH = {
  PASSWORD_SALT_ROUNDS: PASSWORD_SALT_ROUNDS,
  JWT_SECRET,
  JWT_EXPIRES_IN,
};

const configs = { SERVER, DATABASE, AUTH, HTTP_STATUS_CODE };

export { configs };
