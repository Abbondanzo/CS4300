export const getElementValue = (query: string) => {
  const element = document.querySelector(query) as HTMLInputElement;
  if (element === null) {
    throw new Error(`Element ${query} does not exist`);
  }
  return element.value;
};
