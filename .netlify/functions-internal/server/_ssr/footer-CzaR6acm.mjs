import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { f as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { S as Check, d as Mail, h as Github, o as Share2, r as Star, x as ChevronDown, y as ChevronUp } from "../_libs/lucide-react.mjs";
import { t as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { a as ItemText, c as Root2, d as Separator, f as Trigger, i as ItemIndicator, l as ScrollDownButton, m as Viewport, n as Icon, o as Label, p as Value, r as Item, s as Portal, t as Content2, u as ScrollUpButton } from "../_libs/@radix-ui/react-select+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/footer-CzaR6acm.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
			destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
			outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
			secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
			ghost: "hover:bg-accent hover:text-accent-foreground",
			link: "text-primary underline-offset-4 hover:underline"
		},
		size: {
			default: "h-9 px-4 py-2",
			sm: "h-8 rounded-md px-3 text-xs",
			lg: "h-10 rounded-md px-8",
			icon: "h-9 w-9"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
var Select = Root2;
var SelectValue = Value;
var SelectTrigger = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Trigger, {
	ref,
	className: cn("flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background cursor-pointer data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4 opacity-50" })
	})]
}));
SelectTrigger.displayName = Trigger.displayName;
var SelectScrollUpButton = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollUpButton, {
	ref,
	className: cn("flex cursor-default items-center justify-center py-1", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUp, { className: "h-4 w-4" })
}));
SelectScrollUpButton.displayName = ScrollUpButton.displayName;
var SelectScrollDownButton = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollDownButton, {
	ref,
	className: cn("flex cursor-default items-center justify-center py-1", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4" })
}));
SelectScrollDownButton.displayName = ScrollDownButton.displayName;
var SelectContent = import_react.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Content2, {
	ref,
	className: cn("relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-select-content-transform-origin)", position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1", className),
	position,
	...props,
	children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollUpButton, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Viewport, {
			className: cn("p-1", position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"),
			children
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollDownButton, {})
	]
}) }));
SelectContent.displayName = Content2.displayName;
var SelectLabel = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
	ref,
	className: cn("px-2 py-1.5 text-sm font-semibold", className),
	...props
}));
SelectLabel.displayName = Label.displayName;
var SelectItem = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Item, {
	ref,
	className: cn("relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "absolute right-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemIndicator, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" }) })
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemText, { children })]
}));
SelectItem.displayName = Item.displayName;
var SelectSeparator = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, {
	ref,
	className: cn("-mx-1 my-1 h-px bg-muted", className),
	...props
}));
SelectSeparator.displayName = Separator.displayName;
var CAMPS = [
	"Abia Camp (Bende)",
	"Adamawa Camp (Damare)",
	"Akwa Ibom Camp (Ikot Itie Udung)",
	"Anambra Camp (Umuawulu)",
	"Bauchi Camp (Wailo)",
	"Bayelsa Camp (Kaiama)",
	"Benue Camp (Wannune)",
	"Borno Camp (Maiduguri)",
	"Cross River Camp (Obubra)",
	"Delta Camp (Issele-Uku)",
	"Ebonyi Camp (Macgregor College)",
	"Edo Camp (Okada)",
	"Ekiti Camp (Emure-Ise)",
	"Enugu Camp (Awgu)",
	"FCT Abuja Camp (Kubwa)",
	"Gombe Camp (Amada)",
	"Imo Camp (Eziama)",
	"Jigawa Camp (Fanisau)",
	"Kaduna Camp (Manchok)",
	"Kano Camp (Kusalla)",
	"Katsina Camp (Mani)",
	"Kebbi Camp (Dakingari)",
	"Kogi Camp (Asaya)",
	"Kwara Camp (Yikpata)",
	"Lagos Camp (Iyana Ipaja)",
	"Nasarawa Camp (Keffi)",
	"Niger Camp (Paiko)",
	"Ogun Camp (Sagamu)",
	"Ondo Camp (Ikare)",
	"Osun Camp (Ede)",
	"Oyo Camp (Iseyin)",
	"Plateau Camp (Mangu)",
	"Rivers Camp (Nonwa-Gbam)",
	"Sokoto Camp (Wamakko)",
	"Taraba Camp (Sibre)",
	"Yobe Camp (Fika)",
	"Zamfara Camp (Tsafe)"
];
var PLATOONS = [
	"1",
	"2",
	"3",
	"4",
	"5",
	"6",
	"7",
	"8",
	"9",
	"10"
];
var SHOE_SIZES = [
	"38",
	"39",
	"40",
	"41",
	"42",
	"43",
	"44",
	"45"
];
var CLOTHING_SIZES = [
	"S",
	"M",
	"L",
	"XL",
	"XXL",
	"XXXL"
];
var BELT_SIZES = [
	"30",
	"32",
	"34",
	"36",
	"38",
	"40",
	"42",
	"44",
	"46"
];
var ITEMS = [
	"Jungle Boot",
	"White Canvas",
	"Khaki Trouser",
	"Khaki Shirt",
	"White Shorts",
	"White T-shirt",
	"Belt"
];
var SIZES_BY_ITEM = {
	"Jungle Boot": SHOE_SIZES,
	"White Canvas": SHOE_SIZES,
	"Khaki Trouser": CLOTHING_SIZES,
	"Khaki Shirt": CLOTHING_SIZES,
	"White Shorts": CLOTHING_SIZES,
	"White T-shirt": CLOTHING_SIZES,
	Belt: BELT_SIZES
};
var FEEDBACK_MAILTO = `mailto:icharlesapara@gmail.com?subject=${encodeURIComponent("KitMatch Support")}`;
function getShareUrl(camp) {
	if (typeof window === "undefined") return "https://kitmatch.app";
	const url = new URL(window.location.origin);
	url.pathname = "/find";
	if (camp) url.searchParams.set("camp", camp);
	return url.toString();
}
async function shareApp(text, title = "KitMatch", camp) {
	const url = getShareUrl(camp);
	const shareData = {
		title,
		text,
		url
	};
	if (typeof navigator !== "undefined" && typeof navigator.share === "function") try {
		await navigator.share(shareData);
		return;
	} catch (err) {
		if (err?.name === "AbortError") return;
	}
	try {
		await navigator.clipboard.writeText(`${text} ${url}`);
		toast.success("Link copied — paste it anywhere to share");
	} catch {
		toast.error("Couldn't share. Copy this link manually: " + url);
	}
}
function buildCampShareText(camp) {
	return `I just posted a kit swap on KitMatch for ${camp}. Join us and swap your NYSC kit too!`;
}
function shareToWhatsApp(text, camp) {
	const url = getShareUrl(camp);
	const waUrl = `https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`;
	window.open(waUrl, "_blank");
}
var GENERIC_SHARE_TEXT = "Swap your NYSC kit on KitMatch — find corps members in your camp who have the size you need.";
function Footer() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "mt-10 pt-6 border-t space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-muted-foreground",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => shareApp(GENERIC_SHARE_TEXT),
					className: "inline-flex items-center gap-1.5 hover:text-foreground transition-colors",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "size-3.5" }), " Share KitMatch"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: FEEDBACK_MAILTO,
					className: "inline-flex items-center gap-1.5 hover:text-foreground transition-colors",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "size-3.5" }), " Feedback"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: "https://github.com/inioluwa-a/kit-match",
					target: "_blank",
					rel: "noopener noreferrer",
					className: "inline-flex items-center gap-1.5 hover:text-foreground transition-colors",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "size-3.5" }), " Star on GitHub"]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-center gap-2 text-xs text-muted-foreground pb-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Made with ❤️ by" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
				href: "https://github.com/inioluwa-a",
				target: "_blank",
				rel: "noopener noreferrer",
				className: "font-medium text-foreground hover:underline inline-flex items-center gap-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Github, { className: "size-3" }), " aparaic"]
			})]
		})]
	});
}
//#endregion
export { ITEMS as a, Select as c, SelectTrigger as d, SelectValue as f, shareToWhatsApp as g, shareApp as h, GENERIC_SHARE_TEXT as i, SelectContent as l, cn as m, CAMPS as n, PLATOONS as o, buildCampShareText as p, Footer as r, SIZES_BY_ITEM as s, Button as t, SelectItem as u };
