import { createInvoice } from "./createInvoice.js";

const invoice = {
  shipping: {
    name: "SUNIL",
    address: "KOKAPET",
    city: "HYDERABAD",
    state: "TS",
    postal_code: "500075",
  },
  items: [
    {
      item: "TC 100",
      description: "Toner Cartridge",
      quantity: 2,
      amount: 6000,
    },
    {
      item: "USB_EXT",
      description: "USB Cable Extender",
      quantity: 1,
      amount: 2000,
    },
  ],
  subtotal: 8000,
  paid: 0,
  invoice_nr: 1234,
};

createInvoice(invoice, "invoice.pdf");
