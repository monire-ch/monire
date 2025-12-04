export type MarqueeConfig = {
  elementWidth: string;
  elementWidthAuto?: boolean;
  elementWidthInSmallDevices: string;
  pauseOnHover: boolean;
  reverse?: "reverse" | "" | undefined; // Optional: "reverse" or empty string
  duration: string;
};

// Type for the video configuration
export type VideoConfig = {
  src: string; // youtube or vimeo video ID or path to video file
  type?: string; // Optional: only required for local files (e.g., "video/mp4")
  provider?: "youtube" | "vimeo" | "html5"; // Accepted providers (default is "youtube")
  poster?: string; // Optional: URL or image path for video thumbnail
  autoplay?: boolean; // Optional: true to autoplay, false to start manually (default is false)
  id?: string; // required if same video is used on multiple time on same page
};

export type Button = {
  enable: boolean;
  label: string;
  url: string;
  type?: string;
  rel?: string;
  target?: string;
  [x: string]: any;
};

export type TocHeading = {
  depth: number;
  slug: string;
  text: string;
  subheadings?: TocHeading[];
};

export type PricingPlans = {
  enable: boolean;
  list: {
    label: string;
    selected: boolean;
  }[];
};

export type FeatureItem = {
  value: string;
  included: PlanInclusion[];
};

export type ComparisonCategory = {
  label: string;
  list: FeatureItem[];
};

export type PricingComparison = {
  comparison: ComparisonCategory[];
};

export type PricingTier = Section & {
  enable: boolean;
  featured: boolean;
  badge: {
    enable: boolean;
    label: string;
  };
  name: string;
  description: string;
  price: PricingPlan[];
  features: string[];
  usages: PricingUsage[];
};

// Universal Type For Every Section
export type Section = {
  enable?: boolean;
  title?: string;
  excerpt?: string;
  date?: Date | string;
  author?: string;
  subtitle?: string;
  categories?: string[];
  description?: string;
  ctaBtn?: Button;
  image?: string;
  bg_pattern_image?: string;
  limit?: false | number;
};

export type SocialLink = {
  enable: boolean;
  label: string;
  icon: string;
  url: string;
};

export type Social = {
  enable: boolean;
  list: SocialLink[];
};

export type FAQItem = {
  active: boolean;
  title: string;
  content: string;
};

export type FAQCategory = {
  label: string;
  list: FAQItem[];
};

// For Astro Font
export type GlobalValues =
  | "inherit"
  | "initial"
  | "revert"
  | "revert-layer"
  | "unset";
export interface Source {
  path?: string;
  preload?: boolean;
  css?: Record<string, string>;
  style:
    | "normal"
    | "italic"
    | "oblique"
    | `oblique ${number}deg`
    | GlobalValues
    | (string & {});
  weight?:
    | "normal"
    | "bold"
    | "lighter"
    | "bolder"
    | GlobalValues
    | 100
    | 200
    | 300
    | 400
    | 500
    | 600
    | 700
    | 800
    | 900
    | "100"
    | "200"
    | "300"
    | "400"
    | "500"
    | "600"
    | "700"
    | "800"
    | "900"
    | (string & {})
    | (number & {});
}
export interface FontConfig {
  name: string;
  src: Source[];
  fetch?: boolean;
  verbose?: boolean;
  selector?: string;
  preload?: boolean;
  cacheDir?: string;
  basePath?: string;
  fallbackName?: string;
  googleFontsURL?: string;
  cssVariable?: string | boolean;
  fallback: "serif" | "sans-serif" | "monospace";
  display: "auto" | "block" | "swap" | "fallback" | "optional" | (string & {});
  provider?: "local-hosted" | "google-fonts" | undefined;
}

// ----------------------------------------------------------------------------------------------------
// Start Changelog TYPE
export type ChangelogItem = {
  label: string;
  color: string; // e.g., "sky", "orange", "success"
  content: string;
};

export type ChangelogCategory = {
  active: boolean;
  title: string;
  list: ChangelogItem[];
};

export type TypeLabel = {
  icon: string;
  label: string;
};

export type ChangelogEntry = {
  title: string;
  version: string;
  date: string;
  content: string;
  video?: Video;
  types: TypeLabel[];
  changes: ChangelogCategory[];
};

// End Changelog TYPE
// ----------------------------------------------------------------------------------------------------

// ----------------------------------------------------------------------------------------------------
// START CONTACT FORM TYPE

export type NoteType = "info" | "warning" | "success" | "deprecated" | "hint";

export type DropdownType = "select" | "search";

export interface DropdownSearchConfig {
  placeholder?: string;
}

export interface DropdownItem {
  label: string;
  selected: true;
  value: string;
}

export interface DropdownConfig {
  type?: DropdownType;
  search?: DropdownSearchConfig;
  items: DropdownItem[];
}

export interface InputField {
  label: string;
  placeholder?: string;
  required: boolean;
  halfWidth: boolean;
  defaultValue: string;
  name?: string;
  selected?: boolean; // Only applicable if tag is input radio & checkbox
  value?: boolean; // Only applicable if tag is input radio & checkbox
  checked?: boolean; // Only applicable if tag is input radio & checkbox
  type?: "text" | "email" | "radio" | "checkbox";
  id?: string;
  parentClass?: string;
  tag?: "textarea";
  rows?: string; // Only applicable if tag is textarea
  group?: string; // Only applicable if tag is input radio & checkbox
  groupLabel?: string; // Only applicable if tag is input radio & checkbox
  items?: InputField[]; // Only applicable if tag is input radio & checkbox
  dropdown?: DropdownConfig;
  note?: NoteType;
  content?: string;
}

export interface ContactFormConfig {
  action: string;
  emailSubject: string;
  submitButton: SubmitButtonConfig;
  note: string;
  inputs: InputField[];
}

// End CONTACT FORM TYPE
// ----------------------------------------------------------------------------------------------------

// ----------------------------------------------------------------------
// START MENU TYPE
export interface Badge {
  enable: boolean;
  label: string;
  color: "primary" | "success" | "danger" | "warning" | string;
  type: "dot" | "text";
}

export interface Testimonial {
  enable: boolean;
  image: string;
  content: string;
}

export interface Service {
  enable: boolean;
  name: string;
}

export interface NavigationLinkCTA {
  enable: string;
  image: string;
  title: string;
  description: string;
  ctaBtn: Button;
}

export interface ChildNavigationLink {
  enable: boolean;
  name: string;
  description: string;
  icon: string;
  weight?: number;
  url?: string;
  rel?: string;
  target?: string;
  hasChildren?: boolean;
  badge?: Badge;
  children?: ChildNavigationLink[];
}

export interface NavigationLink extends ChildNavigationLink {
  enable: boolean;
  weight?: number;
  hasMegaMenu?: boolean;
  cta?: NavigationLinkCTA;
  testimonial?: Testimonial;
  services?: Service;
  menus?: NavigationLink[];
  action?: string;
}

// END MENU TYPE
// ----------------------------------------------------------------------
