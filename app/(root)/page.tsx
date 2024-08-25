"use client";
import HeaderBox from "@/components/HeaderBox";
import BalanceInfo from "@/components/BalanceInfo";
import React, { useState, useEffect } from "react";
import RecentTransactions from "@/components/RecentTransactions";
import { fetchAccountsData, getGlobalUser } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";
import ScreenLoader from "@/components/ScreenLoader";
import { DatePicker } from "@/components/DatePicker";
import { DateRange } from "react-day-picker";
import { startOfMonth, format } from "date-fns";

const Home = () => {
  const [user, setUser] = useState<User | null>(null);
  const [accountsData, setAccountsData] = useState<AccountsData>();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: startOfMonth(new Date()),
    to: new Date(),
  });

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getGlobalUser(); // Await the promise
      if (!userData) {
        router.push("/sign-in");
      }
      setUser(userData); // Set the user data in state
    };
    const loadAccountsData = async () => {
      if (date && date.from && date.to) {
        // Check if dateRange is valid
        try {
          const startDate = format(date.from, "yyyy-MM-dd");
          const endDate = format(date.to, "yyyy-MM-dd");
          const accounts = await fetchAccountsData(startDate, endDate);
          setAccountsData(accounts);
        } catch (error) {
          console.error("Error fetching bank accounts", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        console.error("Invalid date range");
        setIsLoading(false);
      }
    };

    fetchUser();
    loadAccountsData();
  }, [date]);

  const handleDateChange = (date: DateRange | undefined) => {
    setDate(date);
  };

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
              <DatePicker onDateChange={handleDateChange} />
            </div>
          </div>

          <BalanceInfo
            accounts={accountsData ? accountsData.accounts : []}
            totalBanks={accountsData ? accountsData.totalNumberOfAccounts : ""}
            totalAvailableBalance={
              accountsData ? accountsData.totalAvailableBalance : ""
            }
            totalIncome={
              accountsData && accountsData.totalIncome
                ? accountsData.totalIncome
                : ""
            }
            totalSavings={
              accountsData && accountsData.totalSavings
                ? accountsData.totalSavings
                : ""
            }
            totalSpent={
              accountsData && accountsData.totalSpent
                ? accountsData.totalSpent
                : ""
            }
          />

          <RecentTransactions dateRange={date} />
        </header>
      </div>
    </section>
  );
};

export default Home;
