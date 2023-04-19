export const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 999,
    display: "none",
  },
  aboveOverlay: {
    position: "relative",
    zIndex: 1000,
    padding: "20px",
    display: "block",
  },
  aboveOverlayHover: {
    outline: "100vh solid rgba(0, 0, 0, 0.3)",
  },
  experience: {
    width: "100%",
    fontSize: "12px",
    border: "none",
    backgroundColor: "transparent",
    outline: 0,
  },
};
