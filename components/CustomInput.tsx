import React, { useState } from 'react'
import { FormControl, FormField, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { Control, FieldPath } from 'react-hook-form'
import { z } from "zod"
import { signInFormSchema } from '@/lib/utils'
import { Eye, EyeOff } from 'lucide-react';

const formSchema = signInFormSchema()

interface CustomInput {
    control: Control<z.infer<typeof formSchema>>,
    name: FieldPath<z.infer<typeof formSchema>>,
    label: string,
    placeholder: string
}

const CustomSignInInput = ({ control, name, label, placeholder }: CustomInput) => {

    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <div className='form-item'>
                    <FormLabel className='form-label'>
                        {label}
                    </FormLabel>
                    <div className='flex flex-col w-full'>
                        <FormControl>
                            <div className='relative'>
                                <Input
                                    placeholder={placeholder}
                                    className='input-class'
                                    type={name === 'password' && !passwordVisible ? 'password' : 'text'}
                                    {...field}
                                />
                                {name === 'password' &&
                                    <span
                                        className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                                        onClick={togglePasswordVisibility}
                                    >
                                        {passwordVisible ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </span>}
                            </div>
                        </FormControl>
                        <FormMessage className='form-message mt-2' />
                    </div>
                </div>
            )}
        />
    )
}

export default CustomSignInInput