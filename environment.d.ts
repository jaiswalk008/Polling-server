export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGODB_SRV: string;
      JWT_SECRET_KEY: string;
      PORT:number,
      ORIGIN:string;
      PROFILE_PHOTO_URL:string;
      ENV: 'test' | 'dev' | 'prod';
    }
  }
}

