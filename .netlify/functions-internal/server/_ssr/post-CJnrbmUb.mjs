import { r as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-DnP9uI9u.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as useCamp } from "./camp-store-Cv1vmAWP.mjs";
import { d as useNavigate, u as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { f as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { D as ArrowLeft, a as ShieldCheck, f as LoaderCircle, i as Sparkles, l as MessageCircle, n as Trash2, o as Share2, v as CircleCheck } from "../_libs/lucide-react.mjs";
import { a as ITEMS, c as Select, d as SelectTrigger, f as SelectValue, h as shareApp, l as SelectContent, m as cn, o as PLATOONS, p as buildCampShareText, r as Footer, s as SIZES_BY_ITEM, t as Button, u as SelectItem } from "./footer-CzaR6acm.mjs";
import { t as Label } from "./label-DYmjuDOL.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/post-CJnrbmUb.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Input = import_react.forwardRef(({ className, type, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type,
		className: cn("flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	});
});
Input.displayName = "Input";
function normalizeNigerianPhone(raw) {
	const digits = raw.replace(/\D/g, "");
	if (/^0\d{10}$/.test(digits)) return "234" + digits.slice(1);
	if (/^234\d{10}$/.test(digits)) return digits;
	if (/^\d{10}$/.test(digits)) return "234" + digits;
	return null;
}
function PostPage() {
	const { camp, ready } = useCamp();
	const navigate = useNavigate();
	const [name, setName] = (0, import_react.useState)("");
	const [platoon, setPlatoon] = (0, import_react.useState)("");
	const [whatsapp, setWhatsapp] = (0, import_react.useState)("");
	const [item, setItem] = (0, import_react.useState)("");
	const [haveSize, setHaveSize] = (0, import_react.useState)("");
	const [needSize, setNeedSize] = (0, import_react.useState)("");
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	const [done, setDone] = (0, import_react.useState)(false);
	const [matches, setMatches] = (0, import_react.useState)([]);
	const [newListingId, setNewListingId] = (0, import_react.useState)(null);
	const [removing, setRemoving] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (ready && !camp) navigate({ to: "/" });
	}, [
		ready,
		camp,
		navigate
	]);
	const sizes = (0, import_react.useMemo)(() => item ? SIZES_BY_ITEM[item] : [], [item]);
	(0, import_react.useEffect)(() => {
		setHaveSize("");
		setNeedSize("");
	}, [item]);
	async function handleSubmit(e) {
		e.preventDefault();
		if (!camp) return;
		if (!name.trim() || name.length > 50) return toast.error("Enter your name (max 50 chars).");
		if (!platoon) return toast.error("Select your platoon.");
		const phone = normalizeNigerianPhone(whatsapp);
		if (!phone) return toast.error("Enter a valid Nigerian WhatsApp number.");
		if (!item) return toast.error("Select an item.");
		if (!haveSize || !needSize) return toast.error("Select both sizes.");
		if (haveSize === needSize) return toast.error("Have and need sizes must differ.");
		setSubmitting(true);
		const ownerToken = crypto.randomUUID();
		const { data, error } = await supabase.from("swap_requests").insert({
			camp,
			name: name.trim(),
			platoon,
			whatsapp: phone,
			item,
			have_size: haveSize,
			need_size: needSize,
			status: "available",
			owner_token: ownerToken
		}).select("id").single();
		if (!error) {
			const { data: matchData } = await supabase.from("swap_requests").select("id, name, platoon, whatsapp, item, have_size, need_size").eq("camp", camp).eq("item", item).eq("have_size", needSize).eq("need_size", haveSize).eq("status", "available").neq("id", data?.id).limit(3);
			if (matchData) setMatches(matchData);
		}
		setSubmitting(false);
		if (error) {
			toast.error("Couldn't post your swap. Try again.");
			return;
		}
		if (data?.id) {
			setNewListingId(data.id);
			try {
				const raw = localStorage.getItem("kitmatch:owner_tokens");
				const map = raw ? JSON.parse(raw) : {};
				map[data.id] = ownerToken;
				localStorage.setItem("kitmatch:owner_tokens", JSON.stringify(map));
			} catch {}
		}
		setDone(true);
	}
	async function handleRemove() {
		if (!newListingId) return;
		setRemoving(true);
		try {
			const raw = localStorage.getItem("kitmatch:owner_tokens");
			if (!raw) throw new Error("No token found");
			const map = JSON.parse(raw);
			const token = map[newListingId];
			if (!token) throw new Error("No token found for this listing");
			const { data, error } = await supabase.rpc("mark_swap_swapped", {
				p_id: newListingId,
				p_token: token
			});
			if (error) throw error;
			if (!data) throw new Error("Could not remove listing");
			delete map[newListingId];
			localStorage.setItem("kitmatch:owner_tokens", JSON.stringify(map));
			toast.success("Listing removed");
			setDone(false);
			setNewListingId(null);
		} catch (e) {
			const message = e instanceof Error ? e.message : "Couldn't remove listing";
			toast.error(message);
		} finally {
			setRemoving(false);
		}
	}
	if (!ready || !camp) return null;
	if (done) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "min-h-screen bg-background py-12 px-5",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-md mx-auto text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "size-16 rounded-full bg-primary/10 text-primary grid place-items-center mx-auto mb-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-8" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl font-bold",
					children: "Your swap request has been posted"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-muted-foreground",
					children: [
						"Corps members in ",
						camp,
						" can now find you."
					]
				}),
				matches.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 text-left space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 text-primary",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-5 fill-primary/20" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-bold text-lg",
							children: "Instant Match Found!"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-3",
						children: matches.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-4 rounded-2xl border bg-card shadow-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between items-start",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-semibold",
										children: m.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-xs text-muted-foreground",
										children: ["Platoon ", m.platoon]
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-right",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-xs font-medium bg-primary/10 text-primary px-2 py-0.5 rounded-full",
											children: "Perfect Match"
										})
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-3 text-sm flex gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex-1 p-2 rounded-xl bg-secondary/50",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-[10px] uppercase opacity-70",
											children: "Has"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "font-semibold",
											children: ["Size ", m.have_size]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex-1 p-2 rounded-xl bg-secondary/50",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-[10px] uppercase opacity-70",
											children: "Needs"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "font-semibold",
											children: ["Size ", m.need_size]
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									className: "w-full mt-3 h-10 rounded-xl gap-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
										href: `https://wa.me/${m.whatsapp}?text=${encodeURIComponent(`Hi ${m.name}, I just saw your KitMatch post for ${m.item}! I have size ${m.have_size} and need size ${m.need_size}. Let's swap!`)}`,
										target: "_blank",
										rel: "noopener noreferrer",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "size-4" }), " Chat on WhatsApp"]
									})
								})
							]
						}, m.id))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 grid gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							className: "h-12 rounded-xl",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/find",
								children: "View All Listings"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "secondary",
							className: "h-12 rounded-xl border",
							onClick: () => shareApp(buildCampShareText(camp)),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "size-4" }), " Share with your camp"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "secondary",
							className: "h-12 rounded-xl border",
							onClick: () => {
								setDone(false);
								setName("");
								setPlatoon("");
								setWhatsapp("");
								setItem("");
								setHaveSize("");
								setNeedSize("");
								setMatches([]);
								setNewListingId(null);
							},
							children: "Post Another Swap"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "ghost",
							className: "h-12 rounded-xl text-destructive hover:text-destructive hover:bg-destructive/10 gap-2",
							onClick: handleRemove,
							disabled: removing,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" }), " Remove My Listing"]
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
				className: "max-w-md mx-auto px-5 py-3 flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "size-9 rounded-lg border grid place-items-center hover:bg-accent",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-semibold leading-tight",
					children: "Post Your Swap"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground",
					children: camp
				})] })]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: handleSubmit,
			className: "max-w-md mx-auto px-5 py-6 grid gap-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Name",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: name,
						onChange: (e) => setName(e.target.value),
						placeholder: "e.g. David",
						maxLength: 50,
						className: "h-12 rounded-xl"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Platoon",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: platoon,
						onValueChange: setPlatoon,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
							className: "h-12 rounded-xl",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Choose platoon" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: PLATOONS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
							value: p,
							children: ["Platoon ", p]
						}, p)) })]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "WhatsApp Number",
					hint: "Nigerian numbers only",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: whatsapp,
						onChange: (e) => setWhatsapp(e.target.value),
						placeholder: "08012345678",
						inputMode: "tel",
						maxLength: 15,
						className: "h-12 rounded-xl"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Item",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: item,
						onValueChange: (v) => setItem(v),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
							className: "h-12 rounded-xl",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Choose item" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: ITEMS.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: i,
							children: i
						}, i)) })]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Size I Have",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: haveSize,
							onValueChange: setHaveSize,
							disabled: !item,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								className: "h-12 rounded-xl",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Size" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: sizes.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: s,
								children: s
							}, s)) })]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Size I Need",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: needSize,
							onValueChange: setNeedSize,
							disabled: !item,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								className: "h-12 rounded-xl",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Size" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: sizes.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: s,
								children: s
							}, s)) })]
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					disabled: submitting,
					className: "h-14 rounded-2xl text-base mt-2",
					children: submitting ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-5 animate-spin" }) : "Post Swap Request"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl bg-primary/5 border border-primary/10 p-4 flex gap-3 text-left",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-5 text-primary shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "text-sm font-semibold text-primary",
							children: "Safety First"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-foreground leading-relaxed",
							children: [
								"Only meet other corps members ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "physically inside the camp" }),
								". KitMatch only facilitates connections; use with caution."
							]
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground text-center",
					children: "Listings expire automatically after 14 days."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
			]
		})]
	});
}
function Field({ label, hint, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-1.5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
				className: "text-sm font-medium",
				children: label
			}),
			children,
			hint && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground",
				children: hint
			})
		]
	});
}
//#endregion
export { PostPage as component };
