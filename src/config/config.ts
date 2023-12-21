import dotenv from "dotenv";

type TConfig = {
  [key: string]: EnviromentConfig;
};

type EnviromentConfig = {
  app: AppConfig;
  db?: MongoDBConfig;
  auth0?: AUTH0;
};

type MongoDBConfig = {
  URI: string;
};

type AppConfig = {
  PORT: string | number;
  ORIGIN: string | undefined;
};

type AUTH0 = {
  client_origin: string | undefined;
  audience: string | undefined;
  issuer: string | undefined;
};

if (process.env.NODE_ENV === "production") {
  dotenv.config({ path: ".env.production" });
} else {
  dotenv.config({ path: ".env.development" });
}

const ENV = process.env.NODE_ENV ?? "development";

const CONFIG: TConfig = {
  development: {
    app: {
      PORT: process.env.PORT || 4001,
      ORIGIN: process.env.APP_ORIGIN,
    },
    auth0: {
      client_origin: process.env.APP_ORIGIN,
      audience: process.env.AUTH0_AUDIENCE,
      issuer: process.env.AUTH0_ISSUER,
    },
  },
  production: {
    app: {
      PORT: process.env.PORT || 4001,
      ORIGIN: process.env.APP_ORIGIN,
    },
    auth0: {
      client_origin: process.env.APP_ORIGIN,
      audience: process.env.AUTH0_AUDIENCE,
      issuer: process.env.AUTH0_ISSUER,
    },
  },
};

export default CONFIG[ENV];
