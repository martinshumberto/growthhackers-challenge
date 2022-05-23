import { TextareaHTMLAttributes } from 'react';
import { UseFormRegisterReturn, FieldErrors } from 'react-hook-form';

interface Props extends TextareaHTMLAttributes<any> {
  fullWidth?: boolean;
  label?: string;
  register?: (name: string) => UseFormRegisterReturn;
  errors?: FieldErrors;
  skin?: 'default' | 'primary';
  mask?: 'number' | 'text';
  defaultValue?: string;
  onValueChange?: (target: any) => void;
}

export default function Textarea({
  register = () => null,
  errors = {},
  name,
  fullWidth,
  skin = 'default',
  ...props
}: Props) {
  const registerInput = register ? register(name) : null;
  const errorMessage: string = errors ? errors[name]?.message : '';

  const skins = {
    default: {
      bg: 'bg-white',
      border:
        'border focus:ring-2 focus:ring-primary-300 focus:border-transparent',
      text: 'placeholder-gray-300 text-gray-800',
    },
    primary: {
      bg: 'bg-primary-200',
      border: 'focus:ring-2 focus:ring-primary-300 focus:border-transparent',
      text: 'placeholder-gray-300 text-gray-800',
    },
  };
  const inputSkin = skins[skin];

  return (
    <label
      className={`flex flex-col text-primary font-medium
      ${fullWidth ? 'w-full' : 'w-max'}
      `}
    >
      <span className="uppercase text-xs font-bold">{props.label}</span>
      <div className="relative w-full flex flex-wrap items-stretch">
        <textarea
          {...registerInput}
          {...props}
          className={`
            outline-none
            rounded-lg
            py-2 px-3
            ${props.disabled && 'cursor-not-allowed opacity-75 text-gray-400'}
            ${fullWidth ? 'w-full' : 'w-max'}
            ${skin === 'primary' ? 'my-2' : 'my-1'}
            ${inputSkin.bg}
            ${inputSkin.border}
            ${inputSkin.text}
            ${errorMessage ? 'focus:ring-2 focus:ring-red-300' : ''}
          `}
          rows={props.rows || 5}
        />
      </div>

      {!!errorMessage && (
        <div className="text-red-500 text-sm px-3">{errorMessage}</div>
      )}
    </label>
  );
}
