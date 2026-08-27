export type TCreateContact = {
  fullName: string;
  enquiryType?: string;
  company?: string;
  email: string;
  phone?: string;
  country?: string;
  message?: string;
  consentMarketing?: boolean;
};

export type TContact = TCreateContact & {
  status: 'pending' | 'contacted' | 'resolved';
  createdAt?: Date;
  updatedAt?: Date;
};
