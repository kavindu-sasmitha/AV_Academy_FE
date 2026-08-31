export type Role = "admin" | "student";

export interface User {
  id: string;
  name: string;
  email: string;
  nic?: string | null;
  phone?: string;
  role: Role;
  picture?: string;
}

export interface Course {
  _id: string;
  title: string;
  description?: string;
  thumbnail?: string;
  price: number;
  youtubePlaylistId?: string;
  isPublished: boolean;
  createdAt?: string;
}

export interface Download {
  os: "windows" | "mac" | "linux" | "other";
  label: string;
  url: string;
}

export interface Lesson {
  _id: string;
  course: string;
  title: string;
  description?: string;
  order: number;
  youtubeUrl?: string; // only present if access granted
  downloads?: Download[]; // only present if access granted
  locked?: boolean;
}

export interface Enrollment {
  _id: string;
  student: string | User;
  course: string | Course;
  paymentStatus: "pending" | "paid";
  amountPaid: number;
  accessGranted: boolean;
  notes?: string;
  createdAt?: string;
}

// --- Exam papers (practice MCQ tests) ---

export interface ExamQuestion {
  questionText: string;
  imageUrl?: string;
  options: string[];
  correctOptionIndex?: number; // only sent when admin creates/edits a paper
}

export interface ExamPaper {
  _id: string;
  title: string;
  questions: ExamQuestion[];
  createdAt?: string;
}

export interface ExamResult {
  score: number;
  passed: boolean;
}

// --- Video tutorials ---

export type VideoCategory = "PRACTICAL" | "THEORY" | "ROAD_RULES";

export interface VideoTutorial {
  _id: string;
  title: string;
  description?: string;
  videoUrl: string;
  category: VideoCategory;
  createdAt?: string;
}
