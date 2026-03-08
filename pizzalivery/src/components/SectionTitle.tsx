import "./SectionTitle.css";

type SectionTitleProps = {
  title: string;
};

function SectionTitle({ title }: SectionTitleProps) {
  return <h2 className="section-title">{title}</h2>;
}

export default SectionTitle;