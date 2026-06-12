/**
 * Conținut static pentru pagina /pachete care nu sunt pachete vandabile:
 * tarifele orare și bannerul „prima lună gratuită".
 */

export const hourlyRatesIntro =
  'Pentru lucrări mici sau în afara pachetelor lucrăm la oră, transparent — știi exact cât plătești, fără surprize.';

export const hourlyRates: { label: string; amount: string; period: string }[] = [
  { label: 'Servicii grafică', amount: '35€', period: '/oră' },
  { label: 'Consultanță marketing', amount: '60€', period: '/oră' },
  { label: 'Development', amount: '75€', period: '/oră' },
];

export const freeMonthBanner =
  'Prima lună de mentenanță gratuită la orice site nou construit de noi.';
