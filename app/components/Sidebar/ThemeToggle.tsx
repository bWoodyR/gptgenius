"use client";

import { useState } from "react";
import { BsMoonFill, BsSunFill } from "react-icons/bs";

const themes = {
  winter: "winter",
  dark: "dark",
};

const ThemeToggle = () => {
  const [theme, setTheme] = useState(themes.dark);

  const toggleTheme = () => {
    const newTheme = theme === "winter" ? themes.dark : themes.winter;
    document.documentElement.setAttribute("data-theme", newTheme);
    setTheme(newTheme)
  };

  return (
    <button className="btn btn-sm btn-outline" onClick={toggleTheme}>
      {theme === "winter" ? <BsMoonFill className="h-4 w-4" /> : <BsSunFill className="h-4 w-4" />}
    </button>
  );
};

export default ThemeToggle;
