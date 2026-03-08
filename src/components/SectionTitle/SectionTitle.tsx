import "./SectionTitle.css";

interface SectionTitleProps {
  title: string;
}

export const SectionTitle = ({ title }: SectionTitleProps) => {
  return (
    <div className="section-title-container">
      <h2 className="section-title">{title}</h2>
    </div>
  );
};
