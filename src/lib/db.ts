import Database from "better-sqlite3";
import { mkdirSync } from "fs";
import { dirname } from "path";

const DB_PATH = process.env.DB_PATH ?? "./data/aquarium.db";

let db: Database.Database | null = null;

export function getDb() {
  if (db) return db;
  mkdirSync(dirname(DB_PATH), { recursive: true });
  db = new Database(DB_PATH);
  db.pragma("journal_mode = WAL");
  init(db);
  return db;
}

function init(d: Database.Database) {
  d.exec(`
    CREATE TABLE IF NOT EXISTS fish (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      color TEXT NOT NULL,
      x REAL NOT NULL,
      y REAL NOT NULL,
      z REAL NOT NULL,
      speed REAL NOT NULL DEFAULT 1.0,
      created_at INTEGER NOT NULL DEFAULT (strftime('%s','now'))
    );
    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    );
  `);

  const count = d.prepare("SELECT COUNT(*) as c FROM fish").get() as { c: number };
  if (count.c === 0) {
    const insert = d.prepare(
      "INSERT INTO fish (name, color, x, y, z, speed) VALUES (?, ?, ?, ?, ?, ?)"
    );
    const seed: [string, string, number, number, number, number][] = [
      ["Bubbles", "#ff8c42", -2, 0.5, 0, 1.0],
      ["Coral", "#ff5e7a", 1.5, -0.3, 1, 0.8],
      ["Finn", "#5ecbff", 0, 1.2, -1, 1.3],
      ["Pebble", "#a8e6cf", 2.2, -0.8, 0.5, 0.7],
    ];
    for (const f of seed) insert.run(...f);
  }
}

export type Fish = {
  id: number;
  name: string;
  color: string;
  x: number;
  y: number;
  z: number;
  speed: number;
};

export function listFish(): Fish[] {
  return getDb().prepare("SELECT * FROM fish ORDER BY id").all() as Fish[];
}
