import http from "node:http"
import { routes } from "./routes.js"
import { json } from "./middlewares/json.js"

const server = http.createServer(async (req, res) => {
  const {method, url} = req
  await json(req, res)
  const route = routes.find(route => {
    return route.method === method && route.path.test(url)
  })

  if(route){
    const routeParams = req.url.match(route.path)

    const { query, ...params } = routeParams.groups

    req.params = params
    req.query = query ? extractQueryParams(query) : {}

    route.handler(req, res)
  }else{
    res.writeHead(404)
  }
})

server.listen(4000)