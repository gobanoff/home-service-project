import { useState } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../router/consts";
import styles from "./BurgerMenu.module.scss";

const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    {
      href: ROUTES.HOME,
      label: "Home",
    },
    {
      href: ROUTES.SERVICES,
      label: "Services",
    },
    {
      href: ROUTES.ABOUT_US,
      label: "About Us",
    },
  ];

  return (
    <div className={styles.burgerMenu}>
      <button onClick={() => setIsOpen(!isOpen)} className={styles.burgerButton}>
        ☰
      </button>
      {isOpen && (
        <nav className={styles.burgerNav}>
          {links.map((link) => (
            <Link key={link.label} to={link.href} className={styles.link} onClick={() => setIsOpen(false)}>
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </div>
  );
};

export default BurgerMenu;
