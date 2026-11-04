import './globals.css';

export const metadata = {
  title: 'AFRICSIS | Science for Peace, Security for Progress',
  description: 'AFRICSIS advances science, security, and sustainable development across Africa through research, policy, and partnership.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
