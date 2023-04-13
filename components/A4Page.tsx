// A4Page.tsx
import React, { useRef, useState, useEffect, ReactNode } from "react";

interface A4PageProps {
  children: ReactNode;
}

const A4Page: React.FC<A4PageProps> = ({ children }) => {
  const [pages, setPages] = useState<number[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);

  const A4PageStyle = {
    width: "210mm",
    height: "297mm",
    padding: "20mm",
    border: "1px solid #000",
    boxSizing: "border-box",
    position: "relative",
    pageBreakAfter: "always",
    overflow: "hidden",
  };

  const A4PageContentStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: "hidden",
  };

  useEffect(() => {
    if (contentRef.current) {
      const contentHeight = contentRef.current.scrollHeight;
      const numPages = Math.ceil(contentHeight / (297 - 40));

      setPages(Array.from({ length: numPages }, (_, i) => i));
    }
  }, [children]);

  return (
    <div>
      {pages.map((_, pageIndex) => (
        <div
          key={pageIndex}
          style={{
            width: "210mm",
            height: "297mm",
            padding: "20mm",
            border: "1px solid #000",
            boxSizing: "border-box",
            position: "relative",
            pageBreakAfter: "always",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              overflow: "hidden",
              transform: `translateY(-${pageIndex * (297 - 40)}mm)`,
            }}
            ref={pageIndex === 0 ? contentRef : null}
          >
            {children}
          </div>
        </div>
      ))}
    </div>
  );
};

export default A4Page;
