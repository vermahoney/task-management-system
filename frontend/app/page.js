import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="container py-16">
      <div className="card max-w-2xl mx-auto text-center">
        <h1 className="text-4xl font-semibold text-slate-900">Task Manager</h1>
        <p className="mt-4 text-slate-600">
          Register or login to create, update, and manage your tasks.
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link href="/register" className="button">
            Register
          </Link>
          <Link href="/login" className="button-secondary">
            Login
          </Link>
        </div>
      </div>
    </main>
  );
}
