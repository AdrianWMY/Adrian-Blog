import React from 'react';

interface Props {
  children: React.ReactNode;
  onClick?: () => void;
}

const Tag = ({ children, onClick }: Props) => {
  //   return <button className="btn btn-soft btn-secondary">{children}</button>;
  return (
    <span
      onClick={onClick}
      className="text-pink-500 hover:text-pink-600 font-bold px-1 cursor-pointer"
    >
      {children}
    </span>
  );
};

export default Tag;
