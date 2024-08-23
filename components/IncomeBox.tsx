import React from "react";
import AnimatedCounter from "./AnimatedCounter";
import { GiReceiveMoney } from "react-icons/gi";

const IncomeBox = ({ totalIncome }: { totalIncome: string }) => {
  return (
    <div className="total-balance">
      {" "}
      <div className="">
        {" "}
        <GiReceiveMoney className="h-[100px] w-[100px] text-green-600"></GiReceiveMoney>{" "}
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <p className="total-balance-label">Total Income</p>

          <p className="total-balance-amount flex-center gap-2">
            <AnimatedCounter amount={Number(totalIncome)} />
          </p>
        </div>
      </div>
    </div>
  );
};

export default IncomeBox;
