import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import Toggle from "react-toggle";
import "react-toggle/style.css";
import './scss/darkmode.scss'

const DarkModeToggle = () => {
    const [isDark, setIsDark] = useState(true);
  
    const systemPrefersDark = useMediaQuery(
      {
        query: "(prefers-color-scheme: dark)",
      },
      undefined,
      (isSystemDark) => setIsDark(isSystemDark)
    );
  
    useEffect(() => { 
      if (isDark) { 
        document.body.classList.add('dark')
      }
      else { 
        document.body.classList.remove('dark')
      }
     }, [isDark]);
  
    return (
      <Toggle
        checked={isDark}
        onChange={({ target }) => setIsDark(target.checked)}
        icons={{ checked: "🌙", unchecked: "🔆" }}
        aria-label="Dark mode toggle"
      />
    );
};
  
export default DarkModeToggle;