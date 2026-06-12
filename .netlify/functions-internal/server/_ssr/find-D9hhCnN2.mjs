import { c as createFileRoute, s as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as objectType, r as stringType, t as booleanType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/find-D9hhCnN2.js
var $$splitComponentImporter = () => import("./find-9C_N14qs.mjs");
var findSearchSchema = objectType({
	item: stringType().optional().catch("all"),
	size: stringType().optional().catch("all"),
	perfect: booleanType().optional().catch(false),
	camp: stringType().optional()
});
var Route = createFileRoute("/find")({
	validateSearch: (search) => findSearchSchema.parse(search),
	head: () => ({ meta: [{ title: "Find Matches — KitMatch" }, {
		name: "description",
		content: "Browse kit swap listings from corps members in your camp."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
