import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const Column = dynamic(import("../draggableColumns"), {
  ssr: false,
});

function App() {
  return (
    <div>
      <Column />
    </div>
  );
}

export default App;
