import { RefObject, useEffect, useState } from "react";

const useScroll = (ref: RefObject<HTMLDivElement>) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isLastScroll, setIsLastScroll] = useState(false);

  const handleScroll = () => {
    if (ref.current) {
      setScrollPosition(ref.current.scrollTop);
      setIsLastScroll(
        ref.current.scrollHeight - ref.current.scrollTop ===
          ref.current.clientHeight,
      );
    }
  };

  useEffect(() => {
    const mainContent = ref.current;

    if (mainContent) {
      mainContent.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (mainContent) {
        mainContent.removeEventListener("scroll", handleScroll);
      }
    };
  }, [ref]);

  return { scrollPosition, isLastScroll };
};

export default useScroll;
