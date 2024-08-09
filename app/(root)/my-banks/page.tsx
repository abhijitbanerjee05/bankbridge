"use client"
import BankCard from '@/components/BankCard'
import React, { useState, useEffect } from 'react'
import HeaderBox from '@/components/HeaderBox'
import { CgSpinner } from "react-icons/cg";
import { fetchBankAccounts } from '@/lib/actions/user.actions'

const MyBanks = () => {
  const [bankAccounts, setBankAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBankAccounts = async () => {
      try {
        const accounts = await fetchBankAccounts();
        setBankAccounts(accounts);
      } catch (error) {
        console.error("Error fetching bank accounts", error);
      } finally {
        setLoading(false);
      }
    };

    loadBankAccounts();
  }, []);

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
          {
            loading ? <div className='pt-20 flex justify-center'><CgSpinner className='h-10 w-10 loader' /></div>
              :
              <div className="flex flex-wrap gap-6">
                {bankAccounts && bankAccounts.map((a: Account) => (
                  <BankCard
                    key={a.name}
                    account={a}
                    userName={'Abhijit'}
                  />
                ))}


                {/* <BankCard account={account} userName='Abhijit' /> */}
              </div>
          }
        </div>
      </div>
    </section>
  )
}

export default MyBanks