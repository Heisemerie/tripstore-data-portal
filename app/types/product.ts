export interface MongoDate {
  $date: string;
}
export interface MongoId {
  $oid: string;
}

export interface Category {
  name: string;
  _id: MongoId | string;
}

export interface Color {
  _id: string;
  color: string;
  amount: number;
}

export interface Measurement {
  _id: string;
  size: string;
  costPrice: number;
  price: number;
  discount: number | null;
  colors: Color[];
  barcode: string;
}

export interface Product {
  _id: string;
  name: string;
  category: Category[];
  gender: string;
  brand: string;
  type: string;
  description: string;
  images: (string | null)[]; // Handled nulls
  measurement_type: string;
  measurements: Measurement[];
  barcode: string;
  additionalInformation?: string;
  shippingInformation?: string;
  createdAt: MongoDate;
  updatedAt: MongoDate;
  __v: number;
  restockHistory?: [];
}
