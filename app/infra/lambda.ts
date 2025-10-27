const secret = new sst.Secret('RESEND_API_KEY');

export const lambda = new sst.aws.Function('Email', {
  handler: 'app/packages/email/src/index.handler',
  link: [secret],
  url: true,
});
