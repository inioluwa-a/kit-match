import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as useCamp, t as setCamp } from "./camp-store-Cv1vmAWP.mjs";
import { d as useNavigate, u as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { f as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { S as Check, _ as CirclePlus, c as Search, o as Share2, u as MapPin, w as Boxes } from "../_libs/lucide-react.mjs";
import { c as Select, d as SelectTrigger, f as SelectValue, h as shareApp, i as GENERIC_SHARE_TEXT, l as SelectContent, n as CAMPS, r as Footer, t as Button, u as SelectItem } from "./footer-CzaR6acm.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-zAEy80Pz.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Index() {
	const { camp, ready } = useCamp();
	const navigate = useNavigate();
	const [pending, setPending] = (0, import_react.useState)("");
	if (!ready) return null;
	if (!camp) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "min-h-screen bg-background flex flex-col items-center justify-center px-5 py-10",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-md",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-center text-center mb-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "size-14 rounded-2xl bg-primary text-primary-foreground grid place-items-center mb-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Boxes, { className: "size-7" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-3xl font-bold tracking-tight",
							children: "KitMatch"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-muted-foreground",
							children: "Find corps members in your camp to swap NYSC kit sizes. Free to use."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border bg-card p-5 shadow-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex items-center gap-2 text-sm font-medium mb-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-4 text-primary" }), " Select your NYSC camp"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: pending,
							onValueChange: setPending,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								className: "h-12 rounded-xl",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Choose your camp" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
								className: "max-h-80",
								children: CAMPS.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: c,
									children: c
								}, c))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							disabled: !pending,
							onClick: () => setCamp(pending),
							className: "mt-4 w-full h-12 rounded-xl text-base",
							children: "Continue"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-xs text-muted-foreground text-center",
							children: "You'll only see listings from your camp. No accounts needed."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
			]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "min-h-screen bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
			className: "border-b bg-card/50 backdrop-blur sticky top-0 z-10",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-md mx-auto px-5 py-3 flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "size-8 rounded-lg bg-primary text-primary-foreground grid place-items-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Boxes, { className: "size-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-semibold",
						children: "KitMatch"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => shareApp(GENERIC_SHARE_TEXT),
						className: "text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1",
						"aria-label": "Share KitMatch",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "size-3" }), " Share"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => {
							localStorage.removeItem("kitmatch:camp");
							window.dispatchEvent(new Event("kitmatch:camp-changed"));
						},
						className: "text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-3" }), " Change camp"]
					})]
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md mx-auto px-5 py-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground p-7 shadow-lg",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-medium mb-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3" }),
								" ",
								camp
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-3xl font-bold tracking-tight",
							children: "KitMatch"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-primary-foreground/90 text-sm leading-relaxed",
							children: "Find corps members in your camp to swap NYSC kit sizes. Free to use."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 grid gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						className: "h-14 rounded-2xl text-base shadow-sm",
						onClick: () => navigate({ to: "/post" }),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/post",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CirclePlus, { className: "size-5" }), " Post a Swap"]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "secondary",
						className: "h-14 rounded-2xl text-base border",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/find",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-5" }), " Find Matches"]
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
					className: "mt-8 space-y-3 text-sm text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "size-6 shrink-0 rounded-full bg-secondary text-secondary-foreground grid place-items-center text-xs font-semibold",
								children: "1"
							}), "Post what you have and what size you need."]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "size-6 shrink-0 rounded-full bg-secondary text-secondary-foreground grid place-items-center text-xs font-semibold",
								children: "2"
							}), "Browse listings from corps members in your camp."]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "size-6 shrink-0 rounded-full bg-secondary text-secondary-foreground grid place-items-center text-xs font-semibold",
								children: "3"
							}), "Chat on WhatsApp and meet up to swap."]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
			]
		})]
	});
}
//#endregion
export { Index as component };
