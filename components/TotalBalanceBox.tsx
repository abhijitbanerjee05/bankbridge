import React from "react";
import AnimatedCounter from "./AnimatedCounter";
import DoughnutChart from "./DoughnutChart";

const TotalBalanceBox = ({
  accounts,
  totalCurrentBalance,
}: TotlaBalanceBoxProps) => {
  return (
    <div className="total-balance">
      {" "}
      <div className="total-balance-chart">
        <DoughnutChart accounts={accounts} />
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <p className="total-balance-label">Total Balance</p>

          <p className="total-balance-amount flex-center gap-2">
            <AnimatedCounter amount={Number(totalCurrentBalance)} />
          </p>
        </div>
      </div>
    </div>
  );
};

export default TotalBalanceBox;
