import { RiMenu3Line, RiCloseLine } from "react-icons/ri";

import { useState } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

const Menu = () => (
  <>
    <p>
      <Link to="/">الرئيسية</Link>
    </p>
    <p>
      <Link to="/about">من نحن</Link>
    </p>

    <p>
      <Link to="/services">خدماتنا</Link>
    </p>

    <p>
      <Link to="/features">الميزات</Link>
    </p>
    <p>
      <Link to="/blog">المدونة</Link>
    </p>

    <p>
      <Link to="/contact">الوظائف</Link>
    </p>
  </>
);
const Navbar = () => {
  const [togglemenu, settogglemenu] = useState(false);

  return (
    <div className="MN__navbar">
      <div className="MN__navbar-links">
        <div className="MN__navbar-links_logo">
          <h1 className="gradient__text">MARKETING AGENCY</h1>
        </div>
        <div className="MN__navbar-links_container">
          <Menu />
        </div>
      </div>
      <div className="MN__navbar-sign">
        <Link to="/contact">
          <button type="button">تواصل معنا</button>
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
                  <button type="button">تواصل معنا</button>
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
