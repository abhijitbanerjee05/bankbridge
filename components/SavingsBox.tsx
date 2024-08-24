import React from "react";
import AnimatedCounter from "./AnimatedCounter";
import { GiTakeMyMoney } from "react-icons/gi";

const SavingsBox = ({ totalSavings }: { totalSavings: string }) => {
  return (
    <div className="total-balance">
      {" "}
      <div className="">
        {" "}
        <GiTakeMyMoney className="h-[100px] w-[100px] text-yellow-500"></GiTakeMyMoney>{" "}
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <p className="total-balance-label">Total Savings</p>

          <p className="total-balance-amount flex-center gap-2">
            <AnimatedCounter amount={Number(totalSavings)} />
          </p>
        </div>
      </div>
    </div>
  );
};

export default SavingsBox;
