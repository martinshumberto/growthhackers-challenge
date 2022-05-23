import { InputHTMLAttributes } from 'react';
import { UseFormRegisterReturn, FieldErrors } from 'react-hook-form';

interface Props extends InputHTMLAttributes<any> {
  fullWidth?: boolean;
  label?: string;
  register?: (name: string) => UseFormRegisterReturn;
  errors?: FieldErrors;
  skin?: 'default';
  markRequired?: boolean;
}

export default function Input({
  register = () => null,
  errors = {},
  name,
  fullWidth,
  skin = 'default',
  markRequired = false,
  ...props
}: Props) {
  const registerInput = register ? register(name) : null;
  const errorMessage: string = errors ? errors[name]?.message : '';

  const skins = {
    default: {
      bg: 'bg-white',
      border:
        'border focus:ring-2 focus:ring-primary-300 focus:border-transparent',
      text: 'placeholder-primary-300 text-primary',
    },
  };
  const inputSkin = skins[skin];

  const validateFieldNumberOnly = (evt) => {
    const theEvent = evt || window.event;
    let key;
    if (theEvent.type === 'paste') {
      key = evt.clipboardData.getData('text/plain');
    } else {
      key = theEvent.keyCode || theEvent.which;
      key = String.fromCharCode(key);
    }
    const regex = /[0-9]|\./;
    if (!regex.test(key)) {
      theEvent.returnValue = false;
      if (theEvent.preventDefault) theEvent.preventDefault();
    }
  };

  return (
    <label
      className={`flex flex-col text-primary font-medium
      ${fullWidth ? 'w-full' : 'w-max'}
      `}
    >
      <div className="flex items-center space-x-1 mb-1">
        <span className="uppercase text-xs font-bold">{props.label}</span>
        {markRequired && <span className="text-red-500 leading-3 mb-1">•</span>}
      </div>
      <div className="relative w-full flex flex-wrap items-stretch">
        <input
          {...registerInput}
          {...props}
          onChange={(event) => {
            if (registerInput) registerInput.onChange(event);
            if (props.onChange) props.onChange(event);
          }}
          className={`
              transition-all
              hover:border-gray-300
              outline-none
              rounded-lg
              py-1.5 px-3
              ${
                props.disabled
                  ? 'bg-opacity-80 border-opacity-70 text-gray-400 bg-gray-200 border-gray-300'
                  : ''
              }
              ${fullWidth ? 'w-full' : 'w-max'}
              ${inputSkin.bg}
              ${inputSkin.border}
              ${inputSkin.text}
              ${errorMessage ? 'focus:ring-2 focus:ring-red-300' : ''}
            `}
        />
      </div>
      {!!errorMessage && (
        <div className="text-red-500 text-sm px-3">{errorMessage}</div>
      )}
    </label>
  );
}
