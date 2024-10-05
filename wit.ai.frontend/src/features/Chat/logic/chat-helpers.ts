export async function typeText(text: string, delay: number, onTextEmitted: (text: string) => void) {
  let textToDisplay = "";

  for (let character of text) {
    textToDisplay += character;
    onTextEmitted(textToDisplay);
    await delayTask(delay);
  }
}

export async function delayTask(delay: number) {
  await new Promise((resolve) => setTimeout(resolve, delay)); 
}

export function uuidv4() {
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
    (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
  );
}