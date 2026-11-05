const descriptions = {
  'research collaboration':
    'Partner with AFRICSIS on joint research, policy analysis, and evidence-based publications.',
  'institutional partnerships':
    'Work with our team on long-term initiatives, knowledge exchange, and strategic cooperation.',
  'capacity building':
    'Explore workshops, mentorship, and tailored training for professionals, emerging leaders, and institutions.',
  'training and capacity building':
    'Explore workshops, mentorship, and tailored training for professionals, emerging leaders, and institutions.',
  'strategic advising':
    'Discuss research-informed guidance on science, security, and policy priorities.',
  'strategic advisory support':
    'Discuss research-informed guidance on science, security, and policy priorities.',
};

export default function ContactOpportunities({ items }) {
  return (
    <ul className="contact-opportunities">
      {items.map((item) => (
        <li key={item}>
          <details className="contact-opportunity">
            <summary>
              <q>{item}</q>
              <span className="contact-opportunity-toggle" aria-hidden="true" />
            </summary>
            <p>
              {descriptions[item.trim().toLowerCase()] ||
                'Tell us about your goals and how you would like to work with AFRICSIS.'}
            </p>
          </details>
        </li>
      ))}
    </ul>
  );
}
