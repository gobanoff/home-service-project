import { useNavigate, Link } from "react-router-dom";
import { ROUTES } from "../../router/consts";
import Button from "../common/Button";
import styles from "./Topbar.module.scss";
import Logo from "../../assets/logo.svg";
import { useContext, useState } from "react";
import Avatar from "../common/Avatar";
import { UserContext } from "@/context/UserContext";

const Topbar = () => {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();
  const [dropdownVisible, setDropdownVisible] = useState(false);

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
    <header className={styles.topbar}>
      <div className={styles.leftSide}>
        <Link to={ROUTES.HOME}>
          <img src={Logo} alt="logo" />
        </Link>
        <nav className={styles.navigation}>
          {links.map((link) => (
            <Link key={link.label} to={link.href} className={styles.link}>
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className={styles.rightSide}>
        {user ? (
          <div
            className={styles.avatarContainer}
            onMouseEnter={() => setDropdownVisible(true)}
            onMouseLeave={() => setDropdownVisible(false)}
          >
            <Avatar>{user.name[0]}</Avatar>
            {dropdownVisible && (
              <div className={styles.dropdownMenu}>
                <Link to={ROUTES.MY_ACCOUNT} className={styles.dropdownItem}>
                  My Account
                </Link>
                <Link 
                //to={ ROUTES. MY_BOOKINGS}
                  to={`/bookings/user/${user.email}`}
                  className={styles.dropdownItem}
                >
                  My booking
                </Link>
                <Link
                  to={ROUTES.HOME}
                  onClick={logout}
                  className={styles.dropdownItem}
                >
                  Logout
                </Link>
              </div>
            )}
          </div>
        ) : (
          <Button onClick={() => navigate(ROUTES.LOGIN)} large>
            Login / Sign Up
          </Button>
        )}
      </div>
    </header>
  );
};

export default Topbar;
