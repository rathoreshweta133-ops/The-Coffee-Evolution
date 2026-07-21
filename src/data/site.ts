import { siteConfig } from "@/config/site";

export const brand = {
  name: siteConfig.siteName,
  shortName: siteConfig.siteName,
  tagline: "From bold brews to vibrant bites, Nizamabad gets a cafe experience built for every sip, plate, and pause.",
  address: "Pragathi Nagar, Nizamabad, Telangana 503003",
  phone: "7691903806",
  email: "hello@thecoffeeevolution.example",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Pragathi%20Nagar%2C%20Nizamabad%2C%20Telangana%20503003",
  mapsEmbedUrl: "https://www.google.com/maps?q=Pragathi%20Nagar%2C%20Nizamabad%2C%20Telangana%20503003&output=embed",
  instagram: "https://instagram.com/",
  facebook: "https://facebook.com/",
};

export const hours = [
  { day: "Sunday", open: "12:30", close: "22:30", label: "12:30 PM - 10:30 PM" },
  { day: "Monday", open: "12:30", close: "22:30", label: "12:30 PM - 10:30 PM" },
  { day: "Tuesday", open: "12:30", close: "22:30", label: "12:30 PM - 10:30 PM" },
  { day: "Wednesday", open: "12:30", close: "22:30", label: "12:30 PM - 10:30 PM" },
  { day: "Thursday", open: "12:30", close: "22:30", label: "12:30 PM - 10:30 PM" },
  { day: "Friday", open: "12:30", close: "22:30", label: "12:30 PM - 10:30 PM" },
  { day: "Saturday", open: "12:30", close: "22:30", label: "12:30 PM - 10:30 PM" },
];

export const stats = [
  { value: "7", label: "days open weekly" },
  { value: "12:30", label: "first service daily" },
  { value: "10:30", label: "last pour nightly" },
];
