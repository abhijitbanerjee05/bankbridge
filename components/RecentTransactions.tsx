"use client"
import React, { useEffect, useState } from 'react';
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
import { fetchAllTransactions } from '@/lib/actions/user.actions';

const RecentTransactions = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([])
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageNumberArray, setPageNumberArray] = useState<number[]>([]);
    const [totalPages, setTotalPages] = useState<number>(0)

    const loadTransactions = async (page : number) => {
        try {
            const transactionsData = await fetchAllTransactions(page, 1);
            setTransactions(transactionsData?.transactions);
            setTotalPages(transactionsData?.totalPages)
            if (transactionsData?.totalPages > 1) {
                if (transactionsData.totalPages == 2) {
                    setPageNumberArray([1, 2])
                } else {
                    setPageNumberArray([1, 2, 3])
                }
            } else {
                setPageNumberArray([1])
            }
        } catch (error) {
            console.error("Error fetching transactions", error);
        } finally {
            setLoading(false);
        }
    };

    const handlePageClick = (page : number) => {
        const fetchTransactions = async (page : number) => {
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
            <AccountSelectionTab />
            {
                loading ? <div className='py-8 mx-auto'><CgSpinner className='h-10 w-10 loader' /></div>
                    : <TransactionsTable transactions={transactions} />
            }
            <Pagination>
                <PaginationContent>
                    {currentPage > 1 &&
                        <PaginationItem onClick={() => handlePageClick(currentPage - 1)}>
                            <PaginationPrevious href="#" />
                        </PaginationItem>}

                    {pageNumberArray[0] > totalPages &&
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>}

                    {pageNumberArray.map((page) => (
                        <PaginationItem onClick={() => handlePageClick(page)}>
                            <PaginationLink href="#" isActive={page === currentPage}>{page}</PaginationLink>
                        </PaginationItem>
                    ))}

                    {pageNumberArray[pageNumberArray.length - 1] < totalPages &&
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>}

                    {currentPage !== totalPages &&
                        <PaginationItem onClick={() => handlePageClick(currentPage + 1)}>
                            <PaginationNext href="#" />
                        </PaginationItem>}
                </PaginationContent>
            </Pagination>
        </>
    )
}

export default RecentTransactions