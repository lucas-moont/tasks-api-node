import {randomUUID} from 'node:crypto'
import { Database } from './database.js'
const timeElapsed = Date.now()
const today = new Date(timeElapsed)

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
       
        let task = {
          id: randomUUID(),
          title,
          description,
          created_at: today.toLocaleString(),
          updated_at: '',
          completed_at: ''
        }
        
  
        database.insert('tasks', task)
        res.end('Task criada com sucesso')
        return
      } 
      /*
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