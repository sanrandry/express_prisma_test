import { PrismaClient } from "@prisma/client";
import express from "express";

const app = express();

app.use(express.json());

const port = 3000

const prisma = new PrismaClient

app.get('/', async (req, res) => {
  res.send('test!')
})

// Users endpoint
app.get('/user', async (req, res) => {
  const users = await prisma.user.findMany()
  res.send(users)
})

app.get('/user/:id', async (req, res) => {
  const {id} = req.params
  const user = await prisma.user.findUnique({
    where: {
      id : Number(id)
    },
    include: {post: true}
  })
  res.send(user)
})

app.post('/user', async (req, res) => {
  let {username, password} = req.body
  let user = await prisma.user.create({
    data: {
      username: username,
      password: password
    }
  })
  res.send(user)
})

app.patch('/user/:id', async (req, res) => {
  const {id} = req.params
  const {username, password} = req.body
  const user = await prisma.user.update(
    {
      where: {
        id: Number(id)
      },
      data: {
        username: username,
        password: password
      }
    }
  )
  res.send(user)
})

app.delete('/user/:id', async (req, res) => {
  const {id} = req.params
  const user = await prisma.user.delete({
    where: {
      id: Number(id)
    }
  })
  res.send(user)
})


// Post endpoint
app.get('/post', async (req, res) => {
  const posts = await prisma.post.findMany({
    include: {
      author: true
    }
  })
  res.send(posts)
})

app.get('/post/:id', async (req, res) => {
  const {id} = req.params
  const user = await prisma.post.findUnique({
    where: {
      id : Number(id)
    },
    include: {author: true}
  })
  res.send(user)
})

app.post('/post', async (req, res) => {
  let {title, content, author_id} = req.body
  let post = await prisma.post.create({
    data: {
      title: title,
      content: content,
      authorId: author_id
    }
  })
  res.send(post)
})

app.patch('/post/:id', async (req, res) => {
  const {id} = req.params
  const {title, content} = req.body
  const post = await prisma.post.update(
    {
      where: {
        id: Number(id)
      },
      data: {
        title: title,
        content: content
      }
    }
  )
  res.send(post)
})

app.delete('/post/:id', async (req, res) => {
  const {id} = req.params
  const post = await prisma.post.delete({
    where: {
      id: Number(id)
    }
  })
  res.send(post)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})