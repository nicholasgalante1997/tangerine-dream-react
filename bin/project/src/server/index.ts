import { createServer } from 'http';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { inspectReq } from './middleware';

const expressServer = express();
const coreRouter = express.Router();

const staticAssetsPath = path.resolve(process.cwd(), 'build', 'static');

coreRouter.use(express.static(staticAssetsPath));
coreRouter.use(express.json({ type: 'application/json'}));
coreRouter.use(cors())
coreRouter.use(inspectReq({ disabled: false }))

expressServer.use('/', coreRouter);

export const server = createServer(expressServer);

