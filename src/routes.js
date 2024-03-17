import {randomUUID} from 'node:crypto'
import { Database } from './database.js'
let timeElapsed = Date.now()
let today = new Date(timeElapsed)
import { buildRoutePath } from './utils/buildRoutePath.js'

const database = new Database()

export const routes = [
  {
    method: "GET",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {
      const data = database.select('tasks')
      res.end(data)
    }
  },
  {
    method: "POST", 
    path: buildRoutePath("/tasks"),
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
        res.writeHead(201).end('Task criada com sucesso')
      }
    }
  },
  {
    method: "PUT",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      let {id} = req.params
      let data = req.body

      timeElapsed = Date.now()
      today = new Date(timeElapsed)

      let updated_at = today.toLocaleString()
      
      let wasUpdated = database.update('tasks', id, data, updated_at)
      if (wasUpdated){
        return res.writeHead(204).end()
      }
      return res.writeHead(404).end('Você precisa enviar pelo menos o título ou a descrição')
    }
  },
  {
    method: "DELETE",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const {id} = req.params
      
      let exists = database.delete('tasks', id)
      if(exists){
        return res.writeHead(200).end('Deletado com sucesso')        
      }
      return res.writeHead(404).end('Task não foi encontrada')
    }
  },
  {
    method: "PATCH",
    path: buildRoutePath("/tasks/:id/complete"),
    handler: (req, res) => {
      const {id} = req.params

      timeElapsed = Date.now()
      today = new Date(timeElapsed)

      let completed_at = today.toLocaleString()

      let completedReturn = database.complete('tasks', id, completed_at)
      if(completedReturn.error){
        return res.writeHead(404).end(completedReturn.message)
      }

      return res.writeHead(200).end(completedReturn.message)
    }
  }
]