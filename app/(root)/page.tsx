"use client"
import HeaderBox from '@/components/HeaderBox'
import TotalBalanceBox from '@/components/TotalBalanceBox'
import React, { useState, useEffect } from 'react';
import RecentTransactions from '@/components/RecentTransactions';
import { fetchAccountsData, fetchBankAccounts, getGlobalUser } from '@/lib/actions/user.actions';
import { useRouter } from 'next/navigation';

const Home = () => {
  const [user, setUser] = useState<User | null>(null);
  const [accountsData, setAccountsData] = useState<AccountsData>();
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getGlobalUser(); // Await the promise
      if (!userData) {
        router.push('/sign-up')
      }
      setUser(userData); // Set the user data in state
    };
    const loadAccountsData = async () => {
      try {
        const accounts = await fetchAccountsData();
        setAccountsData(accounts);
      } catch (error) {
        console.error("Error fetching bank accounts", error);
      } finally {
      }
    };

    fetchUser();
    loadAccountsData();
  }, []);

  return (
    <section className='home'>
      <div className='home-content'>
        <header className='home-header'>
          <HeaderBox
            type="greeting" title="Welcome" user={user?.firstName || 'Guest'}
            subtext="Access and manage your account and transactions!"
          />

          <TotalBalanceBox
            accounts={accountsData? accountsData.accounts : []}
            totalBanks={accountsData? accountsData.totalNumberOfAccounts : ''}
            totalCurrentBalance={accountsData? accountsData.totalCurrentBalance : ''}
          />

          <RecentTransactions />
        </header>
      </div>
    </section>
  )
}

export default Home