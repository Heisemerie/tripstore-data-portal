export interface MongoId {
  $oid: string;
}

export interface MongoDecimal {
  $numberDecimal: string;
}

export interface User {
  _id: MongoId;
  firstname: string;
  lastname: string;
  password?: string; // Often optional when sending data to the frontend for security
  email: string;
  phone_number: string;
  user_type: "admin" | "user" | "vendor"; // Defined as a union based on "admin"
  social_auth: boolean;
  status: "active" | "inactive" | "suspended";
  address: string;
  city: string;
  state: string;
  __v: number;
  points: number;
  total_items_purchased: number;
  total_purchases: MongoDecimal;
}
