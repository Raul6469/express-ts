declare namespace Express {
  interface Request {
    user?: UserPayload;
  }
}

declare interface UserPayload {
  id: number;
  username: string;
  role: number;
}
