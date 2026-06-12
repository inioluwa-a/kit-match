import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/camp-store-Cv1vmAWP.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var KEY = "kitmatch:camp";
function getCamp() {
	if (typeof window === "undefined") return null;
	return window.localStorage.getItem(KEY);
}
function setCamp(camp) {
	window.localStorage.setItem(KEY, camp);
	window.dispatchEvent(new Event("kitmatch:camp-changed"));
}
function clearCamp() {
	window.localStorage.removeItem(KEY);
	window.dispatchEvent(new Event("kitmatch:camp-changed"));
}
function useCamp() {
	const [camp, set] = (0, import_react.useState)(null);
	const [ready, setReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		set(getCamp());
		setReady(true);
		const sync = () => set(getCamp());
		window.addEventListener("kitmatch:camp-changed", sync);
		window.addEventListener("storage", sync);
		return () => {
			window.removeEventListener("kitmatch:camp-changed", sync);
			window.removeEventListener("storage", sync);
		};
	}, []);
	return {
		camp,
		ready,
		setCamp,
		clearCamp
	};
}
//#endregion
export { useCamp as n, setCamp as t };
