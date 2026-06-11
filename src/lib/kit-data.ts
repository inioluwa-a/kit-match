export const CAMPS = [
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
  "Zamfara Camp (Tsafe)",
] as const;

export const PLATOONS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

const SHOE_SIZES = ["38", "39", "40", "41", "42", "43", "44", "45"];
const CLOTHING_SIZES = ["S", "M", "L", "XL", "XXL", "XXXL"];
const BELT_SIZES = ["30", "32", "34", "36", "38", "40", "42", "44", "46"];

export const ITEMS = [
  "Jungle Boot",
  "White Canvas",
  "Khaki Trouser",
  "Khaki Shirt",
  "White Shorts",
  "White T-shirt",
  "Belt",
] as const;

export type Item = (typeof ITEMS)[number];

export const SIZES_BY_ITEM: Record<Item, string[]> = {
  "Jungle Boot": SHOE_SIZES,
  "White Canvas": SHOE_SIZES,
  "Khaki Trouser": CLOTHING_SIZES,
  "Khaki Shirt": CLOTHING_SIZES,
  "White Shorts": CLOTHING_SIZES,
  "White T-shirt": CLOTHING_SIZES,
  Belt: BELT_SIZES,
};
