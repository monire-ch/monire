// Function to calculate the size for headings (h1 to h6)
export default function generateTypeScale(ratio: number) {
  let scale = [];
  for (let i = 1; i <= 6; i++) {
    // Calculate font size: ratio^(6 - i)
    const fontSize = Math.pow(ratio, 6 - i);
    scale.push(fontSize.toFixed(2)); // Round to 2 decimal places
  }
  return scale;
}
