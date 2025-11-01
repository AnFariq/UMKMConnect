import React from "react";
import Header from "./components/Header";
import MapView from "./components/MapView";

export default function App() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Animated Background Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-slate-200 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-blob animation-delay-4000"></div>
      </div>

      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Header />
      </div>

      {/* Main Content */}
      <main className="relative z-10 px-4 py-20 sm:py-32 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Section */}
          <div className="text-center mb-2 pb-12 animate-fade-in">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-indigo-700 to-slate-700 py-6">
              Jelajahi UMKM di Sekitarmu
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Temukan berbagai usaha lokal yang menarik di sekitar Universitas
              Dinamika
            </p>
          </div>

          {/* Map Container with Decorative Elements */}
          <div className="relative">
            {/* Decorative Corner Accents */}
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-3xl transform rotate-12 opacity-20 blur-sm"></div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-slate-400 to-blue-400 rounded-3xl transform -rotate-12 opacity-20 blur-sm"></div>

            {/* Map Card */}
            <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200 backdrop-blur-sm transform transition-all duration-500 hover:shadow-2xl">
              {/* Gradient Overlay on Top */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-slate-500 z-10"></div>

              {/* Map View */}
              <MapView />

              {/* Floating Stats Card */}
              <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-md rounded-2xl shadow-lg p-4 z-10 border border-slate-200">
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-700">24+</p>
                    <p className="text-xs text-slate-600">UMKM Aktif</p>
                  </div>
                  <div className="w-px h-12 bg-slate-300"></div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-indigo-700">8</p>
                    <p className="text-xs text-slate-600">Kategori</p>
                  </div>
                  <div className="w-px h-12 bg-slate-300"></div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-slate-700">15k+</p>
                    <p className="text-xs text-slate-600">Pengunjung</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Info Cards Below Map */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Lokasi Strategis
              </h3>
              <p className="text-sm text-slate-600">
                UMKM terpilih di sekitar kampus dengan akses mudah
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Terverifikasi
              </h3>
              <p className="text-sm text-slate-600">
                Semua UMKM telah diverifikasi dan terpercaya
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-12 h-12 bg-gradient-to-br from-slate-500 to-slate-600 rounded-xl flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Update Real-time
              </h3>
              <p className="text-sm text-slate-600">
                Informasi UMKM selalu update dan akurat
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Custom CSS for Animations */}
      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
      `}</style>
    </div>
  );
}
