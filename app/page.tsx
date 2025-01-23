"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { AuthModal } from "@/components/auth/AuthModal";
import { useRouter } from "next/navigation";

export default function Page() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  const handleGetStarted = () => {
    if (user) {
      router.push("/dashboard");
    } else {
      setIsAuthModalOpen(true);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-8">
        <div className="text-center space-y-6">
          <h1 className="text-6xl font-extrabold text-white tracking-tight">
            ResumePad
            <span className="block text-lg font-medium mt-2 text-indigo-100 opacity-90">
              Create beautiful resumes in minutes
            </span>
          </h1>
          <p className="max-w-xl mx-auto text-indigo-100 text-lg">
            The modern way to build and manage your professional resume. Simple,
            powerful, and beautiful.
          </p>
          <button
            onClick={handleGetStarted}
            className="px-8 py-3 bg-white text-indigo-600 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
          >
            {user ? "Go to Dashboard" : "Get Started"}
          </button>
        </div>
      </div>
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  );
}
