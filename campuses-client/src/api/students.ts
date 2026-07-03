import type { Student } from "../types/Student";
import { API_BASE_URL } from "./base";

type StudentInput = {
  firstName: string;
  lastName: string;
  email: string;
  imageUrl?: string;
  gpa: number;
  campusId?: number | null;
};

async function parseErrorMessage(res: Response, fallback: string): Promise<string> {
  try {
    const body = (await res.json()) as { error?: string };
    return body.error ?? fallback;
  } catch {
    return fallback;
  }
}

function normalizeStudent(raw: Omit<Student, "gpa"> & { gpa: number | string }): Student {
  return {
    ...raw,
    gpa: Number(raw.gpa),
  };
}

export async function getStudents(): Promise<Student[]> {
  const res = await fetch(`${API_BASE_URL}/students`);
  if (!res.ok) {
    throw new Error(await parseErrorMessage(res, "Failed to fetch students"));
  }

  const data = (await res.json()) as Array<Omit<Student, "gpa"> & { gpa: number | string }>;
  return data.map(normalizeStudent);
}

export async function getStudent(id: string): Promise<Student> {
  const res = await fetch(`${API_BASE_URL}/students/${id}`);
  if (!res.ok) {
    throw new Error(await parseErrorMessage(res, "Failed to fetch student"));
  }

  const data = (await res.json()) as Omit<Student, "gpa"> & { gpa: number | string };
  return normalizeStudent(data);
}

export async function createStudent(payload: StudentInput): Promise<Student> {
  const res = await fetch(`${API_BASE_URL}/students`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(await parseErrorMessage(res, "Failed to create student"));
  }

  const data = (await res.json()) as Omit<Student, "gpa"> & { gpa: number | string };
  return normalizeStudent(data);
}

export async function updateStudent(id: number, payload: StudentInput): Promise<Student> {
  const res = await fetch(`${API_BASE_URL}/students/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(await parseErrorMessage(res, "Failed to update student"));
  }

  const data = (await res.json()) as Omit<Student, "gpa"> & { gpa: number | string };
  return normalizeStudent(data);
}

export async function deleteStudent(id: number): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/students/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error(await parseErrorMessage(res, "Failed to delete student"));
  }
}
