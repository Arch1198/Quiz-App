export const shuffleArray = (arrray: any[]) =>
  [...arrray].sort(() => Math.random() - 0.5);
