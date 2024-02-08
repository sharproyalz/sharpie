export default function TruncateWord({ word }: { word: string }) {
  let maxLength = 25;
  if (word.length > maxLength) {
    return (
      word.slice(0, maxLength - 3) +
      "..." +
      word.slice(word.length - 2, word.length - 1)
    );
  }
  return word;
}
