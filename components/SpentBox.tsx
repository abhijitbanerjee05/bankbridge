import React from "react";
import AnimatedCounter from "./AnimatedCounter";
import { GiPayMoney } from "react-icons/gi";

const SpentBox = ({ totalSpent }: { totalSpent: string }) => {
  return (
    <div className="total-balance">
      {" "}
      <div className="">
        {" "}
        <GiPayMoney className="h-[100px] w-[100px] text-red-600"></GiPayMoney>{" "}
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <p className="total-balance-label">Total Spent</p>

          <p className="total-balance-amount flex-center gap-2">
            <AnimatedCounter amount={Number(totalSpent)} />
          </p>
        </div>
      </div>
    </div>
  );
};

export default SpentBox;
