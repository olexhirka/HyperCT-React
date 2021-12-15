import { ChangeEvent, ReactElement } from 'react';

interface FieldProps {
  label: string;
  id: string;
  type: string;
  placeholder: string;
  value: string;
  autoComplete: string;
  required: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const StripeField = ({
  label, id, type, placeholder, required,
  autoComplete, value, onChange,
}: FieldProps): ReactElement => (
  <div className="FormRow">
    <label htmlFor={id} className="FormRowLabel">
      {label}
    </label>
    <input
      className="FormRowInput"
      id={id}
      type={type}
      placeholder={placeholder}
      required={required}
      autoComplete={autoComplete}
      value={value}
      onChange={onChange}
    />
  </div>
);
