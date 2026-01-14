import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import logo from "../../assets/logo2.png";

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";

const Menu = () => (
  <>
    <p>
      <Link to="/">Home</Link>
    </p>
    <p>
      <Link to="/about">About Us</Link>
    </p>

    <p>
      <Link to="/services">Services</Link>
    </p>

    <p>
      <Link to="/portfolio">Portfolio</Link>
    </p>
    <p>
      <Link to="/blog">Blog</Link>
    </p>

    <p>
      <Link to="/careers">Careers</Link>
    </p>
  </>
);

const Navbar = () => {
  const [togglemenu, settogglemenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  // Scroll behavior: hide on scroll down, show on scroll up
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // If at the top, always show navbar
      if (currentScrollY < 10) {
        setScrolled(false);
      }
      // If scrolling down, hide navbar
      else if (currentScrollY > lastScrollY) {
        setScrolled(true);
      }
      // If scrolling up, show navbar
      else {
        setScrolled(false);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`MN__navbar ${scrolled ? "navbar-hidden" : ""}`}>
      <div className="MN__navbar-links">
        <div className="MN__navbar-links_logo">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <div className="MN__navbar-links_container">
          <Menu />
        </div>
      </div>
      <div className="MN__navbar-sign">
        <Link to="/contact">
          <button type="button">Contact Us</button>
        </Link>
      </div>
      <div className="MN__navbar-menu">
        {togglemenu ? (
          <RiCloseLine
            color="#fff"
            size={27}
            onClick={() => {
              settogglemenu(false);
            }}
          />
        ) : (
          <RiMenu3Line
            color="#fff"
            size={27}
            onClick={() => {
              settogglemenu(true);
            }}
          />
        )}
        {togglemenu && (
          <div className="MN__navbar-menu_container scale-up-center">
            <div className="MN__navbar-menu_container-links">
              <Menu />
              <div className="MN__navbar-menu_container-links-sign">
                <Link to="/contact">
                  <button type="button">Contact Us</button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
