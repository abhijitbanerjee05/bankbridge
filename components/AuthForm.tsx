"use client"
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState, useCallback } from 'react'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import CustomInput from './CustomInput'
import { authFormSchema } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { signUp } from '@/lib/actions/user.actions'
import { usePlaidLink, PlaidLinkOptions, PlaidLinkOnSuccess } from 'react-plaid-link';
import axios from 'axios';

const AuthForm = ({ type }: { type: string }) => {
    axios.defaults.baseURL = 'http://localhost:8080/user-service';
    const [token, setToken] = useState('');
    const router = useRouter()
    const [user, setuser] = useState()
    const [isLoading, setIsLoading] = useState(false)

    const formSchema = authFormSchema(type)

    useEffect(() => {
        async function fetch() {
            const response = await axios.get('/create-link-token');
            console.log(response.data.linkToken);
            setToken(response.data.linkToken);
        }
        fetch();
    }, [])

    // 1. Form Definition
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    // 2. Submit handler
    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        setIsLoading(true)
        try {
            if (type === 'sign-up') {
                // const newUser = await signUp(data)
                // setuser(newUser)
            }
            if (type === 'sign-in') {
                // const response = await signIn({
                //     email: data.email,
                //     password: data.password
                // })
                // if (response) {
                //     router.push('/')
                // }
            }
        } catch (error) {
            console.log(error)
        }
        console.log(data)
        setIsLoading(false)
    }

    const onSuccess = useCallback<PlaidLinkOnSuccess>(async (public_token: string) => {
        // await exchangePublicToken({
        //   publicToken: public_token,
        //   user,
        // })

        console.log(public_token)
        router.push('/');
        console.log("Link Successful!!")
    }, [user])

    const config: PlaidLinkOptions = {
        token,
        onSuccess
    }

    const { open, ready } = usePlaidLink(config);

    return (
        <section className='lg:grid lg:grid-cols-2 w-full justify-center'>
            <div className='mx-auto flex min-h-screen w-full max-w-[420px] flex-col justify-center gap-5 py-10 md:gap-8'>
                <header className='flex flex-col gap-5 md:gap-8'>
                    <Link href='/' className='flex cursor-pointer items-center gap-1'>
                        <Image src='/icons/logo.svg' width={34} height={34} alt='Bank Bridge' />
                        <h1 className='text-26 font-ibm-plex-serif font-bold text-black-1'>BankBridge</h1>
                    </Link>

                    <div className='flex flex-col gap-1 md:gap-3'>
                        <h1 className='text-24 lg:text-36 font-semibold text-gray-900'>
                            {user
                                ? 'Link Account'
                                : type === 'sign-in'
                                    ? 'Sign In'
                                    : 'Sign Up'
                            }
                            <p className='text-16 font-normal text-gray-600 mt-2'>
                                {
                                    user
                                        ? 'Link your account to get started'
                                        : 'Please enter your details'
                                }
                            </p>
                        </h1>
                    </div>
                </header>
                {user ? (
                    <button onClick={() => open()} disabled={!ready}>
                        Connect a bank account
                    </button>
                )
                    : (
                        <>
                            {/* Actual Form */}
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                    {type === 'sign-up' && (
                                        <>
                                            <div className='flex gap-4'>
                                                <CustomInput control={form.control} name='firstName' label='First Name' placeholder={'ex: John'} />
                                                <CustomInput control={form.control} name='lastName' label='Last Name' placeholder={'ex: Doe'} />
                                            </div>
                                            <CustomInput control={form.control} name='address1' label='Address' placeholder={'Enter your specific address'} />
                                            <CustomInput control={form.control} name='city' label='City' placeholder={'Enter your city'} />
                                            <div className='flex gap-4'>
                                                <CustomInput control={form.control} name='state' label='State' placeholder={'ex: NY'} />
                                                <CustomInput control={form.control} name='postalCode' label='Postal Code' placeholder={'ex: 10101'} />
                                            </div>
                                            <div className='flex gap-4'>
                                                <CustomInput control={form.control} name='dateOfBirth' label='Date of Birth' placeholder={'yyyy-mm-dd'} />
                                                <CustomInput control={form.control} name='ssn' label='SSN' placeholder={'ex: 1234'} />
                                            </div>
                                        </>
                                    )}
                                    <CustomInput control={form.control} name='email' label='Email' placeholder={'Enter your email'} />
                                    <CustomInput control={form.control} name='password' label='Password' placeholder={'Enter your password'} />
                                    <div className='flex flex-col gap-4'>
                                        <Button className='form-btn' type="submit" disabled={isLoading}>
                                            {isLoading ? (
                                                <>
                                                    <Loader2 className='animate-spin' /> &nbsp; Loading...
                                                </>
                                            ) : type === 'sign-in' ? 'Sign In' : 'Sign Up'
                                            }
                                        </Button>
                                    </div>
                                </form>
                            </Form>

                            <footer className='flex justify-center gap-1'>
                                <p className='text-14 font-normal text-gray-600'>
                                    {type === 'sign-in'
                                        ? "Don't have an account?"
                                        : "Already have an account?"}
                                </p>
                                <Link href={type === 'sign-in' ? '/sign-up' : '/sign-in'} className='form-link'>
                                    {type === 'sign-in' ? 'Sign Up' : 'Sign In'}
                                </Link>
                            </footer>
                        </>
                    )

                }
            </div>
            <div className='bg-blue-50'>
                <div className='w-full h-full xl:flex items-center justify-end overflow-hidden hidden'>
                    <Image
                        src='/images/login-page-image-xl.png'
                        height={1200}
                        width={1200}
                        alt='dashboard preview'
                        className='border-l-2 border-t-2 border-b-2 border-gray-700 rounded-s-2xl -mr-20'
                    />
                </div>
                <div className='w-full h-full lg:flex items-center justify-end overflow-hidden hidden xl:hidden'>
                    <Image
                        src='/images/login-page-image-lg.png'
                        height={1200}
                        width={1200}
                        alt='dashboard preview'
                        className='border-l-2 border-t-2 border-b-2 border-gray-700 rounded-s-2xl -mr-20'
                    />
                </div>
            </div>
        </section>
    )
}

export default AuthForm