import { Hono } from 'hono';
import { handle } from 'hono/aws-lambda'

const app = new Hono()

app.get('/', (c) => {
  const query = c.req.query()
  return c.json({
    query: query,
    message: 'Hello, World!'
  })
})

export const lambdaHandler = handle(app)

