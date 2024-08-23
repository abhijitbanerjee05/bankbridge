import React, { useState, useEffect } from 'react';
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
    pin: z.string().min(6, {
        message: "Your OTP must be 6 digits",
    }),
});

const OtpPopup = ({ isVisible, otpSubmitLoader, otpError, submitOtp }: { isVisible: boolean, otpSubmitLoader: boolean, otpError: boolean, submitOtp(otp: string): void }) => {
    const [secondsRemaining, setSecondsRemaining] = useState(60);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            pin: "",
        },
    });

    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        submitOtp(data.pin);
    };

    useEffect(() => {
        if (isVisible) {
            setSecondsRemaining(60); // Reset the timer when the popup becomes visible

            const timerId = setInterval(() => {
                setSecondsRemaining(prevSeconds => prevSeconds > 0 ? prevSeconds - 1 : 0);
            }, 1000);

            return () => clearInterval(timerId);
        }
    }, [isVisible]); // Include isVisible in the dependency array

    return (
        <div className={`${isVisible ? 'visible' : "hidden"} fixed flex inset-0 justify-center items-center bg-gray-800/20 text-white`}>
            <div className='bg-white p-10 rounded-lg flex flex-col gap-4'>
                <h1 className='text-24 font-semibold text-gray-900'>
                    Enter OTP
                    <p className='text-16 font-normal text-gray-600 mt-2'>
                        Please enter the one-time password sent to your email.
                    </p>
                </h1>
                <div className='flex justify-center text-gray-600 w-full'>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                            <FormField
                                control={form.control}
                                name="pin"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <InputOTP maxLength={6} {...field}>
                                                <InputOTPGroup>
                                                    <InputOTPSlot index={0} />
                                                    <InputOTPSlot index={1} />
                                                    <InputOTPSlot index={2} />
                                                    <InputOTPSlot index={3} />
                                                    <InputOTPSlot index={4} />
                                                    <InputOTPSlot index={5} />
                                                </InputOTPGroup>
                                            </InputOTP>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {otpError && <div className={`my-2`}><p className='text-red-800 text-16 text-center'>Incorrect OTP!</p></div>}
                            <Button className='form-btn w-full' type="submit">
                                {otpSubmitLoader ? (
                                    <>
                                        <Loader2 className='animate-spin' /> &nbsp; Loading...
                                    </>
                                ) : <span>Submit</span>
                                }
                            </Button>
                        </form>
                    </Form>
                </div>
                <div className='flex flex-col justify-end gap-1'>
                    <p className='text-gray-600 text-16 text-right'>Didn&apos;t get the otp?</p>
                    <div className='flex justify-end'>
                        <button className={`${secondsRemaining > 0 ? 'text-gray-600' : 'text-bankGradient'} w-fit ml-auto font-semibold`} disabled={secondsRemaining > 0}>Resend</button>
                        {secondsRemaining > 0 && <p className='text-gray-600'>&nbsp;in {secondsRemaining}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OtpPopup;
