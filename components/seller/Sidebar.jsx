import React from 'react';
import Link from 'next/link';
import { assets } from '../../assets/assets';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const SideBar = () => {
    const pathname = usePathname()
    const menuItems = [
        { name: 'Add Product', path: '/seller', icon: assets.add_icon },
        { name: 'Product List', path: '/seller/product-list', icon: assets.product_list_icon },
        { name: 'Orders', path: '/seller/orders', icon: assets.order_icon },
    ];

    return (
        <div className='md:w-72 w-16 border-r min-h-screen text-sm border-cinnamon-primary/10 py-6 flex flex-col bg-cinnamon-accent/50'>
            {menuItems.map((item) => {

                const isActive = pathname === item.path;

                return (
                    <Link href={item.path} key={item.name} passHref>
                        <div
                            className={
                                `flex items-center py-4 px-6 gap-4 transition-all duration-300 ${isActive
                                    ? "bg-cinnamon-primary/10 border-r-4 border-cinnamon-primary text-cinnamon-primary font-medium"
                                    : "text-cinnamon-primary/60 hover:bg-cinnamon-primary/5 hover:text-cinnamon-primary"
                                }`
                            }
                        >
                            <Image
                                src={item.icon}
                                alt={`${item.name.toLowerCase()}_icon`}
                                className={`w-5 h-5 transition-opacity ${isActive ? 'opacity-100' : 'opacity-40'}`}
                            />
                            <p className='md:block hidden tracking-wide'>{item.name}</p>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
};

export default SideBar;
