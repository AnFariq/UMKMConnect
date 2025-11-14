import React, { useState } from "react";
import Header from "./components/Header";
import MapView from "./components/MapView";
import { umkmList, categories } from "./data/umkmData";
import { Link } from "react-router-dom";
import { 
  MapPinIcon, 
  PhoneIcon, 
  ClockIcon, 
  StarIcon,
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowTopRightOnSquareIcon
} from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";

export default function App() {
  const [showSidebar, setShowSidebar] = useState(true);
  const [selectedUMKM, setSelectedUMKM] = useState(null);

  // Category colors
  const categoryColors = {
    kuliner: "#10b981",
    jasa: "#3b82f6",
    fashion: "#ec4899",
    elektronik: "#8b5cf6",
    kesehatan: "#ef4444",
    pendidikan: "#f59e0b",
    lainnya: "#6b7280"
  };

  const handleUMKMClick = (umkm) => {
    setSelectedUMKM(umkm);
  };

  const handleDirections = (umkm) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${umkm.lat},${umkm.lng}`;
    window.open(url, '_blank');
  };

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

          {/* Map Container with Sidebar */}
          <div className="relative flex flex-col lg:flex-row gap-4 lg:gap-6">
            {/* Mobile Sidebar Toggle Button */}
            <button
              onClick={() => setShowSidebar(!showSidebar)}
              className="lg:hidden absolute left-4 top-4 z-20 bg-white rounded-lg shadow-lg p-3 hover:bg-gray-50 transition-colors border border-slate-200"
            >
              {showSidebar ? (
                <XMarkIcon className="w-5 h-5 text-gray-600" />
              ) : (
                <ChevronRightIcon className="w-5 h-5 text-gray-600" />
              )}
            </button>

            {/* Desktop Sidebar Toggle Button */}
            <button
              onClick={() => setShowSidebar(!showSidebar)}
              className="hidden lg:flex absolute left-4 top-4 z-20 bg-white rounded-lg shadow-lg p-3 hover:bg-gray-50 transition-colors border border-slate-200"
            >
              {showSidebar ? (
                <ChevronLeftIcon className="w-5 h-5 text-gray-600" />
              ) : (
                <ChevronRightIcon className="w-5 h-5 text-gray-600" />
              )}
            </button>

            {/* Sidebar - Mobile: Full width overlay, Desktop: Fixed width */}
            <div className={`${showSidebar ? 'block' : 'hidden'} lg:block lg:relative absolute inset-0 z-30 lg:z-auto bg-black/50 lg:bg-transparent transition-opacity duration-300`}>
              <div className={`transition-all duration-500 ease-out transform ${
                showSidebar 
                  ? 'w-full lg:w-96 opacity-100 translate-x-0' 
                  : 'w-0 opacity-0 overflow-hidden translate-x-full lg:translate-x-0'
              }`}>
                <div className="bg-white rounded-2xl shadow-xl border border-slate-200 h-[80vh] lg:h-[80vh] overflow-hidden mt-16 lg:mt-0 mx-4 lg:mx-0 transform transition-all duration-300 hover:shadow-2xl">
                  {/* Sidebar Header */}
                  <div className="p-4 border-b border-slate-200 bg-gradient-to-r from-blue-50 to-indigo-50">
                    <div className="flex items-center justify-between">
                      <div className="px-14 text-center place-items-center">
                        <h3 className="font-bold text-lg text-gray-900">Daftar UMKM</h3>
                        <p className="text-sm text-gray-600">Temukan UMKM terdekat</p>
                      </div>
                      <button
                        onClick={() => setShowSidebar(false)}
                        className="lg:hidden p-1 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <XMarkIcon className="w-5 h-5 text-gray-600" />
                      </button>
                    </div>
                  </div>

                  {/* UMKM List */}
                  <div className="overflow-y-auto h-[calc(80vh-80px)] p-4 space-y-3">
                    {umkmList.map((umkm) => (
                    <div
                      key={umkm.id}
                      onClick={() => {
                        handleUMKMClick(umkm);
                        // Close sidebar on mobile after selection
                        if (window.innerWidth < 1024) {
                          setShowSidebar(false);
                        }
                      }}
                      className={`bg-white border rounded-xl p-4 cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 transform hover:scale-[1.02] ${
                        selectedUMKM?.id === umkm.id 
                          ? 'border-blue-500 shadow-lg ring-2 ring-blue-100 scale-[1.02]' 
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                        <div className="flex gap-3">
                          {/* Image */}
                          <img
                            src={umkm.image}
                            alt={umkm.name}
                            className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                          />

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-1">
                              <h4 className="font-semibold text-gray-900 line-clamp-1">{umkm.name}</h4>
                              <div className="flex items-center gap-1 flex-shrink-0 ml-2">
                                <StarIconSolid className="w-3 h-3 text-yellow-400" />
                                <span className="text-xs font-medium text-gray-900">{umkm.rating}</span>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 mb-2">
                              <span className={`px-1.5 py-0.5 rounded-full text-xs font-medium ${
                                umkm.isOpen 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {umkm.isOpen ? 'Buka' : 'Tutup'}
                              </span>
                              <span 
                                className="px-1.5 py-0.5 rounded-full text-xs font-medium text-white"
                                style={{ backgroundColor: categoryColors[umkm.category] }}
                              >
                                {categories.find(c => c.id === umkm.category)?.icon}
                              </span>
                            </div>

                            <div className="flex items-center gap-2 text-xs text-gray-600">
                              <MapPinIcon className="w-3 h-3 flex-shrink-0" />
                              <span className="line-clamp-1">{umkm.address}</span>
                            </div>

                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs font-medium text-gray-900">{umkm.priceRange}</span>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDirections(umkm);
                                }}
                                className="text-xs text-green-600 hover:text-green-700 font-medium"
                                title="Petunjuk Arah"
                              >
                                <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                              </button>
                              <Link
                                to={`/umkm/${umkm.id}`}
                                onClick={(e) => e.stopPropagation()}
                                className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                              >
                                Detail →
                              </Link>
                            </div>
                          </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Map Container */}
            <div className={`flex-1 transition-all duration-300 ${showSidebar ? 'lg:ml-0' : 'lg:ml-12'}`}>
              {/* Decorative Corner Accents */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-3xl transform rotate-12 opacity-20 blur-sm"></div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-slate-400 to-blue-400 rounded-3xl transform -rotate-12 opacity-20 blur-sm"></div>

              {/* Map Card */}
              <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200 backdrop-blur-sm transform transition-all duration-500 hover:shadow-2xl hover:scale-[1.01]">
                {/* Gradient Overlay on Top */}
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-slate-500 z-10"></div>

                {/* Map View */}
                <MapView selectedUMKM={selectedUMKM} onUMKMSelect={setSelectedUMKM} />

                {/* Floating Stats Card - Responsive */}
                <div className="absolute bottom-4 left-4 right-4 lg:bottom-6 lg:left-6 lg:right-auto bg-white/95 backdrop-blur-md rounded-2xl shadow-lg p-3 lg:p-4 z-10 border border-slate-200">
                  <div className="flex items-center justify-around lg:gap-4">
                    <div className="text-center">
                      <p className="text-lg lg:text-2xl font-bold text-blue-700">{umkmList.length}+</p>
                      <p className="text-xs text-slate-600">UMKM Aktif</p>
                    </div>
                    <div className="w-px h-8 lg:h-12 bg-slate-300"></div>
                    <div className="text-center">
                      <p className="text-lg lg:text-2xl font-bold text-indigo-700">{categories.length}</p>
                      <p className="text-xs text-slate-600">Kategori</p>
                    </div>
                    <div className="w-px h-8 lg:h-12 bg-slate-300"></div>
                    <div className="text-center">
                      <p className="text-lg lg:text-2xl font-bold text-slate-700">15k+</p>
                      <p className="text-xs text-slate-600">Pengunjung</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <Link
              to="/daftar-umkm"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Jelajahi Semua UMKM
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
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
