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