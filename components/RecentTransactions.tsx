"use client"
import React, { useEffect, useState } from 'react';
import TransactionsTable from './TransactionsTable';
import { CgSpinner } from "react-icons/cg";
import { fetchAllTransactions } from '@/lib/actions/user.actions';
import TransactionsPagination from './TransactionsPagination';

const RecentTransactions = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([])
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState<number>(0)

    const loadTransactions = async (page: number) => {
        try {
            const transactionsData = await fetchAllTransactions(page, 10);
            setTransactions(transactionsData?.transactions);
            setTotalPages(transactionsData?.totalPages)
        } catch (error) {
            console.error("Error fetching transactions", error);
        } finally {
            setLoading(false);
        }
    };

    const handlePageClick = (page: number) => {
        setLoading(true);
        const fetchTransactions = async (page: number) => {
            await loadTransactions(page);
        }
        setCurrentPage(page)
        fetchTransactions(page);
    }

    useEffect(() => {
        loadTransactions(currentPage);
    }, []);

    return (
        <>
            <h2 className='text-xl font-bold'>Recent Transactions</h2>
            {
                loading ? <div className='py-8 mx-auto'><CgSpinner className='h-10 w-10 loader' /></div>
                    : <TransactionsTable transactions={transactions} />
            }
            <TransactionsPagination currentPage={currentPage} totalPages={totalPages} handlePageClick={handlePageClick} />
        </>
    )
}

export default RecentTransactions