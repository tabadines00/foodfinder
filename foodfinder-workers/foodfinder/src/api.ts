import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { Bindings } from './bindings'
import * as model from './model'
import * as xataModel from "./xatamodel.ts"

/*
Hono Notes
- model handles functions that return objects
- api (controller) layer handles making Response objects


*/

const api = new Hono<{ Bindings: Bindings }>()
api.use('*', cors())

api.get('/users', async (c) => {
    const db_url = c.env.DB_URL
    const db_key = c.env.DB_KEY
    const res = await xataModel.getUsers(db_url, db_key)
    return c.json(res)
})

api.get('/user/:id', async (c) => {
    const id = c.req.param('id')
    const db_url = c.env.DB_URL
    const db_key = c.env.DB_KEY
    
    const res = await xataModel.getUser(db_url, db_key, id)
    return c.json(res)
})

api.post('/signup', async (c) => {
    const db_url = c.env.DB_URL
    const db_key = c.env.DB_KEY

    const body = await c.req.json()
    console.log(body)
    
    const res = await xataModel.createUser(db_url, db_key, body["user"])
    return c.json(res)
})

api.post('/login', async (c) => {
    const db_url = c.env.DB_URL
    const db_key = c.env.DB_KEY

    const body = await c.req.json()
    console.log(body)
    
    const res = await xataModel.createUser(db_url, db_key, body["user"])
    return c.json(res)
})

api.get('/locallist', async (c) => {
    const yelpApiKey = c.env.YELP_API_KEY
    const { latitude, longitude } = c.req.query()
    const locallist = await model.fetchYelpData(latitude, longitude, yelpApiKey)
    return await c.json(ocallist.json())
})

api.get('/posts', async (c) => {
  const posts = await model.getPosts(c.env.BLOG_EXAMPLE)
  return c.json({ posts: posts, ok: true })
})

api.post('/posts', async (c) => {
  const param = await c.req.json()
  const newPost = await model.createPost(c.env.BLOG_EXAMPLE, param as model.Param)
  if (!newPost) {
    return c.json({ error: 'Can not create new post', ok: false }, 422)
  }
  return c.json({ post: newPost, ok: true }, 201)
})

api.get('/posts/:id', async (c) => {
  const id = c.req.param('id')
  const post = await model.getPost(c.env.BLOG_EXAMPLE, id)
  if (!post) {
    return c.json({ error: 'Not Found', ok: false }, 404)
  }
  return c.json({ post: post, ok: true })
})

api.put('/posts/:id', async (c) => {
  const id = c.req.param('id')
  const post = await model.getPost(c.env.BLOG_EXAMPLE, id)
  if (!post) {
    // 204 No Content
    return new Response(null, { status: 204 })
  }
  const param = await c.req.json()
  const success = await model.updatePost(c.env.BLOG_EXAMPLE, id, param as model.Param)
  return c.json({ ok: success })
})

api.delete('/posts/:id', async (c) => {
  const id = c.req.param('id')
  const post = await model.getPost(c.env.BLOG_EXAMPLE, id)
  if (!post) {
    // 204 No Content
    return new Response(null, { status: 204 })
  }
  const success = await model.deletePost(c.env.BLOG_EXAMPLE, id)
  return c.json({ ok: success })
})

export default api
