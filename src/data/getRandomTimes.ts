export function getRandomHour24() {
  return getRandomInt(0, 24); // 0....23
}

export function getRandomHour12() {
  return getRandomInt(0, 12); // 0....11
}

export function getRandomMinute() {
  return getRandomInt(0, 60); // 0....59
}

export function getRandomInt(min: number, max: number) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}
