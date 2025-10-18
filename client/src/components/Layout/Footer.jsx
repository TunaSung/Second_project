import { memo } from "react";
import { FaRegCopyright } from "react-icons/fa";
import { RIGHTS, CONTACTS, SOCIALS } from "../Data/data";

function Footer() {
  return (
    <footer id="footer" className="py-10 font-bold bg-[#555] text-[#ccc]">
      <div
        id="container"
        className="container-mid grid grid-rows-[1fr_auto] grid-cols-2 gap-8 max-sm:grid-cols-1"
      >
        <nav
          aria-label="Legal"
          className="col-span-2 grid grid-cols-3 gap-rwd max-sm:grid-cols-2"
        >
          {RIGHTS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-center text-xl max-sm:text-sm hover:text-[var(--primary-color)] transition-colors duration-200"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <address className="not-italic space-y-3">
          {CONTACTS.map(({ Icon, label, text, href }) => (
            <div key={label} className="flex items-center gap-2">
              <Icon className="text-3xl max-sm:text-2xl" aria-hidden="true" />
              {label === "Address" ? (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${label} in Google Maps`}
                  className="text-xl max-sm:text-sm hover:text-[var(--primary-color)] transition-colors"
                  title="Open in Google Maps"
                >
                  {text}
                </a>
              ) : (
                <a
                  href={href}
                  aria-label={label}
                  className="text-xl max-sm:text-sm hover:text-[var(--primary-color)] transition-colors"
                >
                  {text}
                </a>
              )}
            </div>
          ))}

          <div className="flex items-center gap-2">
            <FaRegCopyright
              className="text-3xl max-sm:text-2xl"
              aria-hidden="true"
            />
            <span className="text-xl max-sm:text-sm">
              2025 Tuna Sung. All rights reserved.
            </span>
          </div>
        </address>

        <div
          id="socials"
          className="flex flex-col items-center justify-between gap-6 max-sm:gap-4"
        >
          {SOCIALS.map(({ Icon, href, label }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="hover:text-[var(--primary-color)] transition-colors duration-200"
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
            >
              <Icon className="text-4xl max-sm:text-2xl" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
export default memo(Footer);
