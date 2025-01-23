"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Resume } from "@/types";
import { supabase } from "@/lib/supabase";

export default function DashboardPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [resumes, setResumes] = useState<Resume[]>([]);

  useEffect(() => {
    if (!user) {
      router.push("/");
      return;
    }

    const fetchResumes = async () => {
      const { data, error } = await supabase
        .from("resumes")
        .select("*")
        .eq("user_id", user.id)
        .order("updated_at", { ascending: false });

      if (!error && data) {
        setResumes(data as Resume[]);
      }
    };

    fetchResumes();
  }, [user, router]);

  const handleCreateNew = () => {
    router.push("/resume/new");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Resumes</h1>
          <button
            onClick={handleCreateNew}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Create New Resume
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resumes.map((resume) => (
            <div
              key={resume.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => router.push(`/resume/${resume.id}`)}
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {resume.title}
              </h3>
              <p className="text-sm text-gray-500">
                Last updated: {new Date(resume.updated_at).toLocaleDateString()}
              </p>
            </div>
          ))}

          {resumes.length === 0 && (
            <div className="col-span-full text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No resumes yet
              </h3>
              <p className="text-gray-500 mb-4">
                Create your first resume to get started
              </p>
              <button
                onClick={handleCreateNew}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Create Resume
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
