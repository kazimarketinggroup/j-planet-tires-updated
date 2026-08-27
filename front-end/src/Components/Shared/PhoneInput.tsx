import { useState } from 'react';
import PhoneInputLib from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import './phone-input.css';

interface PhoneInputProps {
  name?: string;
  className?: string;
  placeholder?: string;
  defaultCountry?: 'GB' | 'AE' | 'IQ' | string;
  size?: 'default' | 'compact';
}

// International phone field built on react-phone-number-input: a country selector
// with real flag icons + dial codes for every country, plus formatting. The
// selected E.164 value is mirrored into a hidden field (`name`) so plain form
// submission still sees the full number, e.g. "+447700900123".
const PhoneInput = ({
  name = 'phone',
  className = '',
  placeholder,
  defaultCountry = 'GB',
  size = 'default',
}: PhoneInputProps) => {
  const [value, setValue] = useState<string | undefined>();

  return (
    <div className={`jp-phone jp-phone--${size} ${className}`}>
      <PhoneInputLib
        international
        countryCallingCodeEditable={false}
        defaultCountry={defaultCountry as never}
        value={value}
        onChange={setValue}
        placeholder={placeholder}
      />
      <input type="hidden" name={name} value={value ?? ''} />
    </div>
  );
};

export default PhoneInput;
