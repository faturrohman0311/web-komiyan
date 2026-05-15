"use client";

import { motion } from "framer-motion";
import { BookOpen, Clock3, Heart, LogOut, Settings, Star } from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/navbar";

export default function ProfilePage() {
  const { user }: any = useAuth();
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("Logout success");
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <ProtectedRoute>
      <Navbar />
      <main className="min-h-screen bg-[#050505] text-white relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute top-[-120px] left-[-120px] w-[400px] h-[400px] bg-purple-600/20 blur-[140px] rounded-full" />

          <div className="absolute bottom-[-120px] right-[-120px] w-[400px] h-[400px] bg-cyan-500/20 blur-[140px] rounded-full" />

          <div className="absolute insetc-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:80px_80px]" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 py-24">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            className="
            relative
            overflow-hidden
            rounded-[32px]
            border border-white/10
            bg-white/[0.04]
            backdrop-blur-2xl
            p-8
          "
          >
            {/* Banner */}
            <div className="absolute inset-0 opacity-20">
              <img
                src={
                  user?.photoURL ||
                  "https://images.unsplash.com/photo-1612036782180-6f0822045d55?q=80&w=2000&auto=format&fit=crop"
                }
                alt="Banner"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="relative z-10 flex flex-col lg:flex-row items-center lg:items-end gap-6">
              {/* Avatar */}
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="
                w-32 h-32
                rounded-full
                overflow-hidden
                border-4 border-white/10
                shadow-[0_0_40px_rgba(168,85,247,0.35)]
              "
              >
                <img
                  src={
                    user?.photoURL ||
                    "https://images.unsplash.com/photo-1612036782180-6f0822045d55?q=80&w=2000&auto=format&fit=crop"
                  }
                  alt={user?.name}
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* User Info */}
              <div className="flex-1 text-center lg:text-left">
                <h1 className="text-4xl font-black">{user?.name}</h1>

                <p className="text-zinc-400 mt-2">{user?.email}</p>

                <div className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm">
                  <Star size={15} />
                  {user?.level ? `Level ${user?.level}` : "Level 1"}
                </div>
              </div>

              {/* Buttons */}
              <div className="flex items-center gap-3">
                <button
                  className="
                  h-12 px-5
                  rounded-2xl
                  bg-white/5
                  border border-white/10
                  hover:bg-white/10
                  transition
                  flex items-center gap-2
                "
                >
                  <Settings size={18} />
                  Pengaturan
                </button>

                <button
                  onClick={handleLogout}
                  className="
                  h-12 px-5
                  rounded-2xl
                  bg-gradient-to-r
                  from-purple-600
                  to-cyan-500
                  hover:opacity-90
                  transition
                  flex items-center gap-2
                  font-semibold
                "
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            </div>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
            {[
              {
                title: "Komik Dibaca",
                value: "128",
                icon: BookOpen,
              },
              {
                title: "Favorit",
                value: "54",
                icon: Heart,
              },
              {
                title: "Riwayat",
                value: "312",
                icon: Clock3,
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="
                rounded-[28px]
                border border-white/10
                bg-white/[0.04]
                backdrop-blur-xl
                p-6
              "
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-zinc-400 text-sm">{item.title}</p>

                    <h2 className="text-4xl font-black mt-2">{item.value}</h2>
                  </div>

                  <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-cyan-400">
                    <item.icon size={26} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
}
