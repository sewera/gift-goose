import { LANGUAGE } from '../config'

const translations: Record<string, Record<string, string>> = {
  pl: {
    'Error: participantId is required': 'Błąd: identyfikator uczestnika jest wymagany',
    'Participant was not found': 'Uczestnik nie został znaleziony',
    'set your wish': 'ustaw preferencję',
    'not assigned': 'nieprzydzielony',
    Set: 'Ustaw',
    Edit: 'Edytuj',
    'There is a problem with updating your gift preference. Please try again':
      'Wystąpił problem z ustawieniem preferencji prezentu. Spróbuj ponownie',
    'Assigned receiver': 'Przydzielona osoba',
    'Put on the gift:': 'Umieść na prezencie',
    'No assigned receiver': 'Nie przydzielono odbiorcy',
    'Could not fetch participants. Check if the key is correct':
      'Błąd przy pobieraniu listy uczestników. Sprawdź czy klucz (key) jest poprawny',
    ID: 'Identyfikator',
    Name: 'Imię',
    'Desire ID (Gift ID)': 'Identyfikator preferencji (prezentu)',
    Excluded: 'Pominięty',
    none: 'brak',
    'Shuffle receivers': 'Przetasuj odbiorców',
    'Clear receivers': 'Wyczyść odbiorców',
    'There is a problem with updating receivers': 'Wystąpił problem z ustawieniem odbiorców',
    show: 'pokaż',
    hide: 'ukryj',
    hidden: 'ukryty',
  },
}

export function translate(str: string): string {
  if (LANGUAGE === 'en') {
    return str
  }

  return translations[LANGUAGE][str] ?? str
}
