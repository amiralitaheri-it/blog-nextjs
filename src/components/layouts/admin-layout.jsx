import React, {useCallback, useState} from 'react';

import {HomeIcon, UsersIcon,} from '@heroicons/react/outline'
import {BookOpenIcon} from "@heroicons/react/solid";
import PropTypes from "prop-types";

import Sidebar from "@/components/ui/sections/sidebar";
import Header from "@/components/admin-panel/header";

const navigation = [
    {name: 'Home', href: '/admin-panel', icon: HomeIcon},
    {name: 'Articles', href: '/admin-panel/articles', icon: BookOpenIcon},
    {name: 'Users', href: '/admin-panel/users', icon: UsersIcon},
]

const userNavigation = [
    {name: 'Your Profile', href: '#'},
    {name: 'Settings', href: '#'},
    {name: 'Sign out', href: '#'},
]


function AdminLayout({children}) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const classNames = useCallback((...classes) => {
        return classes.filter(Boolean).join(' ')
    }, []);

    return (
        <>
            <Sidebar sidebarOpen={sidebarOpen} navigation={navigation} classNames={classNames} setSidebarOpen={setSidebarOpen}/>
            <div className="md:pl-64 flex flex-col">
                <Header userNavigation={userNavigation} classNames={classNames} setSidebarOpen={setSidebarOpen}/>
                <main className="flex-1">
                    <div className="py-6">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                            <h1 className="text-3xl font-semibold text-gray-400">Admin Panel</h1>
                        </div>
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                            {/* Replace with your content */}
                            {children}
                            {/* /End replace */}
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}

AdminLayout.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
}

export default React.memo(AdminLayout);

