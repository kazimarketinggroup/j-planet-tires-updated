export type TBookingItem = {
  size: string;
  quantity: number;
  sizeId?: string;
};

export type TCreateBooking = {
  tireId?: string | null;
  tireName: string;
  items: TBookingItem[];
  totalQuantity?: number;
  fullName: string;
  company?: string;
  email: string;
  phone?: string;
  country?: string;
  role?: string;
  notes?: string;
};

export type TBooking = TCreateBooking & {
  totalQuantity: number;
  status: 'pending' | 'contacted' | 'resolved';
  createdAt?: Date;
  updatedAt?: Date;
};
