import type { Campus } from "./Campus";

export interface Student {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  imageUrl: string | null;
  gpa: number;
  campusId: number | null;
  campus?: Campus | null;
}
