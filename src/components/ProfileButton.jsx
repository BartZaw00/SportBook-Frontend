import React, { useEffect, useRef, useState } from "react";

import { TfiMenu } from "react-icons/tfi";
import { CgProfile } from "react-icons/cg";

import Menu from "../containers/Menu";

const ProfileButton = ({ handleModalOpenClick }) => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setToggleMenu(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [menuRef]);

  const handleOptionClick = () => {
    setToggleMenu(false);
  };

  return (
    <div
      className="relative pr-1 pl-3 py-1 flex items-center gap-2 border border-gray-300 rounded-full shadow cursor-pointer hover:shadow-md"
      ref={menuRef}
      onClick={() => {
        setToggleMenu(!toggleMenu);
      }}
    >
      <TfiMenu size={15} />
      <CgProfile size={25} />
      {toggleMenu && (
        <Menu
          handleOptionClick={handleOptionClick}
          handleModalOpenClick={handleModalOpenClick}
        />
      )}
    </div>
  );
};

export default ProfileButton;