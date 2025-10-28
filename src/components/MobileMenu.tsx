import { DialogPanel, Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { ChevronDownIcon, XMarkIcon } from '@heroicons/react/20/solid'
import { cat, callsToAction } from './CategoryMenu'

export default function MobileMenu({ closeMenu }: { closeMenu: () => void }) {
  return (
    <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full bg-white p-6 sm:max-w-sm shadow-lg">
      <div className="flex items-center justify-between">
        <a href="#" className="text-lg font-bold text-gray-800">UMKMConnect</a>
        <button onClick={closeMenu} className="p-2 text-gray-500">
          <XMarkIcon className="h-6 w-6" />
        </button>
      </div>

      <div className="mt-6 space-y-4">
        <Disclosure>
          <DisclosureButton className="flex w-full items-center justify-between text-gray-800 font-semibold">
            Category
            <ChevronDownIcon className="h-5 w-5" />
          </DisclosureButton>
          <DisclosurePanel className="mt-2 space-y-2">
            {[...cat, ...callsToAction].map((item) => (
              <a key={item.name} href={item.href} className="block text-gray-700 pl-4">
                {item.name}
              </a>
            ))}
          </DisclosurePanel>
        </Disclosure>
        <a href="#" className="block text-gray-800 font-semibold">Search</a>
        <a href="#" className="block text-gray-800 font-semibold">Contact</a>
      </div>
    </DialogPanel>
  )
}
