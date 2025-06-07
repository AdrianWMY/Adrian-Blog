import React from 'react';

interface Props {
  name: string;
}

const Tag = ({ name }: Props) => {
  return (
    <span className="bg-pink-100 text-pink-800 text-xs font-medium px-2.5 py-0.5 rounded">
      {name}
    </span>
  );
};

export default Tag;
