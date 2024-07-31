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
import { fetchTransactions } from '@/lib/actions/user.actions';

const RecentTransactions = () => {
    axios.defaults.baseURL = 'http://localhost:8080/user-service';
    const [transactions, setTransactions] = useState<Transaction[]>([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadTransactions = async () => {
            try {
              const transactions = await fetchTransactions();
              setTransactions(transactions);
            } catch (error) {
              console.error("Error fetching transactions", error);
            } finally {
              setLoading(false);
            }
          };
      
          loadTransactions();
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