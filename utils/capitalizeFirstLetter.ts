export function capitalizeFirstLetter(string: string) {
    const actualString = String(string)
    return actualString.charAt(0).toUpperCase() + actualString.slice(1);
  }
  