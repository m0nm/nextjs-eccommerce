import Image from "next/image";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

import moonSvg from "../../public/svg/moon.svg";
import sunSvg from "../../public/svg/sun.svg";

function DarkMode({ onSidebar }: { onSidebar?: boolean }) {
  // increase the clickable area if on mobile
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  // theme ---
  const { theme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  const switchTheme = () => {
    if (isMounted) {
      setTheme(theme === "light" ? "dark" : "light");
    }
  };
  return (
    <div
      className={`cursor-pointer relative w-8 h-8
      ${isMobile && "w-7 h-7"} 
      ${onSidebar && "before:w-48 before:h-6 before:absolute"}`}
      onClick={switchTheme}
    >
      {theme === "light" ? (
        <Image alt="dark mode" src={moonSvg} layout="fill" />
      ) : (
        <Image alt="light mode" src={sunSvg} layout="fill" />
      )}
    </div>
  );
}

export default DarkMode;
