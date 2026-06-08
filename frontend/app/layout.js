import './globals.css';

export const metadata = {
  title: 'Task Management',
  description: 'Task management dashboard with auth and tasks.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
