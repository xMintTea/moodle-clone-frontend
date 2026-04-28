import cn from 'clsx';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'success' | 'warning' | 'error' | 'secondary';
  as?: React.ElementType;
  className?: string;
  [key: string]: unknown;
}

function Badge({
  children,
  variant = 'primary',
  as: Component = 'span',
  className,
  ...props
}: BadgeProps) {
  const variantClasses = {
    primary: 'bg-blue-600 text-white',
    success: 'bg-green-500 text-white',
    warning: 'bg-orange-500 text-white',
    error: 'bg-red-500 text-white',
    secondary: 'bg-gray-100 text-gray-600',
  };

  const badgeClass = cn(
    'inline-block py-1 px-3 rounded-xl text-xs font-medium',
    variantClasses[variant],
    className
  );

  return (
    <Component className={badgeClass} {...props}>
      {children}
    </Component>
  );
}

export default Badge;