import fs from 'node:fs/promises'
import { rawListeners } from 'node:process'

const databasepath = new URL('./db.json', import.meta.url)

export class Database {
  #database = {}

  constructor(){
    try{
      fs.readFile(databasepath, 'utf-8').then(data => {
        this.#database = JSON.parse(data)
      })
    }catch{
      this.#database = {}
    }
  }

  #persist(){
    fs.writeFile(databasepath, JSON.stringify(this.#database))
  }
}