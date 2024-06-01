import React, { useEffect } from "react";
import { useLocale } from "../../_providers/Locale";
import classes from "./index.module.scss";

const LanguageToggle: React.FC<{ textColor: string }> = ({ textColor }) => {
  const { locale, toggleLocale } = useLocale();
  useEffect(() => {
    document.querySelectorAll("option").forEach((option) => {
      option.setAttribute("selected", "false");
      if (option.value === locale) {
        option.setAttribute("selected", "true");
      }
    });
  }, []);

  return (
    <>
      <div className={classes.dropdown}>
        <button  className={classes.dropbtn + ` ${textColor}`}>locale</button>
        <div className={classes.dropdownContent + ` ${textColor}`}>
          <p onClick={()=>{toggleLocale('en')}}>English</p>
          <p onClick={()=>{toggleLocale('ar')}}>عربي</p>
        </div>
      </div>
    </>
  );
};

export default LanguageToggle;
