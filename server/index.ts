import { DarukServer } from "daruk";
import "./hello";

const appServer = DarukServer();
appServer.binding();
export async function getAppServer() {
  try {
    if (!appServer.app.middleware.length) await appServer.binding();
  } catch (err) {
    //nodemon 可能会导致重复执行该逻辑，导致 defineProperty 重复执行
  }
  return appServer;
}
export default appServer.app.callback();