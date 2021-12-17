import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline'
import { signIn, signOut, useSession } from 'next-auth/react'

const navigation = [
  { name: 'Home', href: '#', current: true },
  { name: 'Instructions', href: '#instructions', current: false },
  { name: 'Contact', href: '#contact', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function Topbar() {
  const { data: session, status } = useSession();

  return (
    <Disclosure as="nav" className="shadow-lg">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md hover:text-gray-200 text-white  focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  {/* Temporary */}
                  <img
                    className="block lg:hidden h-8 w-auto"
                    src="http://www.playlistmerger.com/assets/img/logo/logo2.svg" 
                    alt="Playlist Merger"
                  />
                  {/* Temporary */}
                  <img
                    className="hidden lg:block h-8 w-auto"
                    src="http://www.playlistmerger.com/assets/img/logo/logo2.svg"
                    alt="Playlist Merger"
                  />
                </div>
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className='text-white hover:text-gray-200 hover:shadow-inner
                          px-3 py-2 rounded-md text-sm font-medium'
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">


                {session ? (
                  <Menu as="div" className="ml-3 relative">
                    <div>
                      <Menu.Button className="flex items-center text-sm rounded-full outline-none ring-2 ring-white hover:ring-gray-200 text-white hover:text-gray-200">
                        <span className="sr-only">Open user menu</span>
                        <p className='pl-2 pr-2 text-sm font-medium'>
                          {session?.user.name}
                        </p>
                        <img
                          className="h-8 w-8 rounded-full"
                          src={session?.user.image}
                        />
                        
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={() => signOut()}
                              className={classNames(active ? 'bg-gray-100' : '', 'w-full block px-4 py-2 text-sm text-black')}
                            >
                              <p>Logout</p>
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                ) : (
                  <button className="flex px-2 h-8 items-center text-sm rounded-full outline-none ring-2 ring-white hover:ring-gray-200 text-white hover:text-gray-200"
                    onClick={() => signIn("spotify", {callbackUrl: "/"})}>
                    <img src="images/spotify.svg"/>
                    <p className='pl-2 text-sm font-medium'>
                      Login with Spotify
                    </p>
                  </button>
                )}


                
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className='text-white hover:shadow-inner hover:text-white block
                    px-3 py-2 rounded-md text-base font-medium'
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

export default Topbar;
