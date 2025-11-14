import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { umkmList, categories } from "../data/umkmData";

import { 
  MapPinIcon, 
  PhoneIcon, 
  ClockIcon, 
  StarIcon,
  CurrencyDollarIcon,
  ArrowLeftIcon,
  ShareIcon,
  HeartIcon,
  CameraIcon
} from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid, HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Setup default icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

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

export default function UMKMDetail() {
  const { id } = useParams();
  const [isFavorite, setIsFavorite] = useState(false);

  const umkm = umkmList.find(u => u.id === parseInt(id));

  if (!umkm) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-400 text-6xl mb-4">🏪</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">UMKM Tidak Ditemukan</h2>
          <p className="text-gray-600 mb-6">UMKM yang Anda cari tidak tersedia</p>
          <Link
            to="/daftar-umkm"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            Kembali ke Daftar UMKM
          </Link>
        </div>
      </div>
    );
  }

  const categoryInfo = categories.find(c => c.id === umkm.category);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: umkm.name,
          text: umkm.description,
          url: window.location.href
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link berhasil disalin!');
    }
  };

  const handleDirections = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${umkm.lat},${umkm.lng}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link
              to="/daftar-umkm"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeftIcon className="w-5 h-5" />
              Kembali
            </Link>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {isFavorite ? (
                  <HeartIconSolid className="w-5 h-5 text-red-500" />
                ) : (
                  <HeartIcon className="w-5 h-5 text-gray-600" />
                )}
              </button>
              <button
                onClick={handleShare}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <ShareIcon className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section with Image */}
      <div className="relative h-96 overflow-hidden">
        <img
          src={umkm.image}
          alt={umkm.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        
        {/* Floating Info */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
        <div className="max-w-7xl mx-auto">
          <div>
            <div className="flex items-center gap-3 mb-3">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  umkm.isOpen 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {umkm.isOpen ? 'Buka Sekarang' : 'Tutup'}
                </span>
                <span 
                  className="px-3 py-1 rounded-full text-sm font-medium text-white"
                  style={{ backgroundColor: categoryColors[umkm.category] }}
                >
                  {categoryInfo?.icon} {categoryInfo?.name}
                </span>
              </div>
              
              <h1 className="text-4xl font-bold text-white mb-2">{umkm.name}</h1>
              
              <div className="flex items-center gap-4 text-white">
                <div className="flex items-center gap-1">
                  <StarIconSolid className="w-5 h-5 text-yellow-400" />
                  <span className="font-semibold">{umkm.rating}</span>
                  <span className="text-white/80">({umkm.reviews} review)</span>
                </div>
                <div className="flex items-center gap-1">
                  <CurrencyDollarIcon className="w-5 h-5" />
                  <span>{umkm.priceRange}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Tentang {umkm.name}</h2>
              <p className="text-gray-600 leading-relaxed">{umkm.description}</p>
              
              {/* Tags */}
              <div className="mt-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {umkm.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact & Hours */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Informasi Kontak & Jam Buka</h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPinIcon className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Alamat</p>
                    <p className="text-gray-600">{umkm.address}</p>
                    <button
                      onClick={handleDirections}
                      className="mt-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      Dapatkan petunjuk arah →
                    </button>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <PhoneIcon className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Telepon</p>
                    <a
                      href={`tel:${umkm.phone}`}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      {umkm.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <ClockIcon className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Jam Buka</p>
                    <p className="text-gray-600">{umkm.hours}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex gap-3">
                <a
                  href={`tel:${umkm.phone}`}
                  className="flex-1 bg-blue-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors text-center flex items-center justify-center gap-2"
                >
                  <PhoneIcon className="w-5 h-5" />
                  Hubungi
                </a>
                <button
                  onClick={handleDirections}
                  className="flex-1 bg-gray-100 text-gray-700 px-4 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                >
                  <MapPinIcon className="w-5 h-5" />
                  Petunjuk Arah
                </button>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Review Pelanggan</h2>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">{umkm.rating}</div>
                  <div className="flex items-center gap-1 justify-center">
                    {[...Array(5)].map((_, i) => (
                      <StarIconSolid
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(umkm.rating)
                            ? 'text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600">{umkm.reviews} review</p>
                </div>
                
                <div className="flex-1">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <div key={rating} className="flex items-center gap-2 mb-1">
                      <span className="text-sm text-gray-600 w-3">{rating}</span>
                      <StarIconSolid className="w-4 h-4 text-yellow-400" />
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-yellow-400 h-2 rounded-full"
                          style={{
                            width: `${rating === 5 ? 60 : rating === 4 ? 25 : rating === 3 ? 10 : rating === 2 ? 3 : 2}%`
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sample Reviews */}
              <div className="space-y-4">
                <div className="border-t pt-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                    <div>
                      <p className="font-medium text-gray-900">Ahmad Rizki</p>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <StarIconSolid key={i} className="w-3 h-3 text-yellow-400" />
                        ))}
                        <span className="text-xs text-gray-500 ml-1">2 hari lalu</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm">Makanan enak dan porsi pas, harga terjangkau. Recommended!</p>
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                    <div>
                      <p className="font-medium text-gray-900">Siti Nurhaliza</p>
                      <div className="flex items-center gap-1">
                        {[...Array(4)].map((_, i) => (
                          <StarIconSolid key={i} className="w-3 h-3 text-yellow-400" />
                        ))}
                        <StarIcon className="w-3 h-3 text-gray-300" />
                        <span className="text-xs text-gray-500 ml-1">1 minggu lalu</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm">Pelayanan ramah, tempat nyaman. Cocok untuk nongkrong.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Map */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-4 border-b border-slate-200">
                <h3 className="font-semibold text-gray-900">Lokasi</h3>
              </div>
              <div className="h-64">
                <MapContainer
                  center={[umkm.lat, umkm.lng]}
                  zoom={16}
                  className="h-full w-full"
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.maptiler.com/">MapTiler</a> © <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
                    url={`https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=eALor44jTUVM3vyFZ2Ri`}
                  />
                  <Marker position={[umkm.lat, umkm.lng]}>
                    <Popup>
                      <strong>{umkm.name}</strong>
                      <br />
                      {umkm.address}
                    </Popup>
                  </Marker>
                </MapContainer>
              </div>
            </div>

            {/* Quick Info */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Info Cepat</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Kategori</span>
                  <span className="font-medium">{categoryInfo?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Rating</span>
                  <span className="font-medium">{umkm.rating}/5.0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Harga</span>
                  <span className="font-medium">{umkm.priceRange}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status</span>
                  <span className={`font-medium ${umkm.isOpen ? 'text-green-600' : 'text-red-600'}`}>
                    {umkm.isOpen ? 'Buka' : 'Tutup'}
                  </span>
                </div>
              </div>
            </div>

            {/* Nearby UMKM */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">UMKM Terdekat</h3>
              <div className="space-y-3">
                {umkmList
                  .filter(u => u.id !== umkm.id)
                  .slice(0, 3)
                  .map((nearby) => (
                    <Link
                      key={nearby.id}
                      to={`/umkm/${nearby.id}`}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <img
                        src={nearby.image}
                        alt={nearby.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate">{nearby.name}</p>
                        <p className="text-sm text-gray-600">{nearby.category}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1">
                          <StarIconSolid className="w-3 h-3 text-yellow-400" />
                          <span className="text-sm font-medium">{nearby.rating}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}