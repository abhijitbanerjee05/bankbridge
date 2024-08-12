"use client"
import React from 'react'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import Image from 'next/image'
import Link from 'next/link'
import { sidebarLinks } from '@/constants'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { IoIosLogOut } from "react-icons/io";


const MobileNav = ({ user }: MobileNavProps) => {
    const pathname = usePathname()
    return (
        <section className='w-full max-w-[264px]'>
            <Sheet>
                <SheetTrigger>
                    <Image src='icons/hamburger.svg' width={30} height={30} alt='menu' className='cursor-pointer' />
                </SheetTrigger>
                <SheetContent side='left' className='border-none bg-white'>
                    <Link href='/' className='flex mb-12 cursor-pointer items-center gap-1 px-4'>
                        <Image src='/icons/logo.svg' width={34} height={34} alt='Bank Bridge' />
                        <h1 className='text-26 font-ibm-plex-serif font-bold text-black-1'>BankBridge</h1>
                    </Link>

                    <div className='mobilenav-sheet'>
                        <SheetClose asChild>
                            <nav className='flex h-full flex-col justify-between gap-6 text-white'>
                                <div>
                                    {sidebarLinks.map((item) => {

                                        const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`)

                                        return (
                                            <SheetClose asChild key={item.route}>
                                                <Link href={item.route} key={item.label}
                                                    className={cn('mobilenav-sheet_close w-full', { 'bg-bank-gradient': isActive })}
                                                >
                                                    <Image src={item.imgURL} width={20} height={20} alt={item.label} className={cn({ 'brightness-[3] invert-0': isActive })} />
                                                    <p className={cn('text-16 font-semibold text-black-2', { '!text-white': isActive })}>{item.label}</p>
                                                </Link>
                                            </SheetClose>
                                        )
                                    })}
                                </div>
                                <div className='py-3 text-gray-800 flex items-center justify-between gap-2'>
                                    <div className='flex gap-4 items-center truncate'>
                                        <Avatar className='cursor-pointer'>
                                            <AvatarImage src="images/blank-profile-picture.png" />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                        <h2 className='cursor-pointer'>Abhijit Banerjee</h2>
                                    </div>
                                    <IoIosLogOut className='cursor-pointer h-6 w-6' />
                                </div>
                            </nav>
                        </SheetClose>
                    </div>
                </SheetContent>
            </Sheet>

        </section>
    )
}

export default MobileNav