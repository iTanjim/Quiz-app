function ResetColor() {
    const root = document.documentElement;
      root.style.setProperty("--color-val-inc", 50);
      root.style.setProperty("--color-val-dec", 153);
}

export default ResetColor