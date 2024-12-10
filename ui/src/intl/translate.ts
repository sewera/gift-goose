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
    'Prepare the following gift:': 'Przygotuj na prezent:',
    'Put the following ID on the gift:': 'Umieść na prezencie następujące oznaczenie:',
    'Assigned receiver': 'Przydzielony odbiorca',
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
    Error: 'Błąd',
    'The receiver did not set their desired gift': 'Odbiorca nie ustawił preferencji prezentu',
    'Your gift preference:': 'Twoja preferencja prezentu:',
    'Your mysterious gift receiver': 'Twój tajemniczy odbiorca prezentu',
  },
}

export function translate(str: string): string {
  if (LANGUAGE === 'en') {
    return str
  }

  return translations[LANGUAGE][str] ?? str
}
