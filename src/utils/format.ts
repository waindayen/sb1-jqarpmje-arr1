export function formatCurrency(amount: number, currency: string = 'EUR'): string {
  const currencyMap: { [key: string]: { locale: string, currency: string } } = {
    'EUR': { locale: 'fr-FR', currency: 'EUR' },
    'USD': { locale: 'en-US', currency: 'USD' },
    'XOF': { locale: 'fr-FR', currency: 'XOF' }
  };

  const { locale, currency: currencyCode } = currencyMap[currency] || currencyMap['EUR'];

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode,
  }).format(amount);
}