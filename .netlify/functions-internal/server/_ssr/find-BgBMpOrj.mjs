import { r as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-DnP9uI9u.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as useCamp } from "./camp-store-Cv1vmAWP.mjs";
import { d as useNavigate, u as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { f as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { n as objectType, r as stringType, t as booleanType } from "../_libs/zod.mjs";
import { t as Route } from "./find-D6wEWMgP.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { C as CheckCheck, D as ArrowLeft, E as ArrowUp, S as Check, T as Bell, a as ShieldCheck, b as ChevronRight, f as LoaderCircle, g as Circle, i as Sparkles, l as MessageCircle, m as Image, n as Trash2, o as Share2, p as Inbox, s as Send, t as X } from "../_libs/lucide-react.mjs";
import { a as Label2, c as Root2, d as SubTrigger2, f as Trigger, i as ItemIndicator2, l as Separator2, n as Content2, o as Portal2, r as Item2, s as RadioItem2, t as CheckboxItem2, u as SubContent2 } from "../_libs/@radix-ui/react-dropdown-menu+[...].mjs";
import { a as ITEMS, c as Select, d as SelectTrigger, f as SelectValue, g as shareToWhatsApp, h as shareApp, i as GENERIC_SHARE_TEXT, l as SelectContent, m as cn, r as Footer, s as SIZES_BY_ITEM, t as Button, u as SelectItem } from "./footer-CzaR6acm.mjs";
import { t as Label } from "./label-DYmjuDOL.mjs";
import { a as useQueryClient, n as useMutation, r as useQuery, t as useInfiniteQuery } from "../_libs/tanstack__react-query.mjs";
import { t as toPng } from "../_libs/html-to-image.mjs";
import { n as Thumb, t as Root } from "../_libs/radix-ui__react-switch.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/find-BgBMpOrj.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Switch = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
	className: cn("peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input", className),
	...props,
	ref,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Thumb, { className: cn("pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0") })
}));
Switch.displayName = Root.displayName;
var DropdownMenu = Root2;
var DropdownMenuTrigger = Trigger;
var DropdownMenuSubTrigger = import_react.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SubTrigger2, {
	ref,
	className: cn("flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", inset && "pl-8", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "ml-auto" })]
}));
DropdownMenuSubTrigger.displayName = SubTrigger2.displayName;
var DropdownMenuSubContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubContent2, {
	ref,
	className: cn("z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)", className),
	...props
}));
DropdownMenuSubContent.displayName = SubContent2.displayName;
var DropdownMenuContent = import_react.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal2, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	ref,
	sideOffset,
	className: cn("z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md", "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)", className),
	...props
}) }));
DropdownMenuContent.displayName = Content2.displayName;
var DropdownMenuItem = import_react.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item2, {
	ref,
	className: cn("relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0", inset && "pl-8", className),
	...props
}));
DropdownMenuItem.displayName = Item2.displayName;
var DropdownMenuCheckboxItem = import_react.forwardRef(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CheckboxItem2, {
	ref,
	className: cn("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	checked,
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemIndicator2, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" }) })
	}), children]
}));
DropdownMenuCheckboxItem.displayName = CheckboxItem2.displayName;
var DropdownMenuRadioItem = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RadioItem2, {
	ref,
	className: cn("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemIndicator2, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Circle, { className: "h-2 w-2 fill-current" }) })
	}), children]
}));
DropdownMenuRadioItem.displayName = RadioItem2.displayName;
var DropdownMenuLabel = import_react.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label2, {
	ref,
	className: cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className),
	...props
}));
DropdownMenuLabel.displayName = Label2.displayName;
var DropdownMenuSeparator = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator2, {
	ref,
	className: cn("-mx-1 my-1 h-px bg-muted", className),
	...props
}));
DropdownMenuSeparator.displayName = Separator2.displayName;
var DropdownMenuShortcut = ({ className, ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("ml-auto text-xs tracking-widest opacity-60", className),
		...props
	});
};
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";
var DISMISSED_KEY = "kitmatch:notifications-dismissed";
function NotificationPermissionBanner() {
	const [permission, setPermission] = (0, import_react.useState)("loading");
	const [dismissed, setDismissed] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setDismissed(localStorage.getItem(DISMISSED_KEY) === "true");
		if (!("Notification" in window)) {
			setPermission("denied");
			return;
		}
		setPermission(Notification.permission);
	}, []);
	const requestPermission = async () => {
		if (!("Notification" in window)) {
			toast.error("Your browser does not support notifications.");
			return;
		}
		try {
			const result = await Notification.requestPermission();
			setPermission(result);
			if (result === "granted") toast.success("Notifications enabled! We'll alert you when a match is found.");
			else if (result === "denied") toast.error("Notifications were denied. You can enable them in your browser settings.");
		} catch (error) {
			console.error("Error requesting notification permission:", error);
		}
	};
	const dismiss = () => {
		setDismissed(true);
		localStorage.setItem(DISMISSED_KEY, "true");
	};
	if (permission === "loading" || permission === "granted" || dismissed || !("Notification" in window)) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl border bg-primary/5 border-primary/20 p-4 flex items-center gap-4 relative group",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: dismiss,
				className: "absolute top-2 right-2 text-muted-foreground/50 hover:text-foreground transition-colors p-1",
				"aria-label": "Dismiss",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-3.5" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "size-10 rounded-full bg-primary/10 text-primary grid place-items-center shrink-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "size-5" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-1 min-w-0 pr-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-sm font-semibold leading-tight text-primary",
					children: "Match Alerts"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground mt-0.5",
					children: "Get notified when a perfect match is posted."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				onClick: requestPermission,
				size: "sm",
				className: "rounded-xl h-9 px-4 shrink-0",
				children: "Enable"
			})
		]
	});
}
function getOwnerToken(listingId) {
	try {
		const raw = localStorage.getItem("kitmatch:owner_tokens");
		if (!raw) return null;
		return JSON.parse(raw)[listingId] ?? null;
	} catch {
		return null;
	}
}
function clearOwnerToken(listingId) {
	try {
		const raw = localStorage.getItem("kitmatch:owner_tokens");
		if (!raw) return;
		const map = JSON.parse(raw);
		delete map[listingId];
		localStorage.setItem("kitmatch:owner_tokens", JSON.stringify(map));
	} catch {}
}
objectType({
	item: stringType().optional().catch("all"),
	size: stringType().optional().catch("all"),
	perfect: booleanType().optional().catch(false),
	camp: stringType().optional()
});
function FindPage() {
	const { camp: storedCamp, ready, setCamp } = useCamp();
	const navigate = useNavigate();
	const { item: itemFilter, size: sizeFilter, perfect: perfectOnly, camp: urlCamp } = Route.useSearch();
	const qc = useQueryClient();
	const [showScrollTop, setShowScrollTop] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const handleScroll = () => {
			setShowScrollTop(window.scrollY > 400);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);
	const camp = urlCamp || storedCamp;
	(0, import_react.useEffect)(() => {
		if (ready && !camp) navigate({ to: "/" });
		else if (ready && urlCamp && urlCamp !== storedCamp) setCamp(urlCamp);
	}, [
		ready,
		camp,
		urlCamp,
		storedCamp,
		navigate,
		setCamp
	]);
	const PAGE_SIZE = 10;
	const [totalCount, setTotalCount] = (0, import_react.useState)(null);
	const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, error: queryError } = useInfiniteQuery({
		queryKey: [
			"swap_requests",
			camp,
			itemFilter,
			sizeFilter
		],
		enabled: !!camp,
		initialPageParam: 0,
		queryFn: async ({ pageParam = 0 }) => {
			const from = pageParam * PAGE_SIZE;
			const to = from + PAGE_SIZE - 1;
			let query = supabase.from("swap_requests").select("id, camp, name, platoon, whatsapp, item, have_size, need_size, status, created_at", { count: "exact" }).eq("camp", camp).eq("status", "available");
			if (itemFilter && itemFilter !== "all") query = query.eq("item", itemFilter);
			if (sizeFilter && sizeFilter !== "all") query = query.eq("have_size", sizeFilter);
			const { data, error, count } = await query.order("created_at", { ascending: false }).range(from, to);
			if (error) {
				console.error("Supabase error:", error);
				throw error;
			}
			if (pageParam === 0 && count !== null) setTotalCount(count);
			return data;
		},
		getNextPageParam: (lastPage, allPages) => {
			return lastPage.length === PAGE_SIZE ? allPages.length : void 0;
		}
	});
	const listings = (0, import_react.useMemo)(() => data?.pages.flat() ?? [], [data]);
	const markSwapped = useMutation({
		mutationFn: async ({ id, status = "swapped" }) => {
			const token = getOwnerToken(id);
			if (!token) throw new Error("Only the original poster can manage this listing.");
			const { data, error } = await supabase.rpc("mark_swap_swapped", {
				p_id: id,
				p_token: token
			});
			if (error) {
				console.error("Supabase error:", error);
				throw error;
			}
			if (!data) throw new Error("Could not update listing.");
			clearOwnerToken(id);
		},
		onSuccess: (_, variables) => {
			toast.success(variables.status === "swapped" ? "Marked as swapped" : "Listing removed");
			qc.invalidateQueries({ queryKey: ["swap_requests", camp] });
		},
		onError: (e) => toast.error(e.message || "Couldn't update. Try again.")
	});
	const sizeOptions = (0, import_react.useMemo)(() => {
		if (!itemFilter || itemFilter === "all") return [];
		return SIZES_BY_ITEM[itemFilter] ?? [];
	}, [itemFilter]);
	const updateFilters = (newFilters) => {
		navigate({ search: (prev) => ({
			...prev,
			...newFilters
		}) });
	};
	const { data: userListings = [] } = useQuery({
		queryKey: ["user_listings", camp],
		enabled: !!camp,
		queryFn: async () => {
			const raw = localStorage.getItem("kitmatch:owner_tokens");
			if (!raw) return [];
			const map = JSON.parse(raw);
			const ids = Object.keys(map);
			if (ids.length === 0) return [];
			const { data, error } = await supabase.from("swap_requests").select("id, item, have_size, need_size").in("id", ids).eq("status", "available");
			if (error) throw error;
			return data;
		}
	});
	const { perfect, others } = (0, import_react.useMemo)(() => {
		listings.filter((l) => !!getOwnerToken(l.id)).map((l) => l.id);
		const isPerfect = (l) => {
			if (userListings.length === 0) return false;
			if (userListings.some((my) => my.id === l.id)) return listings.some((o) => !userListings.some((my) => my.id === o.id) && o.item === l.item && o.have_size === l.need_size && o.need_size === l.have_size);
			else return userListings.some((my) => l.item === my.item && l.have_size === my.need_size && l.need_size === my.have_size);
		};
		const perfect = [];
		const others = [];
		for (const l of listings) (isPerfect(l) ? perfect : others).push(l);
		return {
			perfect,
			others: perfectOnly ? [] : others
		};
	}, [listings, perfectOnly]);
	if (!ready || !camp) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "min-h-screen bg-background pb-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "border-b bg-card/50 backdrop-blur sticky top-0 z-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-md mx-auto px-5 py-3 flex items-center gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							className: "size-9 rounded-lg border grid place-items-center hover:bg-accent",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "font-semibold leading-tight",
								children: "Find Matches"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground truncate",
								children: camp
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "size-9 rounded-lg border grid place-items-center hover:bg-accent",
								"aria-label": "Share KitMatch",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "size-4" })
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
							align: "end",
							className: "w-48 rounded-xl",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
								onClick: () => shareApp(GENERIC_SHARE_TEXT, "KitMatch", camp),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "size-4 mr-2" }), " Share Link"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
								onClick: () => shareToWhatsApp(GENERIC_SHARE_TEXT, camp),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "size-4 mr-2" }), " Share to WhatsApp"]
							})]
						})] })
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-md mx-auto px-5 py-5 space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotificationPermissionBanner, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border bg-card p-4 space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										className: "text-[10px] uppercase tracking-wider font-semibold text-muted-foreground",
										children: "Which kit item?"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
										value: itemFilter || "all",
										onValueChange: (val) => updateFilters({
											item: val,
											size: "all"
										}),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
											className: "h-11 rounded-xl bg-muted/30",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Choose item" })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: "all",
											children: "All Items"
										}), ITEMS.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: i,
											children: i
										}, i))] })]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										className: "text-[10px] uppercase tracking-wider font-semibold text-muted-foreground",
										children: "Size you need?"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
										value: sizeFilter || "all",
										onValueChange: (val) => updateFilters({ size: val }),
										disabled: !itemFilter || itemFilter === "all",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
											className: "h-11 rounded-xl bg-muted/30",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Any size" })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: "all",
											children: "Any Size"
										}), sizeOptions.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: s,
											children: s
										}, s))] })]
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between pt-1 border-t pt-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "perfect",
									className: "text-sm font-medium",
									children: "Show perfect matches only"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
									id: "perfect",
									checked: !!perfectOnly,
									onCheckedChange: (val) => updateFilters({ perfect: val })
								})]
							}),
							(itemFilter !== "all" || sizeFilter !== "all" || perfectOnly) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "sm",
								className: "w-full text-xs text-muted-foreground h-8",
								onClick: () => updateFilters({
									item: "all",
									size: "all",
									perfect: false
								}),
								children: "Clear all filters"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center justify-between px-1",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-sm font-medium text-muted-foreground",
							children: isLoading ? "Searching..." : `${totalCount ?? 0} listings found`
						})
					}),
					isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "py-16 text-center text-destructive",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-semibold",
								children: "Failed to load listings"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm opacity-70",
								children: queryError?.message || "Unknown error"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								className: "mt-4 h-10 rounded-xl",
								onClick: () => refetch(),
								children: isRefetching ? "Refreshing..." : "Try Again"
							})
						]
					}) : isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "py-16 grid place-items-center text-muted-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-6 animate-spin" })
					}) : perfect.length + others.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
						perfectOnly: !!perfectOnly,
						hasFilters: itemFilter !== "all" || sizeFilter !== "all",
						onClearFilters: () => updateFilters({
							item: "all",
							size: "all",
							perfect: false
						})
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3",
						children: [
							perfect.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingCard, {
								listing: l,
								perfect: true,
								isOwner: !!getOwnerToken(l.id),
								onSwapped: (status) => markSwapped.mutate({
									id: l.id,
									status
								}),
								swapping: markSwapped.isPending
							}, l.id)),
							others.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingCard, {
								listing: l,
								isOwner: !!getOwnerToken(l.id),
								onSwapped: (status) => markSwapped.mutate({
									id: l.id,
									status
								}),
								swapping: markSwapped.isPending
							}, l.id)),
							hasNextPage && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								className: "w-full h-12 rounded-xl mt-4",
								onClick: () => fetchNextPage(),
								disabled: isFetchingNextPage,
								children: isFetchingNextPage ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }) : "Load More Listings"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl bg-primary/5 border border-primary/10 p-4 flex gap-3 items-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-5 text-primary shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-foreground leading-relaxed",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Safety:" }),
								" Only meet other corps members ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "inside the camp" }),
								". Use with caution."
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
				]
			}),
			showScrollTop && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				onClick: () => window.scrollTo({
					top: 0,
					behavior: "smooth"
				}),
				className: "fixed bottom-6 right-6 size-12 rounded-full shadow-lg z-20",
				size: "icon",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUp, { className: "size-5" })
			})
		]
	});
}
function ListingCard({ listing, perfect, isOwner, onSwapped, swapping }) {
	const cardRef = (0, import_react.useRef)(null);
	const [isSharing, setIsSharing] = (0, import_react.useState)(false);
	const waUrl = `https://wa.me/${listing.whatsapp}?text=${encodeURIComponent(`Hi ${listing.name}, I saw your KitMatch post for ${listing.item} (you have size ${listing.have_size}, need ${listing.need_size}). Let's swap.`)}`;
	const handleShareAsImage = async () => {
		if (!cardRef.current) return;
		setIsSharing(true);
		try {
			const dataUrl = await toPng(cardRef.current, {
				backgroundColor: "white",
				style: { transform: "scale(1)" }
			});
			const blob = await (await fetch(dataUrl)).blob();
			const file = new File([blob], `kitmatch-${listing.item.replace(/\s+/g, "-").toLowerCase()}.png`, { type: "image/png" });
			if (navigator.share && navigator.canShare?.({ files: [file] })) await navigator.share({
				files: [file],
				title: "KitMatch Swap",
				text: `Check out this kit swap for ${listing.item} at ${listing.camp}!`
			});
			else {
				const link = document.createElement("a");
				link.download = `kitmatch-${listing.item.toLowerCase()}.png`;
				link.href = dataUrl;
				link.click();
				toast.success("Image saved to your device");
			}
		} catch (err) {
			console.error("Failed to share image", err);
			toast.error("Couldn't generate image. Try again.");
		} finally {
			setIsSharing(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		ref: cardRef,
		className: `rounded-2xl border bg-card p-4 shadow-sm relative overflow-hidden ${perfect ? "ring-2 ring-primary/40" : ""}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center gap-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-semibold leading-tight",
							children: listing.name
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted-foreground",
						children: ["Platoon ", listing.platoon]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-end gap-2",
					children: [perfect && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-1 rounded-full bg-primary text-primary-foreground px-2.5 py-1 text-xs font-medium",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-3" }), " Perfect Match"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[10px] font-medium px-2 py-0.5 rounded bg-secondary text-secondary-foreground",
						children: listing.camp.split(" (")[0]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "font-medium text-lg",
					children: listing.item
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 grid grid-cols-2 gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
						label: "Has",
						value: `Size ${listing.have_size}`,
						tone: "success"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
						label: "Needs",
						value: `Size ${listing.need_size}`
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: `grid gap-2 ${isOwner ? "grid-cols-[1fr_auto]" : "grid-cols-[1fr_auto]"}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						className: "h-11 rounded-xl",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: waUrl,
							target: "_blank",
							rel: "noopener noreferrer",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "size-4" }), " Chat"]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							className: "h-11 rounded-xl",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "size-4" })
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
						align: "end",
						className: "w-48 rounded-xl",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
							onClick: handleShareAsImage,
							disabled: isSharing,
							children: [isSharing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 mr-2 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, { className: "size-4 mr-2" }), "Share as Image"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
							onClick: () => shareToWhatsApp(`Hi, check out this ${listing.item} swap on KitMatch!`, listing.camp),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "size-4 mr-2" }), " Share to WhatsApp"]
						})]
					})] })]
				}), isOwner && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "secondary",
						className: "h-10 rounded-xl border gap-2",
						onClick: () => onSwapped("swapped"),
						disabled: swapping,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckCheck, { className: "size-4" }), " Swapped"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "ghost",
						className: "h-10 rounded-xl text-destructive hover:text-destructive hover:bg-destructive/10 gap-2",
						onClick: () => onSwapped("removed"),
						disabled: swapping,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" }), " Remove"]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 pt-3 border-t flex items-center justify-between opacity-40 grayscale pointer-events-none",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[10px] font-bold tracking-tighter uppercase",
					children: "KitMatch"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[8px]",
					children: "kitmatch.app"
				})]
			})
		]
	});
}
function Tag({ label, value, tone }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `rounded-xl px-3 py-2 text-sm ${tone === "success" ? "bg-primary/10 text-primary" : "bg-secondary text-secondary-foreground"}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-[10px] uppercase tracking-wide opacity-70",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "font-medium",
			children: value
		})]
	});
}
function EmptyState({ perfectOnly, hasFilters, onClearFilters }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl border bg-card p-8 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "size-12 rounded-full bg-secondary grid place-items-center mx-auto mb-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Inbox, { className: "size-5 text-muted-foreground" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-semibold",
				children: "No listings yet"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground mt-1",
				children: perfectOnly ? "No perfect matches found. Try showing all listings or changing your filters." : "Be the first to post a swap in your camp."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				className: "mt-4 h-11 rounded-xl",
				children: perfectOnly || hasFilters ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: onClearFilters,
					variant: "secondary",
					className: "mt-4 h-11 rounded-xl w-full",
					children: "Clear All Filters"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/post",
					children: "Post a Swap"
				})
			})
		]
	});
}
//#endregion
export { FindPage as component };
