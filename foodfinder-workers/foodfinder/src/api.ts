import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { Bindings } from './bindings'
import * as model from './model'
import * as xataModel from "./xatamodel"

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

    console.log(db_url, db_key)

    const body = await c.req.json()
    console.log(body)
    
    const res = await xataModel.createUser(db_url, db_key, body.user)
    return c.json(res)
})

api.get("/signup", (c) => {
    return c.json({ message: "You are on the latest version, 7/26"})
})

api.post('/login', async (c) => {
    const db_url = c.env.DB_URL
    const db_key = c.env.DB_KEY

    const body = await c.req.json()
    console.log(body)
    try {
      const res = await xataModel.createUser(db_url, db_key, body["user"])
      return c.json(res)
    } catch (error) {
      return c.json({ error: 'Unable to create user', ok: false }, 500)
    }    
})

api.get('/locallist', async (c) => {
    const yelpApiKey = c.env.YELP_API_KEY
    const { latitude, longitude } = c.req.query()
    const locallist = await model.fetchYelpData(latitude, longitude, yelpApiKey)
    return await c.json(locallist)
})

export default api
