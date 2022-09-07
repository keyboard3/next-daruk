import { DarukServer } from "daruk";
import "./hello";

const myapp = DarukServer();
myapp.binding();
export default myapp.app.callback();