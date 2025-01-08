import {
  Context,
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from 'aws-lambda'
import { UserSchema } from '../types'

export const lambdaHanlder = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  console.log(JSON.stringify({
    requestId: context.awsRequestId,
    functionName: context.functionName,
  }))

  const allowedHttpMethods = ['GET', 'POST']

  if (!allowedHttpMethods.includes(event.httpMethod)) {
    return {
      statusCode: 405,
      body: JSON.stringify({
        message: 'Method Not Allowed',
      })
    }
  }

  if (event.httpMethod === 'GET') {
    const query = event.queryStringParameters
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Hello World!',
        query,
      }),
    }
  }
  if (event.httpMethod === 'POST') {
    const rawBody = JSON.parse(event.body ?? '{}')
    const user = UserSchema.parse(rawBody)

    const { name, age, email } = user

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'User validated successfully',
        name,
        age,
        email: email ?? "no email provided",
      }),
    }
  }

  return {
    statusCode: 500,
    body: JSON.stringify({
      message: 'Internal Server Error',
    }),
  }
}
