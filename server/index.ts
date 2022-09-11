import { DarukServer } from "daruk";
import "./hello";

const appServer = DarukServer();
appServer.binding();

(global as any).darukApp = appServer;
export default appServer.app.callback();