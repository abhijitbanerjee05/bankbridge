import HeaderBox from '@/components/HeaderBox'
import TotalBalanceBox from '@/components/TotalBalanceBox'
import TransactionsTable from '@/components/TransactionsTable'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RecentTransactions from '@/components/RecentTransactions';

const Home = () => {
  const loggedIn = { firstName: 'Abhijit' }

  return (
    <section className='home'>
      <div className='home-content'>
        <header className='home-header'>
          <HeaderBox
            type="greeting" title="Welcome" user={loggedIn?.firstName || 'Guest'}
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