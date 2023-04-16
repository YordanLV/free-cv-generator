import { useState, useRef, useLayoutEffect } from "react";

function useCurrentHeight(): [
  number | string,
  React.RefObject<HTMLDivElement>
] {
  const [currentHeight, setCurrentHeight] = useState<number | string>("");
  const pageRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    function updateHeight() {
      if (pageRef.current) {
        setCurrentHeight(pageRef.current.offsetHeight);
      }
      requestAnimationFrame(updateHeight);
    }

    updateHeight();
    return () => cancelAnimationFrame(updateHeight);
  }, []);

  return [currentHeight, pageRef];
}

export default useCurrentHeight;
