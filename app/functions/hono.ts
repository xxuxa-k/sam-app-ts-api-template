import { Hono } from 'hono';
import { handle } from 'hono/aws-lambda'

const app = new Hono()

app.get('/', (c) => {
  return c.json({ message: 'Hello, World!' })
})

export const lambdaHandler = handle(app)

