import React from 'react';
import cn from 'clsx';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  [key: string]: unknown;
}

function Card({ children, className, ...restProps }: CardProps) {
  return (
    <div
      className={cn(
        'bg-white border-1 border-zinc-300 rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden',
        className
      )}
      {...restProps}
    >
      {children}
    </div>
  );
}


interface SubComponentProps {
  children?: React.ReactNode;
  className?: string;
}

Card.Content = ({ children, className }: SubComponentProps) => (
  <div className={cn('p-5', className)}>{children}</div>
);

Card.Title = ({ children, className }: SubComponentProps) => (
  <h3 className={cn('text-lg font-semibold mb-2', className)}>{children}</h3>
);

Card.Description = ({ children, className }: SubComponentProps) => (
  <p className={cn('text-gray-600 text-sm mb-3 leading-6', className)}>
    {children}
  </p>
);

interface ImageProps {
  src: string;
  alt: string;
  className?: string;
}

Card.Image = ({ src, alt, className }: ImageProps) => (
  <img
    src={src}
    alt={alt}
    draggable="false"
    className={cn('w-full h-40 object-cover', className)}
  />
);

export default Card;