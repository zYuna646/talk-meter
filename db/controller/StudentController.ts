import { Student } from "@/constants/Interface";
import setupDatabase from "../db";

// CREATE: Tambah Siswa Baru
export const addStudent = async (
  name: string,
  gender: string,
  nisn: string,
  classId: number
): Promise<boolean> => {
  try {
    if (!name.trim() || !gender.trim() || !nisn.trim()) {
      throw new Error("Name, gender, and NISN cannot be empty");
    }

    const db: any = await setupDatabase();
    await db.runAsync(
      `INSERT INTO student (name, gender, nisn, class_id) VALUES (?, ?, ?, ?);`,
      [name, gender, nisn, classId]
    );
    console.log(`Student '${name}' added successfully`);
    return true;
  } catch (error: any) {
    console.error("Error adding student:", error.message || error);
    return false;
  }
};

// READ: Ambil Semua Siswa
export const getStudents = async (): Promise<Student[]> => {
  try {
    const db: any = await setupDatabase();
    const result = await db.getAllAsync("SELECT * FROM student;");

    console.log("Fetched Students:", result);
    return result as Student[];
  } catch (error) {
    console.error("Error fetching students:", error);
    return [];
  }
};

// READ: Ambil Siswa Berdasarkan ID
export const getStudentById = async (id: number): Promise<Student | null> => {
  try {
    const db: any = await setupDatabase();
    const result = await db.getFirstAsync(
      "SELECT * FROM student WHERE id = ?;",
      [id]
    );

    console.log(`Fetched Student ID ${id}:`, result);
    return result as Student | null;
  } catch (error) {
    console.error(`Error fetching student with ID ${id}:`, error);
    return null;
  }
};

// READ: Ambil Siswa Berdasarkan Kelas
export const getStudentsByClassId = async (
  classId: number
): Promise<Student[]> => {
  try {
    const db: any = await setupDatabase();
    const result = await db.getAllAsync(
      "SELECT * FROM student WHERE class_id = ?;",
      [classId]
    );

    console.log(`Students in class ${classId}:`, result);
    return result as Student[];
  } catch (error) {
    console.error(`Error fetching students for class ID ${classId}:`, error);
    return [];
  }
};

// UPDATE: Ubah Data Siswa
export const updateStudent = async (
  id: number,
  name: string,
  gender: string,
  nisn: string,
  classId: number
): Promise<boolean> => {
  try {
    const db: any = await setupDatabase();
    await db.execAsync(
      `UPDATE student SET name = ?, gender = ?, nisn = ?, class_id = ? WHERE id = ?;`,
      [name, gender, nisn, classId, id]
    );
    console.log(`Student ID ${id} updated successfully`);
    return true;
  } catch (error) {
    console.error("Error updating student:", error);
    return false;
  }
};

// DELETE: Hapus Siswa
export const deleteStudent = async (id: number): Promise<boolean> => {
  try {
    const db: any = await setupDatabase();
    await db.execAsync("DELETE FROM student WHERE id = ?;", [id]);
    console.log(`Student ID ${id} deleted`);
    return true;
  } catch (error) {
    console.error("Error deleting student:", error);
    return false;
  }
};
