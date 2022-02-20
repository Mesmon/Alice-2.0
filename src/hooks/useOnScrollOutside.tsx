import { useEffect } from "react";

const useOnScrollOutside = (handler: () => void) => {
  useEffect(() => {
    const handleWheel = () => {
      handler();
    };

    window.addEventListener("mousewheel", handleWheel, {
      passive: true,
    });

    return () => window.removeEventListener("mousewheel", handleWheel);
  }, [handler]);

  return <div></div>;
};

export default useOnScrollOutside;
