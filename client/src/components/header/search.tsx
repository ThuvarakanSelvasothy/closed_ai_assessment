import React from "react";
import Search22 from "./search";
import GoogleAutoComplete, { IAutocompletValue } from "./google_auto_complete";
import Loader from "../../assets/svg/loader";

type Props = {
  onChange?: (data: IAutocompletValue | undefined) => void;
  isLoading?: boolean;
};

export default function Search({ onChange, isLoading }: Props) {
  return (
    <>
      <div className=" w-full flex ">
        {/* <Search /> */}
        <div className="  max-w-sm w-full flex gap-1">
          <GoogleAutoComplete
            onChange={(data) => {
              onChange && onChange(data);
            }}
          />{" "}
          <div className=" w-8 flex justify-center items-center ">
            {isLoading && <Loader width={28} />}
          </div>
        </div>
      </div>
    </>
  );
}
