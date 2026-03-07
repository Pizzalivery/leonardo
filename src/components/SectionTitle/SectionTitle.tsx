import "./SectionTitle.css"

interface SectionTitleProps {
  children: React.ReactNode;
}


export  const SectionTitle = ({ children }: SectionTitleProps) => {
    return (
        
      <div className="container">
        <h2 className="section-title">{children}</h2>
      </div>
    
    );
};