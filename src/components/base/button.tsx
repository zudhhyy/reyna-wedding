import React, { ReactNode } from 'react';

const Button = ({ children, ...props }: { children: ReactNode } & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button {...props} className={`bg-primary text-white px-4 flex items-center py-2 rounded-md hover:opacity-90 active:scale-95 ${props.className}`}>
      {children}
    </button>
  );
};

export default Button;
