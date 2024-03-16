import React, { useState } from "react";
import { useAppDispatch } from "../../state_manager/hooks";
import { UpdateTempUnit } from "../../state_manager/slices";

interface IButton1 {
  onChange?: (event: boolean) => void;
  handleStyle?: React.CSSProperties;
  buttonStyle?: React.CSSProperties;
  value?: boolean;
  color?: string;
}

export default function TempSwitch({}: IButton1) {
  const [initvalue, setinitvalue] = useState(false);
  const dispatch = useAppDispatch();
  const handleClick = () => {
    const temp = initvalue;
    setinitvalue(!temp);
    dispatch(UpdateTempUnit({ value: temp ? "F" : "C" }));
  };
  return (
    <div
      className={` relative w-16 h-8 items-center p-[2px]  rounded-full flex cursor-pointer transition-all delay-200 ease-in-out
      ${initvalue ? " bg-primary-500 " : " bg-gray-300"}
      `}
      onClick={() => handleClick()}
    >
      <div className=" absolute w-full justify-between flex px-3 ">
        <p className=" font-medium text-lg text-white  ">F</p>
        <p className=" font-medium text-lg text-primary-500  ">C</p>
      </div>
      <div
        className={`h-[30px] w-[30px] rounded-full bg-gray-50 transition-all duration-300 ease-in-out flex justify-center items-center
        ${initvalue ? " translate-x-full" : "translate-x-0"}
        `}
      >
        <p className=" font-medium text-lg text-primary-500  ">
          {initvalue ? "C" : "F"}
        </p>
      </div>
    </div>
  );
}
