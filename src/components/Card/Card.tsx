interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card = ({ children, className }: CardProps) => {
  return (
    <div className={`bg-common-light rounded-xl p-4 ${className}`}>
      {children}
    </div>
  );
};
