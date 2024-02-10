import React from "react";
import './HeaderNavbar.css'

function HeaderNavbar() {
  return (
    <div className="headerArea">
      <nav class="px-3 navbar justify-content-end text-white">
        {/* <a class="navbar-brand">Navbar</a> */}
        <form class="form-inline">
          <button class="btn btn-outline-danger my-2 my-sm-0">
          Signout
          </button>
        </form>
      </nav>
    </div>
  );
}

export default HeaderNavbar;
