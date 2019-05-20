import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  //맨 위에 있는 네비게이션 바
  return (
    <nav className="navbar navbar-dark bg-dark">
        <Link className="navbar-brand" to="/">
          To Do 리스트
        </Link>
    </nav>
  );
};

export default Navbar;
