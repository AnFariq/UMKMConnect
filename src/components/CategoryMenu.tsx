import {
  Popover,
  PopoverButton,
  PopoverPanel,
} from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import {
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  ArrowPathIcon,
  PhoneIcon,
  PlayCircleIcon,
} from '@heroicons/react/24/outline'

export const cat = [
  { name: 'Food', description: 'Kuliner dan makanan ringan', href: '#', icon: ChartPieIcon },
  { name: 'Healthy Food', description: 'Makanan sehat sekitar kampus', href: '#', icon: CursorArrowRaysIcon },
  { name: 'Security', description: 'Keamanan transaksi UMKM', href: '#', icon: FingerPrintIcon },
  { name: 'Integrations', description: 'Koneksi antar platform', href: '#', icon: SquaresPlusIcon },
  { name: 'Automations', description: 'Otomatisasi bisnis UMKM', href: '#', icon: ArrowPathIcon },
]

export const callsToAction = [
  { name: 'Watch demo', href: '#', icon: PlayCircleIcon },
  { name: 'Contact sales', href: '#', icon: PhoneIcon },
]

export default function CategoryMenu() {
  return (
    <Popover className="relative">
      <PopoverButton className="flex items-center gap-x-1 text-sm font-semibold text-gray-800">
        Category
        <ChevronDownIcon className="h-5 w-5 text-gray-500" />
      </PopoverButton>

      <PopoverPanel className="absolute left-1/2 z-10 mt-3 w-screen max-w-md -translate-x-1/2 overflow-hidden rounded-2xl bg-gray-900 text-white shadow-lg ring-1 ring-gray-700">
        <div className="p-4">
          {cat.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="group flex items-center gap-x-4 rounded-lg p-3 hover:bg-gray-800"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gray-700 group-hover:bg-gray-600">
                <item.icon className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-gray-400">{item.description}</p>
              </div>
            </a>
          ))}
        </div>
        <div className="grid grid-cols-2 divide-x divide-gray-800 bg-gray-800">
          {callsToAction.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold hover:bg-gray-700"
            >
              <item.icon className="h-5 w-5 text-gray-400" />
              {item.name}
            </a>
          ))}
        </div>
      </PopoverPanel>
    </Popover>
  )
}
