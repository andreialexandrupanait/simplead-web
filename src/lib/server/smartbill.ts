import { getIntegration } from './settings';

const SMARTBILL_API = 'https://ws.smartbill.ro/SBORO/api/invoice';

export type InvoiceInput = {
  clientName: string;
  clientEmail: string;
  productName: string;
  /** Preț final (cu TVA inclus dacă firma e plătitoare). */
  amount: number;
  currency: string;
};

export type InvoiceResult =
  | { issued: true; series: string; number: string }
  | { issued: false; reason: string };

/**
 * Emite o factură prin SmartBill Cloud API (best-effort: orice problemă e
 * raportată, nu aruncată). e-Factura e gestionată de SmartBill din contul lor.
 * TVA: configurabilă din /admin/integrari (taxName + taxPercent); implicit
 * „Normala" / 21. Pentru neplătitor de TVA setează procentul 0 în admin.
 */
export async function issueInvoice(input: InvoiceInput): Promise<InvoiceResult> {
  const smartbill = await getIntegration('smartbill');
  const email = smartbill.email.value;
  const token = smartbill.token.value;
  const cif = smartbill.cif.value;
  const series = smartbill.series.value;
  if (!email || !token || !cif || !series) {
    return { issued: false, reason: 'SmartBill neconfigurat (email/token/CIF/serie).' };
  }

  const taxName = smartbill.taxName.value || 'Normala';
  const taxPercent = Number.parseFloat(smartbill.taxPercent.value || '21');

  const payload = {
    companyVatCode: cif,
    seriesName: series,
    isDraft: false,
    sendEmail: true,
    email: { to: input.clientEmail },
    client: {
      name: input.clientName || input.clientEmail,
      email: input.clientEmail,
      isTaxPayer: false,
      country: 'Romania',
      saveToDb: true,
    },
    products: [
      {
        name: input.productName,
        isService: true,
        measuringUnitName: 'buc',
        quantity: 1,
        price: input.amount,
        isTaxIncluded: true,
        taxName,
        taxPercentage: Number.isFinite(taxPercent) ? taxPercent : 21,
        currency: input.currency,
        saveToDb: false,
      },
    ],
  };

  try {
    const auth = Buffer.from(`${email}:${token}`).toString('base64');
    const res = await fetch(SMARTBILL_API, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(15_000),
    });
    const body = (await res.json().catch(() => ({}))) as {
      series?: string;
      number?: string;
      errorText?: string;
    };
    if (!res.ok || body.errorText) {
      const reason = body.errorText || `SmartBill a răspuns ${res.status}.`;
      console.error('[smartbill] Emiterea facturii a eșuat:', reason);
      return { issued: false, reason };
    }
    return { issued: true, series: body.series ?? series, number: body.number ?? '' };
  } catch (err) {
    console.error('[smartbill] Emiterea facturii a eșuat:', err);
    return { issued: false, reason: 'Eroare de rețea sau timeout spre SmartBill.' };
  }
}
