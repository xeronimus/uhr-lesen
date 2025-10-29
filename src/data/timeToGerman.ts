// Hour names in German (lowercase for composition)
export const hourNamesLc = [
  'zwölf', // 0 or 12
  'eins',
  'zwei',
  'drei',
  'vier',
  'fünf',
  'sechs',
  'sieben',
  'acht',
  'neun',
  'zehn',
  'elf'
];

// Hour names for 24-hour format (13-23)
export const hour24NamesLc = [
  'zwölf',
  'dreizehn',
  'vierzehn',
  'fünfzehn',
  'sechzehn',
  'siebzehn',
  'achtzehn',
  'neunzehn',
  'zwanzig',
  'einundzwanzig',
  'zweiundzwanzig',
  'dreiundzwanzig'
];

// Minute names in German (lowercase for composition)
export const minuteNamesLc = [
  '', // 0 is not used
  'eine',
  'zwei',
  'drei',
  'vier',
  'fünf',
  'sechs',
  'sieben',
  'acht',
  'neun',
  'zehn',
  'elf',
  'zwölf',
  'dreizehn',
  'vierzehn',
  'fünfzehn',
  'sechzehn',
  'siebzehn',
  'achtzehn',
  'neunzehn',
  'zwanzig',
  'einundzwanzig',
  'zweiundzwanzig',
  'dreiundzwanzig',
  'vierundzwanzig',
  'fünfundzwanzig',
  'sechsundzwanzig',
  'siebenundzwanzig',
  'achtundzwanzig',
  'neunundzwanzig',
  'dreißig',
  'einunddreißig',
  'zweiunddreißig',
  'dreiunddreißig',
  'vierunddreißig',
  'fünfunddreißig',
  'sechsunddreißig',
  'siebenunddreißig',
  'achtunddreißig',
  'neununddreißig',
  'vierzig',
  'einundvierzig',
  'zweiundvierzig',
  'dreiundvierzig',
  'vierundvierzig',
  'fünfundvierzig',
  'sechsundvierzig',
  'siebenundvierzig',
  'achtundvierzig',
  'neunundvierzig',
  'fünfzig',
  'einundfünfzig',
  'zweiundfünfzig',
  'dreiundfünfzig',
  'vierundfünfzig',
  'fünfundfünfzig',
  'sechsundfünfzig',
  'siebenundfünfzig',
  'achtundfünfzig',
  'neunundfünfzig'
];

export const addWordsLc = ['ein', 'viertel', 'nach', 'uhr', 'vor', 'halb', 'minute', 'Minuten'];

/**
 * Converts hour and minute to German spoken time format
 * @param hour - Hour (0-23)
 * @param minute - Minute (0-59)
 * @returns German spoken time string
 *
 * Examples:
 * - timeToGerman(6, 10) => "Zehn Minuten nach sechs"
 * - timeToGerman(4, 45) => "Viertel vor fünf"
 * - timeToGerman(3, 30) => "Halb vier"
 * - timeToGerman(12, 0) => "Zwölf Uhr"
 * - timeToGerman(17, 20) => "Siebzehn Uhr zwanzig"
 * - timeToGerman(13, 0) => "Dreizehn Uhr"
 */
export function timeToGerman(hour: number, minute: number): string {
  // Capitalize first letter
  const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

  // For afternoon/evening times (12-23), use 24-hour format
  if (hour >= 12) {
    const hourName = hour24NamesLc[hour - 12];

    if (minute === 0) {
      return capitalize(`${hourName} Uhr`);
    } else {
      const minuteName = minuteNamesLc[minute];
      return capitalize(`${hourName} Uhr ${minuteName}`);
    }
  }

  // For morning times (0-12), use traditional 12-hour format
  // Normalize hour to 12-hour format
  const hour12 = hour % 12;

  // Get current hour name
  const currentHourName = hourNamesLc[hour12];

  // Get next hour name (for "vor" and "halb")
  const nextHourName = hourNamesLc[(hour12 + 1) % 12];

  // Handle different minute cases
  if (minute === 0) {
    // Exact hour: "Sechs Uhr"
    // Special case: "eins" becomes "ein" for "ein Uhr"
    const hourForUhr = hour12 === 1 ? 'ein' : currentHourName;
    return capitalize(`${hourForUhr} Uhr`);
  } else if (minute === 15) {
    // Quarter past: "Viertel nach sechs"
    return capitalize(`Viertel nach ${currentHourName}`);
  } else if (minute === 30) {
    // Half: "Halb sieben" (refers to next hour!)
    return capitalize(`Halb ${nextHourName}`);
  } else if (minute === 45) {
    // Quarter to: "Viertel vor sieben"
    return capitalize(`Viertel vor ${nextHourName}`);
  } else if (minute < 30) {
    // Minutes past: "Zehn Minuten nach sechs"
    const minuteName = minuteNamesLc[minute];
    const minuteWord = minute === 1 ? 'Minute' : 'Minuten';
    return capitalize(`${minuteName} ${minuteWord} nach ${currentHourName}`);
  } else {
    // Minutes to: "Zehn Minuten vor sieben"
    const minutesUntilNextHour = 60 - minute;
    const minuteName = minuteNamesLc[minutesUntilNextHour];
    const minuteWord = minutesUntilNextHour === 1 ? 'Minute' : 'Minuten';
    return capitalize(`${minuteName} ${minuteWord} vor ${nextHourName}`);
  }
}
