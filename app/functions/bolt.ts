import { App, AwsLambdaReceiver } from '@slack/bolt'

const awsLambdaReceiver = new AwsLambdaReceiver({
  signingSecret: process.env.SLACK_SIGNING_SECRET!,
});

const app = new App({
  token: process.env.SLACK_BOT_TOKEN!,
  receiver: awsLambdaReceiver,
})

app.message('hello', async ({ message, say }) => {
  await say({
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `Hey there <@${message.user}>!`,
        },
        accessory: {
          type: 'button',
          text: {
            type: 'plain_text',
            text: 'Click Me',
          },
          action_id: 'button_click',
        },
      },
    ],
    text: `Hey there <@${message.user}>!`,
  });
});

app.action('button_click', async ({ body, ack, say }) => {
  await ack();

  await say(`<@${body.user.id}> clicked the button`);
});

app.message('goodbye', async ({ message, say }) => {
  await say(`See ya later, <@${message.user}> :wave:`);
});

export const lambdaHandler = async(event, context, callback) => {
  const handler = await awsLambdaReceiver.start();
  return handler(event, context, callback);
}
