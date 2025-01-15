import { Hono } from 'hono';
import { handle } from 'hono/aws-lambda'

const app = new Hono()

app.get('/', (c) => {
  const query = c.req.query()
  return c.json({
    message: 'root',
    query: query,
  })
})

app.get('/hoge', (c) => {
  return c.json({
    message: 'hoge',
  })
})

app.get('/foo/:bar', (c) => {
  const bar = c.req.param('bar')
  return c.json({
    message: '/foo/:bar',
    bar: bar,
  })
})

export const lambdaHandler = handle(app)

