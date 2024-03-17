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
        updated_at,
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

  complete(table, id, completed_at){
    let rowIndex = this.#database[table].findIndex(row => row.id === id)
    
    if(rowIndex > -1){
      if(this.#database[table][rowIndex].completed_at === ''){
        this.#database[table][rowIndex].completed_at = completed_at
        return {
          error: false,
          message: 'Task concluída com sucesso'
        }
      }else{
        return {
          error: true,
          message: 'Task já foi concluída'
        }     
      }
    }else{
      return {
        error: true,
        message: 'Task não existe'
      }
    }
  }
}
