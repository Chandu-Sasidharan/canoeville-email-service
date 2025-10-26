const secret = new sst.Secret('RESEND_API_KEY');

export const api = new sst.aws.ApiGatewayV2('Api', {
  link: [secret],
});

api.route('POST /', 'app/packages/email/src/index.handler');
