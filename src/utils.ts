export function getFontColorFromBackgroundColor(
  backgroundColor: string
): string {
  // Convert hex to RGB
  const hexToRgb = (hex: string) =>
    hex
      .replace(
        /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
        (m, r, g, b) => "#" + r + r + g + g + b + b
      )
      .substring(1)
      .match(/.{2}/g)
      ?.map((x) => parseInt(x, 16));

  if (
    !backgroundColor ||
    backgroundColor.length !== 7 ||
    backgroundColor[0] !== "#"
  ) {
    throw new Error("Invalid hex color code");
  }

  const [r, g, b] = hexToRgb(backgroundColor);

  // Calculate luminance using relative luminance formula
  const luminance =
    0.2126 * (r / 255) + 0.7152 * (g / 255) + 0.0722 * (b / 255);

  // Choose black or white based on luminance
  return luminance > 0.5 ? "#000" : "#fff";
}

export function generateRandomHexColor(): string {
  // Generate random RGB values
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);

  // Convert RGB to hex
  const hexRed = red.toString(16).padStart(2, "0");
  const hexGreen = green.toString(16).padStart(2, "0");
  const hexBlue = blue.toString(16).padStart(2, "0");

  // Concatenate hex values
  const hexColor = `#${hexRed}${hexGreen}${hexBlue}`;

  return hexColor;
}
