"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Lock, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(false);

    setTimeout(() => {
      if (password === "admin123") {
        router.push("/xfa/admin/packages");
      } else {
        setIsLoading(false);
        setError(true);
        setPassword("");
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Brand Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[80px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-sm relative z-10"
      >
        <div className="text-center mb-10">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary text-white mb-6 shadow-xl shadow-primary/20"
          >
            <Lock className="w-7 h-7" />
          </motion.div>
          <h1 className="text-2xl font-bold text-primary mb-2 tracking-tight">
            LogiCore Admin
          </h1>
          <p className="text-gray-500 text-sm">
            Please enter your secure access key
          </p>
        </div>

        <form onSubmit={handleSubmit} className="relative">
          <div className="relative group">
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              placeholder="••••••••"
              className={`w-full bg-gray-50 border-2 border-transparent text-primary placeholder-gray-300 px-6 py-4 rounded-xl focus:outline-none focus:bg-white focus:border-primary/20 focus:shadow-lg focus:shadow-primary/5 transition-all duration-300 text-center text-xl font-bold tracking-widest ${
                error
                  ? "bg-red-50 border-red-100 text-red-500 placeholder-red-200 animate-shake"
                  : ""
              }`}
              autoFocus
            />

            <div className="absolute right-2 top-1/2 -translate-y-1/2">
              <button
                type="submit"
                disabled={isLoading || !password}
                className="p-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all disabled:opacity-0 disabled:scale-90 disabled:pointer-events-none shadow-lg shadow-primary/20"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <ArrowRight className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-xs text-center mt-3 font-medium"
            >
              Incorrect access key. Please try again.
            </motion.p>
          )}
        </form>

        <div className="mt-12 text-center">
          <p className="text-gray-400 text-xs font-medium uppercase tracking-wider">
            Authorized Personnel Only
          </p>
        </div>
      </motion.div>
    </div>
  );
}
