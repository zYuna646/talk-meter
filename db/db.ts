import * as SQLite from 'expo-sqlite';
import * as FileSystem from 'expo-file-system';

const dbPath = `${FileSystem.documentDirectory}database.db`;

const setupDatabase = async () => {
  try {
    const db = await SQLite.openDatabaseAsync(dbPath); 
    const fileInfo = await FileSystem.getInfoAsync(dbPath);
    console.log('db file info:', fileInfo);
    
    await db.runAsync('PRAGMA foreign_keys = ON;');

    const tableInfo = await db.getAllAsync("PRAGMA table_info(class);");
    console.log("Class table schema:", tableInfo);

    if (!tableInfo || tableInfo.length === 0) {
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

    return db;
  } catch (error) {
    console.error("Error setting up database:", error);
    return null;
  }
};

export default setupDatabase;
