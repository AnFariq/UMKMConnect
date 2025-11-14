import React, { useState, useMemo } from "react";
import { umkmList, categories } from "../data/umkmData";
import Header from "./Header";
import { Link } from "react-router-dom";

import { 
  MapPinIcon, 
  PhoneIcon, 
  ClockIcon, 
  StarIcon,
  MagnifyingGlassIcon,
  FunnelIcon
} from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";

export default function DaftarUMKM() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("name");

  const filteredAndSortedUMKM = useMemo(() => {
    let filtered = umkmList;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(umkm => 
        umkm.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        umkm.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        umkm.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(umkm => umkm.category === selectedCategory);
    }

    // Sort
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "rating":
          return b.rating - a.rating;
        case "reviews":
          return b.reviews - a.reviews;
        case "price": {
          const priceA = parseInt(a.priceRange.match(/\d+/)?.[0] || 0);
          const priceB = parseInt(b.priceRange.match(/\d+/)?.[0] || 0);
          return priceA - priceB;
        }
        default:
          return 0;
      }
    });

    return sorted;
  }, [searchTerm, selectedCategory, sortBy]);



  return (
    // ini header
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="fixed top-0 left-0 right-0 z-50">
              <Header />
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPinIcon className="w-4 h-4" />
              <span>{filteredAndSortedUMKM.length} UMKM ditemukan</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="relative mb-4">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Cari nama UMKM, deskripsi, atau tag..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedCategory === category.id
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    <span className="mr-1">{category.icon}</span>
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="sm:w-48">
              <label className="block text-sm font-medium text-gray-700 mb-2">Urutkan</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="name">Nama</option>
                <option value="rating">Rating</option>
                <option value="reviews">Jumlah Review</option>
                <option value="price">Harga</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {filteredAndSortedUMKM.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak ada UMKM ditemukan</h3>
            <p className="text-gray-600">Coba ubah kata kunci pencarian atau filter yang digunakan</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedUMKM.map((umkm) => (
              <div
                key={umkm.id}
                className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={umkm.image}
                    alt={umkm.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      umkm.isOpen 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {umkm.isOpen ? 'Buka' : 'Tutup'}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="px-2 py-1 bg-blue-600 text-white rounded-full text-xs font-medium">
                      {categories.find(c => c.id === umkm.category)?.icon} {categories.find(c => c.id === umkm.category)?.name}
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{umkm.name}</h3>
                    <div className="flex items-center gap-1 flex-shrink-0 ml-2">
                      <StarIconSolid className="w-4 h-4 text-yellow-400" />
                      <span className="text-sm font-medium text-gray-900">{umkm.rating}</span>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{umkm.description}</p>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {umkm.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                    {umkm.tags.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                        +{umkm.tags.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPinIcon className="w-4 h-4" />
                      <span className="line-clamp-1">{umkm.address}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <ClockIcon className="w-4 h-4" />
                      <span>{umkm.hours}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="font-medium">{umkm.priceRange}</span>
                      <span className="text-gray-400">•</span>
                      <span>{umkm.reviews} review</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Link
                      to={`/umkm/${umkm.id}`}
                      className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors text-center"
                    >
                      Lihat Detail
                    </Link>
                    <a
                      href={`tel:${umkm.phone}`}
                      className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      <PhoneIcon className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}