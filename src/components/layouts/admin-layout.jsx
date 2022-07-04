import React, {useState} from 'react';

import {HomeIcon, UsersIcon,} from '@heroicons/react/outline'
import {BookOpenIcon} from "@heroicons/react/solid";

import Sidebar from "../ui/sidebar";
import Header from "../ui/admin-panel/header";

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

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

function AdminLayout({children}) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <>
            <Sidebar navigation={navigation} classNames={classNames} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
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

export default AdminLayout;