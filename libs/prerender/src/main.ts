/** == ∆ + ENTRY POINT + ∆ == */
import { logo } from './logo';
import { bootstrap } from './server';
import { SERVER_PORT } from './server-port';


bootstrap(SERVER_PORT).then(() => console.log(logo(SERVER_PORT)));
