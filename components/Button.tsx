import React from "react";

interface ButtonProps {
  label: string;
  secondary?: boolean;
  fullWidth?: boolean;
  large?: boolean;
  disabled?: boolean;
  outline?: boolean;
  onClick: ()=>void
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  fullWidth,
  large,
  outline,
  secondary
}) => {
  
  return (
    <button
    onClick={onClick}
      className={`
            rounded-full
            border-2
            font-semibold
            transition
            hover:opacity-80
            disabled:cursor-not-allowed
            disabled:opacity-70
            ${fullWidth ? "w-full" : "w-fit"}
            ${secondary ? "bg-white" : "bg-sky-500"}
            ${secondary ? "text-black" : "text-white"}
            ${secondary ? "border-black" : "border-sky-500"}
            ${large ? "text-xl" : "text-md"}
            ${large ? "px-5" : "px-4"}
            ${large ? "py-3" : "py-2"}
            ${outline ? "bg-transparent" : ""}
            ${outline ? "border-white" : ""}
            ${outline ? "text-white" : ""}
        `}
    >
      {label}
    </button>
  );
};

export default Button;
