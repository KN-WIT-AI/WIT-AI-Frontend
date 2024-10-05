export async function getChatAnswer(
  chatId: string,
  message: string
): Promise<string> {
  const response = await fetch("https://www.sefaria.org/api/texts/random");
  const json = await response.json();
  return json.book as string;
}
