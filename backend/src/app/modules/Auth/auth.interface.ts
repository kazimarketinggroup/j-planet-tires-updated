// Login User
export type TLoginUser = {
  email: string;
  password: string;
  rememberMe?: boolean; 
};

// Register User
export type TRegisterUser = {
  fullName: string;
  companyName: string;
  email: string;
  password: string;
  confirmPassword: string;
  rememberMe?: boolean;
};
