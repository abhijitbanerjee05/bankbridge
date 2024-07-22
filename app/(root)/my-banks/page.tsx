import BankCard from '@/components/BankCard'
import React from 'react'
import HeaderBox from '@/components/HeaderBox'

const MyBanks = () => {
  let account: Account = {
    name: 'CIBC',
    currentBalance: 1200,
    mask: '1234'

  }
  return (
    <section className='flex'>
      <div className="my-banks">
        <HeaderBox
          title="My Bank Accounts"
          subtext="Effortlessly manage your banking activites."
        />

        <div className="space-y-4">
          <h2 className="header-2">
            Your cards
          </h2>
          <div className="flex flex-wrap gap-6">
            {/* {accounts && accounts.data.map((a: Account) => (
              <BankCard 
                key={accounts.id}
                account={a}
                userName={loggedIn?.firstName}
              />
            ))} */}

            <BankCard account={account} userName='Abhijit' />
          </div>
        </div>
      </div>
    </section>
  )
}

export default MyBanks