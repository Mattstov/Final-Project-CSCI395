export interface StudentFormValues {
  firstName: string;
  lastName: string;
  email: string;
  imageUrl: string;
  gpa: string;
  campusId: string;
}

export interface ValidatedStudentPayload {
  firstName: string;
  lastName: string;
  email: string;
  imageUrl: string;
  gpa: number;
  campusId: number | null;
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function validateStudentForm(values: StudentFormValues): string | null {
  const firstName = values.firstName.trim();
  const lastName = values.lastName.trim();
  const email = values.email.trim();
  const gpa = Number(values.gpa);

  if (!firstName) return "First name is required.";
  if (!lastName) return "Last name is required.";
  if (!email) return "Email is required.";
  if (!isValidEmail(email)) return "Please enter a valid email address.";
  if (!Number.isFinite(gpa) || gpa < 0 || gpa > 4) return "GPA must be between 0.0 and 4.0.";

  return null;
}

export function toStudentPayload(values: StudentFormValues): ValidatedStudentPayload {
  return {
    firstName: values.firstName.trim(),
    lastName: values.lastName.trim(),
    email: values.email.trim(),
    imageUrl: values.imageUrl.trim(),
    gpa: Number(values.gpa),
    campusId: values.campusId ? Number(values.campusId) : null,
  };
}
