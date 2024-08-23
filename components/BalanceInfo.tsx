import React from "react";
import IncomeBox from "./IncomeBox";
import SpentBox from "./SpentBox";
import SavingsBox from "./SavingsBox";
import TotalBalanceBox from "./TotalBalanceBox";

const BalanceInfo = ({
  accounts,
  totalBanks,
  totalCurrentBalance,
}: BalanceInfo) => {
  return (
    <section className="balance-info">
      <TotalBalanceBox
        accounts={accounts}
        totalBanks={totalBanks}
        totalCurrentBalance={totalCurrentBalance}
      ></TotalBalanceBox>
      <IncomeBox totalIncome={"1200"}></IncomeBox>
      <SpentBox totalSpent={"800"}></SpentBox>
      <SavingsBox totalSavings={"800"}></SavingsBox>
    </section>
  );
};

export default BalanceInfo;
