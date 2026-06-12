import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "./@floating-ui/react-dom+[...].mjs";
import { f as require_jsx_runtime } from "./@radix-ui/react-arrow+[...].mjs";
//#region node_modules/@radix-ui/react-direction/dist/index.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
require_jsx_runtime();
var DirectionContext$1 = import_react.createContext(void 0);
function useDirection$1(localDir) {
	const globalDir = import_react.useContext(DirectionContext$1);
	return localDir || globalDir || "ltr";
}
//#endregion
//#region node_modules/@radix-ui/react-menu/node_modules/@radix-ui/react-direction/dist/index.mjs
var DirectionContext = import_react.createContext(void 0);
function useDirection(localDir) {
	const globalDir = import_react.useContext(DirectionContext);
	return localDir || globalDir || "ltr";
}
//#endregion
export { useDirection$1 as n, useDirection as t };
