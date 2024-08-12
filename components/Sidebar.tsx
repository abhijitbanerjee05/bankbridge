"use client"
import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { IoIosLogOut } from "react-icons/io";

const Sidebar = ({ user }: SiderbarProps) => {
    const pathname = usePathname()
    return (
        <section className='sidebar'>
            <nav className='flex flex-col gap-4'>
                <Link href='/' className='flex mb-12 cursor-pointer items-center gap-2'>
                    <Image src='/icons/logo.svg' width={34} height={34} alt='Bank Bridge' className='size-[24px] max-xl:size-14' />
                    <h1 className='sidebar-logo'>BankBridge</h1>
                </Link>

                {sidebarLinks.map((item) => {

                    const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`)

                    return (
                        <Link href={item.route} key={item.label}
                            className={cn('sidebar-link', { 'bg-bank-gradient': isActive })}
                        >
                            <div className='relative size-6'>
                                <Image src={item.imgURL} alt={item.label} fill className={cn({ 'brightness-[3] invert-0': isActive })} />
                            </div>
                            <p className={cn('sidebar-label', { '!text-white': isActive })}>{item.label}</p>
                        </Link>
                    )
                })}
            </nav>

            <div className='py-3 text-gray-800 xl:flex xl:items-center xl:justify-between xl:gap-2'>
                <div className='flex justify-center xl:justify-normal xl:gap-4 xl:items-center'>
                    <Avatar className='cursor-pointer'>
                        <AvatarImage src="images/blank-profile-picture.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <h2 className='cursor-pointer hidden xl:block'>Abhijit Banerjee</h2>
                </div>
                <IoIosLogOut className='cursor-pointer h-6 w-6  hidden xl:block' />
            </div>
        </section>
    )
}

export default Sidebar