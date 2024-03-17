import fs from "node:fs/promises";

const databasepath = new URL("./db.json", import.meta.url);

export class Database {
  #database = {};

  constructor() {
    fs.readFile(databasepath, "utf-8")
      .then((data) => {
        this.#database = JSON.parse(data);
      })
      .catch(() => {
        this.#persist();
      });
  }

  #persist() {
    fs.writeFile(databasepath, JSON.stringify(this.#database));
  }

  select(table) {
    fs.readFile(databasepath, "utf-8")
      .then((data) => {
        this.#database = JSON.parse(data);
      })
      .catch(() => {
        this.#persist();
      });

    return JSON.stringify(this.#database[table]);
  }

  insert(table, data) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data);
      this.#persist();
      return;
    }

    this.#database[table] = [data];
  }

  update(table, id, data, updated_at) {
    const rowIndex = this.#database[table].findIndex((row) => row.id === id);
    if (!data) {
      return false;
    }

    if (!data.title && !data.description) {
      return false;
    }

    if (rowIndex > -1) {
      this.#database[table][rowIndex] = {
        ...this.#database[table][rowIndex],
        id,
        ...data,
        updated_at: updated_at,
      };
      this.#persist();
      return true;
    }
  }

  delete(table, id){
    let rowIndex = this.#database[table].findIndex(row => row.id === id)

    if(rowIndex > -1){
      this.#database[table].splice(rowIndex, 1)
      this.#persist

      return true
    }

    return false
  }
}
