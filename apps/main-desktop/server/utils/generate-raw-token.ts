import crypto from 'crypto';
import type { H3Event } from 'h3';

type TokenResponse = {
  token: string;
  timeStamp: number;
};

export default function (
  event: H3Event,
  path: string,
  secret: string,
  isNullStringified?: boolean
): TokenResponse {
  const ts = Math.floor(Date.now() / 1000);
  const nullStr = isNullStringified ? 'null' : '';
  let rawRequest = `${getMethod(event)}\n${nullStr}\n${ts}\n${path}`;
  rawRequest = crypto
    .createHmac('sha512', secret)
    .update(rawRequest)
    .digest('base64');
  rawRequest = Buffer.from(`web:${rawRequest}`).toString('utf8');
  rawRequest = Buffer.from(rawRequest).toString('base64');

  return {
    token: rawRequest,
    timeStamp: ts,
  };
}
