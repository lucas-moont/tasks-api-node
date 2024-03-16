export const routes = [
  {
    method: "GET",
    path: "/tasks/",
    handler: (req, res) => {
      return res.end('Estou aqui')
    }
  },
  {
    method: "POST", 
    path: "/tasks/",
    handler: (req, res) => {
      return res.end('Estou no post')
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