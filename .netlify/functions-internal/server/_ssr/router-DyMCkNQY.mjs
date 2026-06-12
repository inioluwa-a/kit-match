import { r as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-DnP9uI9u.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as useCamp } from "./camp-store-Cv1vmAWP.mjs";
import { a as createRouter, c as createFileRoute, f as useRouter, l as createRootRouteWithContext, n as Scripts, o as Outlet, r as HeadContent, s as lazyRouteComponent, u as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { f as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { t as Route$3 } from "./find-C0V-akf8.mjs";
import { n as toast, t as Toaster } from "../_libs/sonner.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { r as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-DyMCkNQY.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-DdJrjUzn.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
}
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
function useMatchNotifications() {
	const { camp } = useCamp();
	(0, import_react.useEffect)(() => {
		if (!camp) return;
		const channel = supabase.channel("public:swap_requests").on("postgres_changes", {
			event: "INSERT",
			schema: "public",
			table: "swap_requests",
			filter: `camp=eq.${camp}`
		}, async (payload) => {
			const newListing = payload.new;
			if (newListing.status !== "available") return;
			const rawTokens = localStorage.getItem("kitmatch:owner_tokens");
			if (!rawTokens) return;
			const ownerTokens = JSON.parse(rawTokens);
			const listingIds = Object.keys(ownerTokens);
			if (listingIds.length === 0) return;
			const { data: myListings } = await supabase.from("swap_requests").select("item, have_size, need_size").in("id", listingIds).eq("status", "available");
			if (!myListings) return;
			if (myListings.some((my) => my.item === newListing.item && my.have_size === newListing.need_size && my.need_size === newListing.have_size)) {
				if (Notification.permission === "granted") new Notification("Match Found! 🚀", {
					body: `Someone just posted a ${newListing.item} (Size ${newListing.have_size}) in ${camp}!`,
					icon: "/favicon.ico"
				});
				toast.success("Match Found! 🚀", {
					description: `Someone just posted a ${newListing.item} that matches your request!`,
					duration: 1e4
				});
			}
		}).subscribe();
		return () => {
			supabase.removeChannel(channel);
		};
	}, [camp]);
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$2 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "KitMatch | NYSC Kit Swap" },
			{
				name: "description",
				content: "Wrong NYSC kit size? Find matching corps members in your camp and swap through WhatsApp. No sign up required."
			},
			{
				name: "author",
				content: "Lovable"
			},
			{
				property: "og:title",
				content: "KitMatch | NYSC Kit Swap"
			},
			{
				property: "og:description",
				content: "Wrong NYSC kit size? Find matching corps members in your camp and swap through WhatsApp. No sign up required."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary"
			},
			{
				name: "twitter:site",
				content: "@Lovable"
			},
			{
				name: "twitter:title",
				content: "KitMatch | NYSC Kit Swap"
			},
			{
				name: "twitter:description",
				content: "Wrong NYSC kit size? Find matching corps members in your camp and swap through WhatsApp. No sign up required."
			},
			{
				property: "og:image",
				content: "https://storage.googleapis.com/gpt-engineer-file-uploads/O9QchBxxRAMvFti9DxNpOSg8yBD2/social-images/social-1781179081991-KitMatch.webp"
			},
			{
				name: "twitter:image",
				content: "https://storage.googleapis.com/gpt-engineer-file-uploads/O9QchBxxRAMvFti9DxNpOSg8yBD2/social-images/social-1781179081991-KitMatch.webp"
			}
		],
		links: [{
			rel: "stylesheet",
			href: styles_default
		}]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$2.useRouteContext();
	useMatchNotifications();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(QueryClientProvider, {
		client: queryClient,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {
			richColors: true,
			position: "top-center"
		})]
	});
}
var $$splitComponentImporter$1 = () => import("./post-D07aKWAJ.mjs");
var Route$1 = createFileRoute("/post")({
	head: () => ({ meta: [{ title: "Post a Swap — KitMatch" }, {
		name: "description",
		content: "Post your NYSC kit swap request in under a minute."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./routes-ChtSSI00.mjs");
var Route = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "KitMatch — Swap NYSC kit sizes in your camp" },
		{
			name: "description",
			content: "Free notice board for NYSC corps members to exchange incorrectly sized kits during orientation camp."
		},
		{
			property: "og:title",
			content: "KitMatch — Swap NYSC kit sizes"
		},
		{
			property: "og:description",
			content: "Find corps members in your camp to swap NYSC kit sizes. Free to use."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var PostRoute = Route$1.update({
	id: "/post",
	path: "/post",
	getParentRoute: () => Route$2
});
var FindRoute = Route$3.update({
	id: "/find",
	path: "/find",
	getParentRoute: () => Route$2
});
var rootRouteChildren = {
	IndexRoute: Route.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$2
	}),
	FindRoute,
	PostRoute
};
var routeTree = Route$2._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
