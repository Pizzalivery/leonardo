interface CardProps {
  children: React.ReactNode;
}

export const Card = ({ children }: CardProps) => {
  return <div className="bg-common-light rounded-xl p-4">{children}</div>;
};
