"use client";
import HeaderBox from "@/components/HeaderBox";
import BalanceInfo from "@/components/BalanceInfo";
import React, { useState, useEffect } from "react";
import RecentTransactions from "@/components/RecentTransactions";
import { fetchAccountsData, getGlobalUser } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";
import ScreenLoader from "@/components/ScreenLoader";
import { DatePicker } from "@/components/DatePicker";

const Home = () => {
  const [user, setUser] = useState<User | null>(null);
  const [accountsData, setAccountsData] = useState<AccountsData>();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getGlobalUser(); // Await the promise
      if (!userData) {
        router.push("/sign-in");
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
        setIsLoading(false);
      }
    };

    fetchUser();
    loadAccountsData();
  }, []);

  if (isLoading) {
    return <ScreenLoader />;
  }

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <div className="title-box">
            <HeaderBox
              type="greeting"
              title="Welcome"
              user={user?.firstName || "Guest"}
              subtext="Access and manage your account and transactions!"
            />
            <div className="lg:ml-auto">
              <DatePicker />
            </div>
          </div>

          <BalanceInfo
            accounts={accountsData ? accountsData.accounts : []}
            totalBanks={accountsData ? accountsData.totalNumberOfAccounts : ""}
            totalAvailableBalance={
              accountsData ? accountsData.totalAvailableBalance : ""
            }
            totalIncome={accountsData && accountsData.totalIncome ? accountsData.totalIncome : ""}
            totalSavings={accountsData && accountsData.totalSavings ? accountsData.totalSavings : ""}
            totalSpent={accountsData && accountsData.totalSpent ? accountsData.totalSpent : ""}
          />

          <RecentTransactions />
        </header>
      </div>
    </section>
  );
};

export default Home;
