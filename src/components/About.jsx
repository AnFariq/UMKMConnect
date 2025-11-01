import React from "react";
import Header from "./Header";
import { Link } from "react-router-dom";

export default function About() {
  const team = [
    {
      name: "Andicha Fariq Putra Pratama",
      role: "Frontend Engineer",
      bio: "Implementasi frontend. Fokus UX sederhana dan cepat",
    },
    {
      name: "Kefiar Sakki Widyarinakit",
      role: "Backend Engineer",
      bio: "Merancang API & integrasi database",
    },
    {
      name: "Mochammad Hafizh Yastito",
      role: "Desain UI",
      bio: "Desain UI",
    },
  ];

  const techStack = ["React.js", "TailwindCSS", "Leaflet.js"];

  return (
    <div className="relative min-h-screen w-full bg-white">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Header />
      </div>

      <div className="px-4 py-20 sm:py-32 lg:px-8">
        <section className="p-6 md:p-10">
          <h1 className="text-3xl md:text-4xl font-extrabold">
            Tentang Platform UMKM Lokal
          </h1>
          <p className="mt-3 text-lg text-slate-600">
            Kami menghubungkan UMKM di sekitar kamu — bikin mereka mudah
            ditemukan, dipercaya, dan tumbuh secara digital.
          </p>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold">Tujuan</h3>
              <p className="mt-2 text-sm text-slate-600">
                Memberikan akses digital sederhana untuk UMKM: listing, peta
                interaktif, dan alat promosi lokal.
              </p>
            </div>

            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold">Visi</h3>
              <p className="mt-2 text-sm text-slate-600">
                Membangun ekosistem digital inklusif yang menaikkan ekonomi
                lokal secara berkelanjutan.
              </p>
            </div>

            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold">Nilai</h3>
              <p className="mt-2 text-sm text-slate-600">
                Inklusif • Praktis • Berkelanjutan • Lokal-First
              </p>
            </div>
          </div>
        </section>

        <section className="mt-8 bg-white p-6 md:p-10">
          <h2 className="text-2xl font-bold">Dampak Sosial & Ekonomi</h2>
          <ul className="mt-4 ml-5 list-disc text-slate-600">
            <li>Eksposur UMKM kecil ke audiens yang lebih luas.</li>
            <li>Mendorong transaksi lokal dan rantai pasokan setempat.</li>
            <li>
              Penyebaran pengetahuan digital lewat konten singkat dan panduan.
            </li>
            <li>
              Pengurangan emisi karena rantai pasok lokal—pilihan ramah
              lingkungan.
            </li>
          </ul>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold">KPI Dampak</h4>
              <ol className="mt-2 ml-5 list-decimal text-slate-600">
                <li>Jumlah UMKM terdaftar</li>
                <li>Peningkatan pengunjung toko (offline & online)</li>
                <li>Jumlah transaksi yang dimediasi platform</li>
              </ol>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold">Program Pendukung</h4>
              <p className="mt-2 text-sm text-slate-600">
                Workshop digital marketing, sesi foto produk sederhana, dan
                pairing dengan supplier lokal.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-8 bg-white p-6 md:p-10">
          <h2 className="text-2xl font-bold">Tim Pengembang</h2>
          <p className="mt-2 text-slate-600">
            Tim kecil, agile, fokus ke solusi nyata buat UMKM.
          </p>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {team.map((m) => (
              <article key={m.name} className="border rounded-lg p-4">
                <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center font-semibold text-slate-700">
                  {m.name.charAt(0)}
                </div>
                <h3 className="mt-3 font-semibold">{m.name}</h3>
                <p className="text-sm text-slate-500">{m.role}</p>
                <p className="mt-2 text-sm text-slate-600">{m.bio}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-8 bg-white p-6 md:p-10">
          <h2 className="text-2xl font-bold">Tech Stack</h2>
          <p className="mt-2 text-slate-600">
            Teknologi inti yang dipakai untuk membangun platform ini.
          </p>

          <div className="mt-4 flex flex-wrap gap-3">
            {techStack.map((t) => (
              <span
                key={t}
                className="px-3 py-1 rounded-full border text-sm font-medium"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold">Frontend</h4>
              <p className="mt-2 text-sm text-slate-600">
                React.js + Tailwind — SPA interaktif, komponen peta, dan
                responsive design.
              </p>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold">Backend</h4>
              <p className="mt-2 text-sm text-slate-600">
                Laravel (PHP) untuk API, autentikasi, admin panel, dan data
                management.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-emerald-50 to-sky-50 ">
          <div className="max-w-3xl">
            <h3 className="text-xl font-bold">
              Mau daftar UMKM atau kolaborasi?
            </h3>
            <p className="mt-2 text-slate-600">
              Kirim data UMKM kamu — kita bantu tampil di peta lokal.
            </p>
            <div className="mt-4 flex gap-3">
              <Link
                to="/daftar-umkm"
                className="px-4 py-2 rounded-md bg-slate-900 text-white"
              >
                Daftar Sekarang
              </Link>
              <Link to="/contact" className="px-4 py-2 rounded-md border">
                Hubungi Tim
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
