import "./Section.css"

interface SectionProps {
    title: string
    children: React.ReactNode;
    className: string
}

interface SectionOfferProps {
    title: string
    children: React.ReactNode;
    className: string
}

export const Section = ({title, className, children}: SectionProps) => {
    return (
        <section className={className}>
            <h2 className="section-title">{title}</h2>
            {children}
        </section>
    )
}

export const SectionOffer = ({title, className, children}: SectionOfferProps) => {
    return (
        <section className={className}>
            <div className="container">
                <h2 className="section-title">{title}</h2>
            </div>
            {children}
        </section>
    )
}