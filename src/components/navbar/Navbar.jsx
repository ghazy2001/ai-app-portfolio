import { RiMenu3Line, RiCloseLine } from "react-icons/ri";

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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
      <Link to="/portfolio">أعمالنا</Link>
    </p>
    <p>
      <Link to="/blog">المدونة</Link>
    </p>

    <p>
      <Link to="/careers">الوظائف</Link>
    </p>
  </>
);

const Navbar = () => {
  const [togglemenu, settogglemenu] = useState(false);
  const [user, setUser] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

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

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <div className={`MN__navbar ${scrolled ? "navbar-hidden" : ""}`}>
      <div className="MN__navbar-links">
        <div className="MN__navbar-links_logo">
          <h1 className="gradient__text">MARKETING AGENCY</h1>
        </div>
        <div className="MN__navbar-links_container">
          <Menu />
        </div>
      </div>
      <div className="MN__navbar-sign">
        {user ? (
          <p>
            <button type="button" onClick={handleLogout} style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', fontFamily: 'var(--font-family)', fontSize: '18px', fontWeight: '500', textTransform: 'capitalize', lineHeight: '25px' }}>تسجيل خروج</button>
          </p>
        ) : (
          <p>
            <Link to="/auth">تسجيل الدخول</Link>
          </p>
        )}
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
                {user ? (
                  <p>
                    <button type="button" onClick={handleLogout} style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', fontFamily: 'var(--font-family)', fontSize: '18px', fontWeight: '500', textTransform: 'capitalize', lineHeight: '25px' }}>تسجيل خروج</button>
                  </p>
                ) : (
                  <p>
                    <Link to="/auth">تسجيل الدخول</Link>
                  </p>
                )}
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
