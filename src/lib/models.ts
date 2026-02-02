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
    altPhone?: string;
    officePhone?: string;
    email: string;
    address: string;
  };
  updatedAt: Date;
};

export type Achievement = {
  _id: ObjectId;
  title: string;
  description: string;
  year?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type AchievementInput = {
  title: string;
  description: string;
  year?: string;
};

export type Lab = {
  _id: ObjectId;
  name: string;
  description: string;
  image: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
};

export type LabInput = {
  name: string;
  description: string;
  image: string;
  order?: number;
};

export type GalleryItem = {
  _id: ObjectId;
  title: string;
  src: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
};

export type GalleryItemInput = {
  title: string;
  src: string;
  order?: number;
};



