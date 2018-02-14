import { NestFactory } from '@nestjs/core';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import { ApplicationModule } from './app/app.module';

function addMiddleware(instance): void {
  instance.use(bodyParser.json());
  instance.use(cors());
}

function setUpExpress(): any {
  const instance = express();
  // connectToMongo();
  addMiddleware(instance);
  return instance;
}

/**
 * @param port {number} The port number to open for server.
 * @returns {Promise<void>}
 */
export async function bootstrap(port) {
  const app = await NestFactory.create(ApplicationModule, setUpExpress());
  return await app.listen(port);
}
