/**
 * Conținut static pentru pagina /pachete care nu sunt pachete vandabile:
 * tarifele orare și bannerul „prima lună gratuită".
 */

export const hourlyRatesIntro =
  'Lucrările în afara pachetelor se tarifează orar, transparent: de la 35€/oră.';

export const hourlyRates: { label: string; rate: string }[] = [
  { label: 'Servicii grafică', rate: '35€ / oră' },
  { label: 'Consultanță marketing', rate: '60€ / oră' },
  { label: 'Development', rate: '75€ / oră' },
];

export const freeMonthBanner =
  'Prima lună de mentenanță gratuită la orice site nou construit de noi.';
