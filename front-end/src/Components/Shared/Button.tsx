import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps {
  to: string;
  children: ReactNode;
  variant?: 'primary' | 'outline';
  size?: 'default' | 'slim';
  className?: string;
}

const BASE =
  'inline-flex items-center justify-center font-semibold text-center transition-colors';

const SIZES: Record<NonNullable<ButtonProps['size']>, string> = {
  default: 'px-6 py-2 text-sm',
  slim: 'px-5 py-1.5 text-sm',
};

const VARIANTS: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary: 'bg-[#1148c6] text-white hover:bg-[#0d39a0]',
  outline: 'border border-white/45 text-white hover:border-white',
};

const Button = ({ to, children, variant = 'primary', size = 'default', className = '' }: ButtonProps) => (
  <Link to={to} className={`${BASE} ${SIZES[size]} ${VARIANTS[variant]} ${className}`}>
    {children}
  </Link>
);

export default Button;
