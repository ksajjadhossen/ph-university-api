import { Types } from "mongoose";

export type IUserName = {
  firstName: string;
  middleName?: string | undefined;
  lastName: string;
};

export type IGuardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};

export type ILocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export type IStudent = {
  id: string;
  user: Types.ObjectId;
  name: IUserName;
  gender: "male" | "female" | "others";
  email: string;
  dateOfBirth: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  presentAddress: string;
  permanentAddress: string;
  profileImage?: string | undefined;
  avatar?: string | undefined;
  guardian: IGuardian;
  localGuardian: ILocalGuardian;
};
