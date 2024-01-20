import Link from "next/link";

const links = [
  {
    href: "/chat",
    label: "chat",
  },
  {
    href: "/images",
    label: "images",
  },
  {
    href: "/tours",
    label: "tours",
  },
  {
    href: "/tours/new-tour",
    label: "new tour",
  },
  {
    href: "/pricing",
    label: "pricing",
  },
  {
    href: "/faq",
    label: "FAQ",
  },
  {
    href: "/terms",
    label: "terms of use",
  },
  {
    href: "/profile",
    label: "profile",
  },
];

const NavLinks = () => {
  return (
    <ul className="menu text-base-content gap-1">
      {links.map((link) => {
        return (
          <li key={link.href}>
            <Link href={link.href} className="capitalize">
              {link.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default NavLinks;
