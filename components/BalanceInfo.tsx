import React from "react";
import IncomeBox from "./IncomeBox";
import SpentBox from "./SpentBox";
import SavingsBox from "./SavingsBox";
import TotalBalanceBox from "./TotalBalanceBox";

const BalanceInfo = ({ accounts, totalAvailableBalance, totalIncome, totalSpent, totalSavings }: BalanceInfoParams) => {
  return (
    <section className="balance-info">
      <TotalBalanceBox
        accounts={accounts}
        totalAvailableBalance={totalAvailableBalance}
      ></TotalBalanceBox>
      <IncomeBox totalIncome={totalIncome}></IncomeBox>
      <SpentBox totalSpent={totalSpent}></SpentBox>
      <SavingsBox totalSavings={totalSavings}></SavingsBox>
    </section>
  );
};

export default BalanceInfo;
