import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import axios from 'axios';
import { getTransactionStatus, formatAmount, removeSpecialCharacters, formatDateTime } from '@/lib/utils';

interface TransactionsTableProps {
    transactions?: Transaction[];
}

const TransactionsTable = ({ transactions }: TransactionsTableProps) => {
    axios.defaults.baseURL = 'http://localhost:8080/api';

    return (
        <>
            <Table>
                <TableHeader className="bg-[#f9fafb]">
                    <TableRow>
                        <TableHead className="px-2">Transaction</TableHead>
                        <TableHead className="px-2">Amount</TableHead>
                        <TableHead className="px-2">Status</TableHead>
                        <TableHead className="px-2">Date</TableHead>
                        <TableHead className="px-2 max-md:hidden">Channel</TableHead>
                        <TableHead className="px-2 max-md:hidden">Category</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {transactions && transactions.length != 0 && transactions.map((t: Transaction) => {
                        const status = getTransactionStatus(new Date(t.date))
                        const amount = formatAmount(t.amount)

                        const isDebit = t.type === 'debit';
                        const isCredit = t.type === 'credit';
                        return (<TableRow key={t.transactionId} className={`${isDebit || amount[0] === '-' ? 'bg-[#FFFBFA]' : 'bg-[#F6FEF9]'} !over:bg-none !border-b-DEFAULT`}>
                            <TableCell className="max-w-[250px] pl-2 pr-10">
                                <div className="flex items-center gap-3">
                                    <Avatar>
                                        <AvatarImage src={t.logoUrl} alt='transaction logo' />
                                        <AvatarFallback className='bg-gray-500 text-white'>{t.name ? t.name.substring(0, 2).toUpperCase() : ''}</AvatarFallback>
                                    </Avatar>
                                    <h1 className="text-14 truncate font-semibold text-[#344054]">
                                        {removeSpecialCharacters(t.name)}
                                    </h1>
                                </div>
                            </TableCell>

                            <TableCell className={`pl-2 pr-10 font-semibold ${isDebit || amount[0] === '-' ?
                                'text-[#f04438]'
                                : 'text-[#039855]'
                                }`}>
                                {isDebit ? `-${amount}` : isCredit ? amount : amount}
                            </TableCell>

                            <TableCell className="pl-2 pr-10">
                                {status}
                            </TableCell>

                            <TableCell className="min-w-32 pl-2 pr-10">
                                {formatDateTime(new Date(t.date)).dateTime}
                            </TableCell>

                            <TableCell className="pl-2 pr-10 capitalize min-w-24 max-md:hidden">
                                {t.paymentChannel}
                            </TableCell>

                            <TableCell className="pl-2 pr-10 max-md:hidden">
                                {t.category[0]}
                            </TableCell>
                        </TableRow>)
                    })}
                </TableBody>
            </Table>

            {transactions && transactions.length === 0 && <h2 className='mx-auto no-transactions-label'>No transactions available</h2>}

        </>
    )
}

export default TransactionsTable