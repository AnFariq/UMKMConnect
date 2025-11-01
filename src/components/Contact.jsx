import React from "react";
import Header from "./Header";
import { ChevronDownIcon } from "@heroicons/react/16/solid";

export default function Contact() {
  return (
    <div className="relative min-h-screen w-full bg-white">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Header />
      </div>

      <div className="relative isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-1/2 -z-10 aspect-1155/678 w-144.5 max-w-none -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-288.75"
          />
        </div>
        <div class="mx-auto max-w-2xl text-center">
          <h2 class="text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl">
            Contact Us
          </h2>
          <p class="mt-2 text-lg/8 text-gray-600">
            Hubungi Kami Jika ingin melaporkan atau mengupdate daftar umkm.
          </p>
        </div>
        <form
          action="#"
          method="POST"
          className="mx-auto mt-16 max-w-xl sm:mt-20"
        >
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label
                htmlFor="namaUmkm"
                className="block text-sm/6 font-semibold text-gray-900"
              >
                Nama UMKM
              </label>
              <div className="mt-2.5">
                <input
                  id="namaUmkm"
                  name="namaUmkm"
                  type="text"
                  placeholder="Contoh: Warung Pak Karyo"
                  className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="emailUmkm"
                className="block text-sm/6 font-semibold text-gray-900"
              >
                Email UMKM
              </label>
              <div className="mt-2.5">
                <input
                  id="emailUmkm"
                  name="emailUmkm"
                  type="email"
                  placeholder="Contoh: karyodimari@gmail.com"
                  className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="nohpUmkm"
                className="block text-sm/6 font-semibold text-gray-900"
              >
                No. Hp UMKM
              </label>
              <div className="mt-2.5">
                <input
                  id="nohpUmkm"
                  name="nohpUmkm"
                  type="text"
                  placeholder="Contoh: 0812-3456-7890"
                  className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="sosmedUmkm"
                className="block text-sm/6 font-semibold text-gray-900"
              >
                Sosial Media UMKM
              </label>
              <div className="mt-2.5">
                <div className="flex rounded-md bg-white outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
                  <div className="grid shrink-0 grid-cols-1 focus-within:relative">
                    <select
                      id="medsos"
                      name="medsos"
                      autoComplete="medsos"
                      aria-label="Medsos"
                      className="col-start-1 row-start-1 w-full appearance-none rounded-md py-2 pr-7 pl-3.5 text-base text-gray-500 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    >
                      <option>Instagram</option>
                      <option>(X) Twitter</option>
                      <option>Tiktok</option>
                    </select>
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                    />
                  </div>
                  <input
                    id="sosmedUmkm"
                    name="sosmedUmkm"
                    type="text"
                    placeholder="@karyo"
                    className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="pesan"
                className="block text-sm/6 font-semibold text-gray-900"
              >
                Pesan
              </label>
              <div className="mt-2.5">
                <textarea
                  id="pesan"
                  name="pesan"
                  rows={4}
                  placeholder="Contoh: Ingin mengubah detail UMKM saya"
                  className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                  defaultValue={""}
                />
              </div>
            </div>
            <div className="flex gap-x-4 sm:col-span-2">
              <div className="flex h-6 items-center">
                <div className="group relative inline-flex w-8 shrink-0 rounded-full bg-gray-200 p-px inset-ring inset-ring-gray-900/5 outline-offset-2 outline-indigo-600 transition-colors duration-200 ease-in-out has-checked:bg-indigo-600 has-focus-visible:outline-2">
                  <span className="size-4 rounded-full bg-white shadow-xs ring-1 ring-gray-900/5 transition-transform duration-200 ease-in-out group-has-checked:translate-x-3.5" />
                  <input
                    id="agree-to-policies"
                    name="agree-to-policies"
                    type="checkbox"
                    aria-label="Agree to policies"
                    className="absolute inset-0 appearance-none focus:outline-hidden"
                  />
                </div>
              </div>
              <label
                htmlFor="agree-to-policies"
                className="text-sm/6 text-gray-600"
              >
                By selecting this, you agree to our{" "}
                <a
                  href="#"
                  className="font-semibold whitespace-nowrap text-indigo-600"
                >
                  privacy policy
                </a>
                .
              </label>
            </div>
          </div>
          <div className="mt-10">
            <button
              type="submit"
              className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Kirim
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
