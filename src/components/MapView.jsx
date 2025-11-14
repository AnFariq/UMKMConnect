import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { umkmList, categories } from "../data/umkmData";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import { 
  StarIcon, 
  MapPinIcon, 
  PhoneIcon, 
  ClockIcon,
  CurrencyDollarIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
  AdjustmentsHorizontalIcon,
  ArrowTopRightOnSquareIcon
} from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";

// Setup default icon agar marker tampil normal
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const kampusDinamika = [-7.310820470765489, 112.7821763079304];

// Custom marker colors for different categories
const categoryColors = {
  kuliner: "#10b981", // green
  jasa: "#3b82f6",   // blue
  fashion: "#ec4899", // pink
  elektronik: "#8b5cf6", // purple
  kesehatan: "#ef4444", // red
  pendidikan: "#f59e0b", // amber
  lainnya: "#6b7280"   // gray
};

// Create custom icon for UMKM markers
function createCustomIcon(category, isOpen) {
  const color = categoryColors[category] || categoryColors.lainnya;
  const status = isOpen ? "open" : "closed";
  
  return new L.DivIcon({
    html: `
      <div class="custom-marker ${status}" style="
        background-color: ${color};
        width: 36px;
        height: 36px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 3px 10px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        position: relative;
        transition: all 0.3s ease;
        ${!isOpen ? 'opacity: 0.7;' : ''}
      ">
        ${categories.find(c => c.id === category)?.icon || '🏪'}
        ${!isOpen ? '<div style="position: absolute; top: -2px; right: -2px; width: 10px; height: 10px; background: #ef4444; border-radius: 50%; border: 2px solid white;"></div>' : ''}
      </div>
    `,
    className: "custom-div-icon",
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -36],
  });
}

function MapBounds() {
  const map = useMap();

  useEffect(() => {
    // Selalu set view ke kampus Dinamika sebagai patokan awal
    map.setView(kampusDinamika, 16);
  }, [map]);

  return null;
}

