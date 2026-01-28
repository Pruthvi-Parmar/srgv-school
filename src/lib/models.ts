import { ObjectId } from "mongodb";

export type Notice = {
  _id: ObjectId;
  title: string;
  body: string;
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
};

export type NoticeInput = {
  title: string;
  body: string;
  publishedAt?: string; // ISO date
};

export type SiteSettings = {
  _id: "singleton";
  admissionsText: string;
  contact: {
    phone: string;
    email: string;
    address: string;
  };
  updatedAt: Date;
};


