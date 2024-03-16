import fs from 'node:fs/promises'

const databasepath = new URL('./db.json', import.meta.url)

export class Database {
  #database = {}

  constructor(){
    fs.readFile(databasepath, 'utf-8').then(data => {
      this.#database = JSON.parse(data)
    })
    .catch(() => {
      this.#persist()
    })
  }

  #persist(){
    fs.writeFile(databasepath, JSON.stringify(this.#database))
  }

  select(table){
    return JSON.stringify(this.#database[table])
  }

  insert(table, data){
    if(Array.isArray(this.#database[table])){
      this.#database[table].push(data)
      console.log(this.#database)    
      this.#persist()
      return 
    }

    this.#database[table] = [data]
  }
}