export default function MapView({ selectedUMKM: propSelectedUMKM, onUMKMSelect }) {
  const MAPTILER_KEY = "eALor44jTUVM3vyFZ2Ri";
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showFilters, setShowFilters] = useState(false);


  // Filter UMKM based on search and category
  const filteredUMKM = useMemo(() => {
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

    return filtered;
  }, [searchTerm, selectedCategory]);

  // Memoize custom icon creation to prevent re-renders
  const createCustomIconMemo = useCallback((category, isOpen) => {
    return createCustomIcon(category, isOpen);
  }, []);

  // Optimize marker rendering with virtualization
  const markersToRender = useMemo(() => {
    return filteredUMKM.slice(0, 50); // Limit to 50 markers for performance
  }, [filteredUMKM]);

  const handleMarkerClick = (umkm) => {
    if (onUMKMSelect) {
      onUMKMSelect(umkm);
    }
  };

  const handleDirections = (umkm) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${umkm.lat},${umkm.lng}`;
    window.open(url, '_blank');
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
  };

  return (
    <div className="w-full h-[80vh] relative">
      {/* Search and Filter Bar */}
      <div className="absolute top-4 left-4 right-4 z-10 flex gap-2">
        <div className="flex-1 bg-white rounded-xl shadow-lg border border-slate-200 p-3">
          <div className="flex items-center gap-3">
            <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 flex-shrink-0" />
            <input
              type="text"
              placeholder="Cari nama UMKM, deskripsi, atau tag..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <XMarkIcon className="w-4 h-4 text-gray-400" />
              </button>
            )}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`p-2 rounded-lg transition-colors ${
                showFilters ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100 text-gray-600"
              }`}
            >
              <AdjustmentsHorizontalIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Filter Options */}
          {showFilters && (
            <div className="mt-3 pt-3 border-t border-gray-200">
              <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-2 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
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
              {(searchTerm || selectedCategory !== "all") && (
                <button
                  onClick={clearFilters}
                  className="mt-2 text-xs text-blue-600 hover:text-blue-700 font-medium"
                >
                  Hapus semua filter
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Stats Bar - Responsive */}
      <div className="absolute top-20 left-4 z-10">
        <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-lg px-3 py-1.5 lg:px-4 lg:py-2 border border-slate-200">
          <p className="text-xs lg:text-sm font-medium text-gray-700">
            <span className="text-blue-600 font-bold">{filteredUMKM.length}</span> UMKM ditemukan
          </p>
        </div>
      </div>

      {/* Map Container */}
      <MapContainer
        center={kampusDinamika}
        zoom={16}
        className="h-full w-full rounded-none"
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.maptiler.com/">MapTiler</a> © <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url={`https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=${MAPTILER_KEY}`}
        />

        <MapBounds />

        {/* Marker Kampus Dinamika */}
        <Marker
          position={kampusDinamika}
          icon={
            new L.Icon({
              iconUrl:
                "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
              shadowUrl:
                "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
              iconSize: [25, 41],
              iconAnchor: [12, 41],
              popupAnchor: [1, -34],
              shadowSize: [41, 41],
            })
          }
        >
          <Popup>
            <div className="p-3 min-w-[200px]">
              <h3 className="font-bold text-lg text-gray-900 mb-2">Universitas Dinamika</h3>
              <p className="text-sm text-gray-600 mb-1">STIKOM Surabaya</p>
              <p className="text-sm text-gray-600 mb-1">Jl. Kedung Baruk No. 98</p>
              <p className="text-sm text-gray-600">Surabaya, Jawa Timur</p>
            </div>
          </Popup>
        </Marker>

        {/* Marker UMKM - Optimized with virtualization */}
        {markersToRender.map((umkm) => (
          <Marker
            key={umkm.id}
            position={[umkm.lat, umkm.lng]}
            icon={createCustomIconMemo(umkm.category, umkm.isOpen)}
            eventHandlers={{
              click: () => handleMarkerClick(umkm),
            }}
            riseOnHover={true}
            autoPan={true}
          >
            <Popup maxWidth={350} minWidth={280}>
              <div className="p-3 lg:p-4 min-w-[280px] lg:min-w-[320px]">
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-900 line-clamp-1">{umkm.name}</h3>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        umkm.isOpen 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {umkm.isOpen ? 'Buka' : 'Tutup'}
                      </span>
                      <span 
                        className="px-2 py-1 rounded-full text-xs font-medium text-white"
                        style={{ backgroundColor: categoryColors[umkm.category] }}
                      >
                        {categories.find(c => c.id === umkm.category)?.icon} {categories.find(c => c.id === umkm.category)?.name}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0 ml-2">
                    <StarIconSolid className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm font-medium text-gray-900">{umkm.rating}</span>
                  </div>
                </div>

                {/* Image */}
                <div className="relative h-32 lg:h-40 rounded-lg overflow-hidden mb-3">
                  <img
                    src={umkm.image}
                    alt={umkm.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{umkm.description}</p>

                {/* Info */}
                <div className="space-y-2 mb-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPinIcon className="w-4 h-4 flex-shrink-0" />
                    <span className="line-clamp-1">{umkm.address}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <ClockIcon className="w-4 h-4 flex-shrink-0" />
                    <span>{umkm.hours}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <CurrencyDollarIcon className="w-4 h-4 flex-shrink-0" />
                    <span>{umkm.priceRange}</span>
                    <span className="text-gray-400">•</span>
                    <span>{umkm.reviews} review</span>
                  </div>
                </div>

                {/* Tags */}
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

                {/* Actions */}
                <div className="flex gap-2">
                  <Link
                    to={`/umkm/${umkm.id}`}
                    className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors text-center"
                  >
                    Lihat Detail
                  </Link>
                  <button
                    onClick={() => handleDirections(umkm)}
                    className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    title="Petunjuk Arah"
                  >
                    <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                  </button>
                  <a
                    href={`tel:${umkm.phone}`}
                    className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <PhoneIcon className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Custom styles for markers */}
      <style jsx>{`
        .custom-div-icon {
          background: transparent !important;
          border: none !important;
        }
        
        .custom-marker {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          animation: markerFadeIn 0.5s ease-out;
        }
        
        .custom-marker:hover {
          transform: scale(1.15) translateY(-2px);
          z-index: 1000 !important;
          filter: brightness(1.1);
        }

        .custom-marker.open {
          animation: pulse 2s infinite;
        }

        @keyframes markerFadeIn {
          from {
            opacity: 0;
            transform: scale(0.8) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes pulse {
          0%, 100% {
            box-shadow: 0 3px 10px rgba(0,0,0,0.3);
          }
          50% {
            box-shadow: 0 3px 20px rgba(0,0,0,0.4);
          }
        }

        .leaflet-popup-content-wrapper {
          border-radius: 16px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.15);
          animation: popupFadeIn 0.3s ease-out;
        }

        .leaflet-popup-content {
          margin: 0;
        }

        @keyframes popupFadeIn {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .leaflet-popup-tip {
          animation: tipFadeIn 0.3s ease-out;
        }

        @keyframes tipFadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .line-clamp-1 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }

        .line-clamp-2 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }

        /* Smooth transitions for filter buttons */
        .filter-btn {
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .filter-btn:hover {
          transform: translateY(-1px);
        }

        .filter-btn.active {
          transform: scale(1.05);
        }

        /* Search bar animation */
        .search-bar {
          animation: slideDown 0.3s ease-out;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Stats card animation */
        .stats-card {
          animation: slideUp 0.4s ease-out;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}