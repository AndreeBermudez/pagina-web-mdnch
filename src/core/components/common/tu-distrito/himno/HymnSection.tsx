interface HymnSectionProps {
    title: string;
    lines: string[];
}

export const HymnSection: React.FC<HymnSectionProps> = ({ title, lines }) => {
    return (
        <section className="mb-8 text-center">
            <h2 className="text-2xl font-semibold mb-4">{title}</h2>
            <div className="space-y-2">
                {lines.map((line, index) => (
                    <p key={index}>{line}</p>
                ))}
            </div>
        </section>
    );
};
