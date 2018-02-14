import { argv } from 'yargs';

const YARGS_PORT = argv.port;
const DEFAULT_PORT = 3000;
export const SERVER_PORT: number = YARGS_PORT || DEFAULT_PORT;
