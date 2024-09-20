"use client";

import { Button } from "@/app/components/ui/button";
import { HomeIcon, BarChart3Icon, BellIcon, XCircle } from "lucide-react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
  const { data: session } = useSession();
  const user = session?.user;
  console.log(user);
  return (
    <Disclosure as="nav" className="bg-white shadow">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button */}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#e8cc2b]">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <BarChart3Icon
                aria-hidden="true"
                className="block h-6 w-6 group-data-[open]:hidden"
              />
              <XCircle
                aria-hidden="true"
                className="hidden h-6 w-6 group-data-[open]:block"
              />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <img
                alt="Your Company"
                src="/jumper.png"
                className="h-8 w-auto"
              />
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {/* Current: "border-[#e8cc2b] text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
              <Link
                href="/dashboard/shipments"
                className="inline-flex items-center border-b-2 border-[#e8cc2b] px-1 pt-1 text-sm font-medium text-gray-900"
              >
                Dashboard
              </Link>
              <Link
                href="/dashboard/shipments"
                className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
              >
                Liste des expeditions
              </Link>
              <Link
                href="/dashboard/customers"
                className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
              >
                Liste des clients
              </Link>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <Button onClick={() => signOut()} variant="destructive" size="sm">
              Deconnexion
            </Button>

            {/* Profile dropdown */}
            <Menu as="div" className="relative ml-3">
              <div>
                <MenuButton className="relative flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#e8cc2b] focus:ring-offset-2">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span>
                  <Image
                    width={100}
                    height={100}
                    alt="User initials"
                    src={`https://ui-avatars.com/api/?name=${user?.name}&background=random`}
                    className="h-12 w-12 rounded-full"
                  />
                </MenuButton>
              </div>
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                <MenuItem>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                  >
                    Your Profile
                  </a>
                </MenuItem>
                <MenuItem>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                  >
                    Settings
                  </a>
                </MenuItem>
                <MenuItem>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                  >
                    Sign out
                  </a>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 pb-4 pt-2">
          {/* Current: "bg-[#e8cc2b]-50 border-[#e8cc2b] text-[#e8cc2b]-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" */}
          <DisclosureButton
            as="a"
            href="/dashboard/shipments"
            className="block border-l-4 border-[#e8cc2b] bg-[#e8cc2b] py-2 pl-3 pr-4 text-base font-medium text-[#e8cc2b]-700"
          >
            Dashboard
          </DisclosureButton>
          <DisclosureButton
            as="a"
            href="/dashboard/shipments"
            className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
          >
            Liste des éxpeditions
          </DisclosureButton>
          <DisclosureButton
            as="a"
            href="/dashboard/customers"
            className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
          >
            Liste des clients
          </DisclosureButton>
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
};

// return (
//   <>
//     <header className="bg-white shadow">
//       <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
//         <div className="flex items-center">
//           <HomeIcon className="h-8 w-8 text-gray-500 mr-3" />
//           <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
//         </div>
//         <div className="flex items-center">
//           <span className="mr-4">{user?.name}</span>
//           <Button onClick={() => signOut()} variant="destructive" size="sm">
//             Deconnexion
//           </Button>
//         </div>
//       </div>
//     </header>
//   </>
// );
export default Header;
