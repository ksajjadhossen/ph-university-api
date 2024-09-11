export interface IUser {
  user: import("mongoose").Types.ObjectId;
  id: string;
  password: string;
  needsPasswordChange: boolean;
  role: "student" | "faculty" | "admin";
  isDeleted: boolean;
}
