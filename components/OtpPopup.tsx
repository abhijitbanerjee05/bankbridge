import React, { useState, useEffect } from 'react';
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { sendOtp } from '@/lib/actions/user.actions';

const FormSchema = z.object({
    pin: z.string().min(4, {
        message: "Your otp must be 4 digits",
    }),
})

const OtpPopup = ({ isVisible, submitOtp }: { isVisible: boolean, submitOtp(otp : string) : void }) => {
    const [secondsRemaining, setSecondsRemaining] = useState(60);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            pin: "",
        },
    })

    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        submitOtp(data.pin);
    }

    useEffect(() => {
        if (secondsRemaining > 0 && isVisible) {
            const timerId = setInterval(() => {
                setSecondsRemaining(prevSeconds => prevSeconds - 1);
            }, 1000);

            return () => clearInterval(timerId);
        }
    }, [secondsRemaining]);

    return (
        <div className={`${isVisible ? 'visible' : "hidden"} fixed flex inset-0 justify-center items-center bg-gray-800/20 text-white`}>
            <div className='bg-white p-10 rounded-lg flex flex-col gap-4'>
                <h1 className='text-24 font-semibold text-gray-900'>
                    Enter Otp
                    <p className='text-16 font-normal text-gray-600 mt-2'>
                        Please enter the one-time password sent to your email.
                    </p>
                </h1>
                <div className='flex justify-center my-2 text-gray-600'>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name="pin"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <InputOTP maxLength={4} {...field}>
                                                <InputOTPGroup>
                                                    <InputOTPSlot index={0} />
                                                    <InputOTPSlot index={1} />
                                                    <InputOTPSlot index={2} />
                                                    <InputOTPSlot index={3} />
                                                </InputOTPGroup>
                                            </InputOTP>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </form>
                    </Form>
                </div>
                <button className='bg-bankGradient py-3 rounded-xl'>Submit</button>
                <div className='flex flex-col justify-end gap-1'>
                    <p className='text-gray-600 text-16 text-right'>Didn't get the otp?</p>
                    <div className='flex justify-end'>
                        <button className={`${secondsRemaining > 0 ? 'text-gray-600' : 'text-bankGradient'} w-fit ml-auto font-semibold`} disabled={secondsRemaining > 0}>Resend</button>
                        {secondsRemaining > 0 && <p className='text-gray-600'>&nbsp;in {secondsRemaining}</p>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OtpPopup