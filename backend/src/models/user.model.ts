import mongoose, { Schema, Document, Types } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  phone?: string;
  password?: string;
  googleId?: string;
  role: "intern" | "client" | "developer" | "admin";
  isVerified: boolean;
  avatar?: string;
  clientProfile?: {
    companyName?: string;
    industry?: string;
    website?: string;
  };
  developerProfile?: {
    skills?: string[];
    githubProfile?: string;
    portfolioUrl?: string;
    experienceLevel?: "junior" | "mid" | "senior";
    bio?: string;
  };
  internProfile?: {
    university?: string;
    major?: string;
    startDate?: Date;
    endDate?: Date;
    mentor?: Types.ObjectId;
  };
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: { type: String },
    password: { type: String, select: false },
    googleId: { type: String, default: null },
    role: {
      type: String,
      enum: ["intern", "client", "developer", "admin"],
      default: "intern",
    },
    isVerified: { type: Boolean, default: false },
    avatar: String,
    clientProfile: {
      companyName: String,
      industry: String,
      website: String,
    },
    developerProfile: {
      skills: { type: [String], default: [] },
      githubProfile: String,
      portfolioUrl: String,
      bio: String,
      experienceLevel: { type: String, enum: ["junior", "mid", "senior"] },
    },
    internProfile: {
      university: String,
      major: String,
      startDate: Date,
      endDate: Date,
      mentor: { type: Schema.Types.ObjectId, ref: "User" },
    },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", UserSchema);
