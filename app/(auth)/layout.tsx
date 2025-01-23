"use client";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-sm mx-auto">{children}</div>
      </main>
    </div>
  );
}
