import { LuInstagram, LuFacebook } from "react-icons/lu";
import { FaLine, FaPhoneVolume, FaLandmark } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

/**
 * data for footer
 */
export const RIGHTS = Object.freeze([
  { label: "Inspection report", href: "#!" },
  { label: "Privacy rights", href: "#!" },
  { label: "Statement announcement", href: "#!" },
]);

const CONTACT_INFO = {
  phone: "0931-910-536",
  email: "ytsung99@gmail.com",
  address: "39 Donggyo-ro 27-gil, Mapo-gu, Seoul, South Korea",
};

export const CONTACTS = Object.freeze([
  {
    Icon: FaPhoneVolume,
    label: "Phone",
    text: CONTACT_INFO.phone,
    href: `tel:${CONTACT_INFO.phone.replace(/[^\d+]/g, "")}`,
  },
  {
    Icon: MdEmail,
    label: "Email",
    text: CONTACT_INFO.email,
    href: `mailto:${CONTACT_INFO.email}`,
  },
  {
    Icon: FaLandmark,
    label: "Address",
    text: CONTACT_INFO.address,
    href: `https://maps.google.com/?q=${encodeURIComponent(
      CONTACT_INFO.address
    )}`,
  },
]);

export const SOCIALS = Object.freeze([
  { Icon: FaLine, href: "#!", label: "LINE" },
  { Icon: LuInstagram, href: "#!", label: "Instagram" },
  { Icon: LuFacebook, href: "#!", label: "Facebook" },
]);
