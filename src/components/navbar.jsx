import React from "react";
import "../../src/App.css";

function Navbar() {
  return (
    <>
      <div className="bg-white flex w-full justify-between p-2">
        <div className="logo">ABCDE</div>
        <div className="list">
          <ul className="flex gap-10 list-none">
            <li ><a className="hover:font-bold" href="/">HOME</a></li>
            <li><a className="hover:font-bold"  href="/">ABOUT</a></li>
            <li><a className="hover:font-bold"  href="/">CONTACT</a></li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Navbar;
