import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";
import moonSvg from "../../public/svg/moon.svg";
import sunSvg from "../../public/svg/sun.svg";

function DarkMode() {
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
    <div onClick={switchTheme}>
      {theme === "light" ? (
        <Image alt="dark mode" src={moonSvg} layout="fill" />
      ) : (
        <Image alt="light mode" src={sunSvg} layout="fill" />
      )}
    </div>
  );
}

export default DarkMode;
