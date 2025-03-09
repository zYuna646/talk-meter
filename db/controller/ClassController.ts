import { Class } from "@/constants/Interface";
import setupDatabase from "../db";

// Tipe data untuk Class


// CREATE: Tambah Kelas Baru
export const addClass = async (name: string): Promise<boolean> => {
  try {
    if (!name || name.trim() === "")
      throw new Error("Class name cannot be empty");

    const db: any = await setupDatabase();
    await db.runAsync(`INSERT INTO class (name) VALUES (?);`, [name]);
    console.log(`Class '${name}' added successfully`);
    return true;
  } catch (error: any) {
    console.error("Error adding class:", error.message || error);
    return false;
  }
};

// READ: Ambil Semua Kelas
export const getClasses = async (): Promise<Class[]> => {
  try {
    const db: any = await setupDatabase();
    const result = await db.getAllAsync("SELECT * FROM class;");

    console.log("Fetched Classes:", result);

    return result as Class[];
  } catch (error) {
    console.error("Error fetching classes:", error);
    return [];
  }
};

export const getClassById = async (id: number): Promise<Class | null> => {
  try {
    const db: any = await setupDatabase();
    const result = await db.getFirstAsync("SELECT * FROM class WHERE id = ?;", [
      id,
    ]);

    console.log(`Fetched Class ID ${id}:`, result);

    return result as Class | null;
  } catch (error) {
    console.error(`Error fetching class with ID ${id}:`, error);
    return null;
  }
};

// UPDATE: Ubah Nama Kelas
export const updateClass = async (
  id: number,
  newName: string
): Promise<boolean> => {
  try {
    const db: any = await setupDatabase();
    await db.execAsync(`UPDATE class SET name = ? WHERE id = ?;`, [
      newName,
      id,
    ]);
    console.log(`Class ID ${id} updated to '${newName}'`);
    return true;
  } catch (error) {
    console.error("Error updating class:", error);
    return false;
  }
};

// DELETE: Hapus Kelas
export const deleteClass = async (id: number): Promise<boolean> => {
  try {
    const db: any = await setupDatabase();
    await db.runAsync(`DELETE FROM class WHERE id = ?;`, [id]);
    console.log(`Class ID ${id} deleted`);
    return true;
  } catch (error) {
    console.error("Error deleting class:", error);
    return false;
  }
};
