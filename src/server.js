import http from "node:http"
import { routes } from "./routes"

const server = http.createServer(async (req, res) => {
  const {method, url} = req
})

server.listen(4000)