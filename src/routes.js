import {randomUUID} from 'node:crypto'
import { Database } from './database.js'

const database = new Database()

export const routes = [
  {
    method: "GET",
    path: "/tasks",
    handler: (req, res) => {
      return res.end('Estou aqui')
    }
  },
  {
    method: "POST", 
    path: "/tasks",
    handler: (req, res) => {
      if(req.body.title && req.body.description){
        const {title, description} = req.body
        console.log(title)
        res.end('Task criada com sucesso')
        return
      } 
      /*
      RODAR O IMPORT-CSV PARA TESTAR E TESTAR O RESTO AMANHÃ COM INSOMNIA
      let task = {
        id: randomUUID(),
        title,
        description,
        created_at: 'INSERIR AQUI FUNÇÃO QUE PEGA A DATA ATUAL',
        updated_at: '',
        completed_at: ''
      }
      

      database.insert('tasks', task)
      return res.writeHead(201).end()
      */

    }
  },
  {
    method: "PUT",
    path: "/tasks/:id",
    handler: (req, res) => {
      return res.end("Estou no put")
    }
  },
  {
    method: "DELETE",
    path: "/tasks/:id",
    handler: (req, res) => {
      return res.end('Estou no delete')
    }
  },
  {
    method: "PATCH",
    path: "/tasks/:id/complete",
    handler: (req, res) => {
      return res.end('Estou no PATCH.')
    }
  }
]