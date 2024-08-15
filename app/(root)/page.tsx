"use client"
import HeaderBox from '@/components/HeaderBox'
import TotalBalanceBox from '@/components/TotalBalanceBox'
import React, { useState, useEffect } from 'react';
import RecentTransactions from '@/components/RecentTransactions';
import { getGlobalUser } from '@/lib/actions/user.actions';
import { useRouter } from 'next/navigation';

const Home = () => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getGlobalUser(); // Await the promise
      if (!userData) {
        router.push('/sign-up')
      }
      setUser(userData); // Set the user data in state
    };

    fetchUser();
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
            accounts={[]}
            totalBanks={1}
            totalCurrentBalance={1850.30}
          />

          <RecentTransactions />
        </header>
      </div>
    </section>
  )
}

export default Home