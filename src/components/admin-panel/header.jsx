import React, {Suspense} from 'react';
import dynamic from "next/dynamic";

import {BellIcon, MenuAlt2Icon} from "@heroicons/react/solid";
import PropTypes from "prop-types";

import SearchInput from "@/components/ui/form/search-input";
import Loading from "@/components/ui/sections/loading";

const ProfileDropdown = dynamic(() => import('@/components/dashboard/profile-dropdown'), {
    suspense: true,
})

function Header({userNavigation, classNames, setSidebarOpen}) {
    return (
        <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-gray-900 shadow">
            <button
                type="button"
                className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
                onClick={() => setSidebarOpen(true)}
            >
                <span className="sr-only">Open sidebar</span>
                <MenuAlt2Icon className="h-6 w-6" aria-hidden="true"/>
            </button>
            <div className="flex-1 px-4 flex justify-between">
                <div className="flex-1 flex">
                    <SearchInput/>
                </div>
                <div className="ml-4 flex items-center md:ml-6">
                    <button
                        type="button"
                        className="bg-gray-900 p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        <BellIcon className="h-6 w-6" aria-hidden="true"/>
                    </button>

                    <Suspense fallback={<Loading/>}>
                        <ProfileDropdown userNavigation={userNavigation} classNames={classNames}/>
                    </Suspense>
                </div>
            </div>
        </div>
    );
}

Header.propTypes = {
    userNavigation: PropTypes.array,
    setSidebarOpen: PropTypes.func,
    classNames: PropTypes.func,
}

export default React.memo(Header);