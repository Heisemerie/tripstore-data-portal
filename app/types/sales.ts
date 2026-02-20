export interface MongoId {
  $oid: string;
}

export interface MongoDate {
  $date: string;
}

export interface SalesRep {
  id: string; // Note: This appears as a raw string in your JSON, not an $oid object
  name: string;
  email: string;
}

export interface OrderItem {
  product: string;
  quantity: number;
  price: number;
  _id: MongoId;
}

export interface PaymentDetails {
  transactionId: string;
  cardType: string | "N/A";
  first6Digits: string | "N/A";
  last4Digits: string | "N/A";
}

export interface Payment {
  type: "Transfer" | "Card" | "Cash" | string;
  details: PaymentDetails;
}

export interface Order {
  _id: MongoId;
  salesRep: SalesRep;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  total: number;
  payment: Payment;
  orderNumber: string;
  timestamp: MongoDate;
  __v: number;
}
