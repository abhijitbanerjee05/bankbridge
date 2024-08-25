"use client";
import React, { useEffect, useState } from "react";
import TransactionsTable from "./TransactionsTable";
import { CgSpinner } from "react-icons/cg";
import { fetchAllTransactions } from "@/lib/actions/user.actions";
import TransactionsPagination from "./TransactionsPagination";
import { DateRange } from "react-day-picker";
import { startOfMonth, format } from "date-fns";

interface RecentTransactionsProps {
  dateRange?: DateRange;
}

const RecentTransactions: React.FC<RecentTransactionsProps> = ({
  dateRange,
}) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  const defaultDateRange: DateRange = {
    from: startOfMonth(new Date()),
    to: new Date(),
  };

  const effectiveDateRange = dateRange || defaultDateRange;

  const loadTransactions = async (page: number) => {
    if (
      effectiveDateRange &&
      effectiveDateRange.from &&
      effectiveDateRange.to
    ) {
      try {
        const startDate = format(effectiveDateRange.from, "yyyy-MM-dd");
        const endDate = format(effectiveDateRange.to, "yyyy-MM-dd");
        const transactionsData = await fetchAllTransactions(
          page,
          10,
          startDate,
          endDate
        );
        setTransactions(transactionsData?.transactions);
        setTotalPages(transactionsData?.totalPages);
      } catch (error) {
        console.error("Error fetching transactions", error);
      } finally {
        setLoading(false);
      }
    } else {
      console.error("Invalid date range");
    }
  };

  const handlePageClick = (page: number) => {
    setLoading(true);
    const fetchTransactions = async (page: number) => {
      await loadTransactions(page);
    };
    setCurrentPage(page);
    fetchTransactions(page);
  };

  useEffect(() => {
    loadTransactions(currentPage);
  }, [currentPage, dateRange]); // Re-fetch transactions when dateRange changes

  return (
    <>
      <h2 className="text-xl font-bold">Recent Transactions</h2>
      {loading ? (
        <div className="py-8 mx-auto">
          <CgSpinner className="h-10 w-10 loader" />
        </div>
      ) : (
        <TransactionsTable transactions={transactions} />
      )}
      <TransactionsPagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageClick={handlePageClick}
      />
    </>
  );
};

export default RecentTransactions;
