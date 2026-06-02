import { ToggleLeft, ToggleRight } from "lucide-react";
// import React, { useState } from "react";
type HandleToggleProps = {
  handleToggle: () => void;
  toggle: boolean;
};
const ToggleSwitch = ({ handleToggle, toggle }: HandleToggleProps) => {
  return (
    <div>
      <button onClick={handleToggle} className={`${toggle?"text-white":"text-black"} mx-2`}>
        {toggle ? <ToggleRight /> : <ToggleLeft />}
      </button>
    </div>
  );
};

export default ToggleSwitch;
