import { Hono } from 'hono';
import { handle } from 'hono/aws-lambda'

const app = new Hono()

app.get('/', (c) => {
  const query = c.req.query()
  return c.json({
    route: 'root',
    query: query,
  })
})

app.get('/hoge', (c) => {
  return c.json({
    route: '/hoge',
  })
})

app.get('/foo/:bar', (c) => {
  const bar = c.req.param('bar')
  return c.json({
    route: '/foo/:bar',
    bar: bar,
  })
})

export const lambdaHandler = handle(app)

