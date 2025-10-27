interface FormData {
  sku: string;
  name: string;
  batch: string;
  expiry: string;
  qty: number;
  location: string;
}

interface LocationOption {
  id: string;
  label: string;
}

export type { FormData, LocationOption };
