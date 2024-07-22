"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TransactionsTable from './TransactionsTable';
import AccountSelectionTab from './AccountSelectionTab';
import { CgSpinner } from "react-icons/cg";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

const RecentTransactions = () => {
    axios.defaults.baseURL = 'http://localhost:8080/user-service';
    const [transactions, setTransactions] = useState<Transaction[]>([])
    const [loading, setLoading] = useState(true);

    const transactionsRequest = {
        userId: "d43cc601-df38-477e-8362-e85e51109690",
        startDate: "2024-01-01",
        endDate: "2024-06-01",
        pageNumber: 1
    }

    useEffect(() => {
        async function fetch() {
            const response = await axios.post("/transactions", transactionsRequest);
            console.log(response.data.transactions);
            setTransactions(response.data?.transactions)
            setLoading(false)
        }
        fetch()
    }, []);
    return (
        <>
        <h2 className='text-xl font-bold'>Recent Transactions</h2>
        <AccountSelectionTab />
        {
            loading ? <div className='py-8 mx-auto'><CgSpinner  className='h-10 w-10 loader' /></div>
                    : <TransactionsTable transactions={transactions}/>
        }
        <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#" isActive>1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext href="#" />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </>
    )
}

export default RecentTransactions