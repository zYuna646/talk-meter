import * as SQLite from 'expo-sqlite';
import * as FileSystem from 'expo-file-system';

const dbPath = `${FileSystem.documentDirectory}database.db`;

const setupDatabase = async () => {
  try {
    const db = await SQLite.openDatabaseAsync(dbPath);
    const fileInfo = await FileSystem.getInfoAsync(dbPath);
    console.log('db file info:', fileInfo);
    
    await db.runAsync('PRAGMA foreign_keys = ON;');

    const classTableInfo = await db.getAllAsync("PRAGMA table_info(class);");
    console.log("Class table schema:", classTableInfo);

    if (!classTableInfo || classTableInfo.length === 0) {
      console.log("Table 'class' does not exist, creating...");
      await db.runAsync(
        `CREATE TABLE IF NOT EXISTS class (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL UNIQUE
        );`
      );
      console.log("Table 'class' created successfully");
    } else {
      console.log("Table 'class' already exists");
    }

    const studentTableInfo = await db.getAllAsync("PRAGMA table_info(student);");
    console.log("Student table schema:", studentTableInfo);

    if (!studentTableInfo || studentTableInfo.length === 0) {
      console.log("Table 'student' does not exist, creating...");
      await db.runAsync(
        `CREATE TABLE IF NOT EXISTS student (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          gender TEXT NOT NULL,
          nisn TEXT UNIQUE,
          class_id INTEGER,
          FOREIGN KEY (class_id) REFERENCES class(id) ON DELETE CASCADE
        );`
      );
      console.log("Table 'student' created successfully");
    } else {
      console.log("Table 'student' already exists");
    }

    return db;
  } catch (error) {
    console.error("Error setting up database:", error);
    return null;
  }
};

export default setupDatabase;
