"use client"
import React, { useState, useEffect } from 'react';
import { fetchAccountTransactions, fetchBankAccounts } from '@/lib/actions/user.actions';
import { formatAmount } from '@/lib/utils';
import TransactionsTable from '@/components/TransactionsTable';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import HeaderBox from '@/components/HeaderBox';
import { CgSpinner } from "react-icons/cg";
import TransactionsPagination from '@/components/TransactionsPagination';

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [bankAccounts, setBankAccounts] = useState<Account[]>([]);
  const [currentBankAccount, setCurrentBankAccount] = useState<Account>();
  const [loading, setLoading] = useState(true);
  const [isAccordionOpen, setIsAccordionOpen] = useState<string | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState<number>(0)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const currentAccount = await loadBankAccounts();

        if (currentAccount) {
          await loadTransactions(currentAccount, 1);
        }
      } catch (error) {
        console.error("Error during fetching data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const loadBankAccounts = async (): Promise<Account | undefined> => {
    try {
      const accounts = await fetchBankAccounts();
      if (accounts.length !== 0) {
        setBankAccounts(accounts);
        setCurrentBankAccount(accounts[0]);
        return accounts[0];
      }
    } catch (error) {
      console.error("Error fetching bank accounts", error);
    }
    return undefined;
  };

  const loadTransactions = async (account: Account, page: number) => {
    setLoading(true);
    try {
      const transactionsData = await fetchAccountTransactions(account, page, 10);
      setTransactions(transactionsData?.transactions);
      setTransactions(transactionsData?.transactions);
      setTotalPages(transactionsData?.totalPages)
    } catch (error) {
      console.error("Error fetching transactions", error);
    } finally {
      setLoading(false)
    }
  };

  const onAccountClick = (account: Account) => {
    setCurrentBankAccount(account);
    if (isAccordionOpen === 'current-bank-account') {
      setIsAccordionOpen(undefined);
    } else {
      setIsAccordionOpen('current-bank-account')
    }
    const fetchTransactions = async () => {
      await loadTransactions(account, 1);
    };
    fetchTransactions();
  };

  const handlePageClick = (page: number) => {
    const fetchTransactions = async (page: number) => {
      if (currentBankAccount) {
        await loadTransactions(currentBankAccount, page);
      }
    }
    setCurrentPage(page)
    fetchTransactions(page);
  }

  return (
    <div className='m-8'>
      <HeaderBox
        title="Transaction History"
        subtext="All transactions at your fingertips."
      />
      <Accordion
        type="single"
        collapsible
        value={isAccordionOpen}
        onValueChange={(value) => setIsAccordionOpen(value)}
        className="w-full py-3 rounded-xl mb-8"
      >
        <AccordionItem value='current-bank-account'>
          <AccordionTrigger className='text-left'>
            <div>
              <div>{currentBankAccount?.name}</div>
              <div>{currentBankAccount && formatAmount(currentBankAccount?.availableBalance)}</div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            {bankAccounts && bankAccounts.map((a: Account) => (
              <div
                key={a.name}
                className={`${a.name === currentBankAccount?.name ? 'hidden' : ''} cursor-pointer hover:bg-bankGradient hover:text-white hover:font-bold p-3 rounded-md border-b-2`}
                onClick={() => onAccountClick(a)}
              >
                <div>{a.name}</div>
                <div>{formatAmount(a.availableBalance)}</div>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      {loading ? (
        <div className='py-8 mx-auto'><CgSpinner className='h-10 w-10 loader' /></div>
      ) : (
        <TransactionsTable transactions={transactions} />
      )}
      <div className='my-4'>
        <TransactionsPagination currentPage={currentPage} totalPages={totalPages} handlePageClick={handlePageClick} />
      </div>

    </div>
  );
};

export default TransactionHistory;
