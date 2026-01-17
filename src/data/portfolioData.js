// Utility to clean up paths and return array of URLs
const getImages = (glob) => {
  return Object.keys(glob).map((key) => glob[key].default || glob[key]);
};

// Import cover assets explicitly (or pick first from glob)
// We'll use glob for everything to be dynamic and fast.

const silverAssets = import.meta.glob("../assets/silver*.{png,jpg,jpeg,svg}", {
  eager: true,
});
const elbazAssets = import.meta.glob(
  "../assets/elbaz*.{png,jpg,jpeg,svg,MOV}",
  {
    eager: true,
  },
);
const sirasAssets = import.meta.glob(
  "../assets/siras*.{png,jpg,jpeg,svg,gif}",
  {
    eager: true,
  },
);
const woodAssets = import.meta.glob("../assets/wood*.{png,jpg,jpeg,svg}", {
  eager: true,
});
const iberaAssets = import.meta.glob("../assets/ibera*.{png,jpg,jpeg,svg}", {
  eager: true,
});
const labAssets = import.meta.glob("../assets/lab*.{png,jpg,jpeg,svg}", {
  eager: true,
});
const catAssets = import.meta.glob("../assets/cat*.{png,jpg,jpeg,svg}", {
  eager: true,
});

// Helper to extract first image as cover if specific one not needed
const getCover = (assets, preferredName) => {
  const keys = Object.keys(assets);
  const match = keys.find((k) => k.includes(preferredName));
  return match ? assets[match].default : assets[keys[0]].default;
};

// Specific MP4/MOV handling (if any need explicit video imports, we can add them here)
import silverVid from "../assets/silvervid.mp4";
import elbazVid from "../assets/elbazvid.MOV";

export const brands = [
  {
    id: "silver",
    title: "Silver Karam",
    category: "Jewelry / Branding",
    description: "Premium cinematic showcase for a luxury silver brand.",
    cover: silverVid, // Use video as cover
    type: "video",
    album: [silverVid, ...getImages(silverAssets)],
    size: "wide",
    color: "#263143", // Deep Navy
  },
  {
    id: "elbaz",
    title: "Elbaz Furniture",
    category: "Furniture / Branding",
    description: "Premium cinematic showcase for a luxury furniture brand.",
    cover: elbazVid, // Use video as cover
    type: "video",
    album: getImages(elbazAssets),
    size: "normal",
    color: "#000000ff", // Deep Red/Burgundy
  },
  {
    id: "wood",
    title: "El\u2011Hamidi Wood",
    category: "Wood Factory",
    description: "Modern organic wood factory design campaign.",
    cover: getCover(woodAssets, "wood7"),
    type: "image",
    album: getImages(woodAssets),
    size: "wide",
    color: "#ae8e23ff", // Dark Wood/Brown
    objectFit: "contain", // Show full image, don't crop
  },
  {
    id: "ibera",
    title: "Ibera",
    category: "Traveling / Reservations",
    description: "traveling and reservations brand identity design.",
    cover: getCover(iberaAssets, "ibera1"),
    type: "image",
    album: getImages(iberaAssets),
    size: "wide",
    color: "#145776ff", // Dark Olive/Green
  },
  {
    id: "Master Lab",
    title: "Master Lab",
    category: "Medical / Branding",
    description: "Medical brand identity design.",
    cover: getCover(labAssets, "lab14"),
    type: "image",
    album: getImages(labAssets),
    color: "#790f0aff", // Slate Blue/Grey
    objectFit: "contain", // Show full image
  },
  {
    id: "siras",
    title: "Siras",
    category: "Branding / Motion",
    description: "Dynamic visual identity and motion graphics.",
    cover: getCover(sirasAssets, "siras1"),
    type: "image",
    album: getImages(sirasAssets),
    color: "#1e3425ff", // Deep Indigo
  },
  {
    id: "catchy furniture",
    title: "Catchy Furniture", // Renaming "Cat" to something professional if it's a team/agency logic, or "Cat Photography"? Let's go with "Creative Art" based on "catMain".
    category: "Furniture / Branding",
    description: "Premium cinematic showcase for a luxury furniture brand.",
    cover: getCover(catAssets, "cat2"),
    type: "image",
    album: getImages(catAssets),
    size: "normal",
    color: "#B16B45", // Dark Grey
  },
];
