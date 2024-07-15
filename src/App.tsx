// @ts-nocheck

import { useState } from "react";

import FormulaInput from "./components/formula-input";
import useFormulaStore from "./stores/useFormulaStore";

const Formula = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { result, error } = useFormulaStore();

  const openHandler = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="m-14 border rounded-md border-slate-200 text-slate-900">
      <div className="flex justify-between items-center bg-slate-200 p-3">
        <div className="flex gap-1 items-center">
          {isOpen ? (
            <div
              className="cursor-pointer text-slate-600"
              onClick={openHandler}
            >
              <i className="fa fa-chevron-down"></i>
            </div>
          ) : (
            <div
              className="cursor-pointer text-slate-600"
              onClick={openHandler}
            >
              <i className="fa fa-chevron-right"></i>
            </div>
          )}
          <p className="text-md">New Formula</p>
        </div>
        <div className="flex gap-1">
          <div className="cursor-pointer text-slate-600">
            <i className="fa fa-info-circle"></i>
          </div>
          <div className="cursor-pointer text-slate-600">
            <i className="fa fa-edit"></i>
          </div>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center py-2 px-4 bg-slate-100">
          {!error ? (
            <p className="text-2xl">{result}</p>
          ) : (
            <p className="text-2xl ">
              <i className="fa fa-exclamation-circle text-red-600 pr-2"></i>#
              {error}
            </p>
          )}
          <p className="text-xs bg-slate-200 rounded-md p-1">July 2024</p>
        </div>
        {isOpen && (
          <div className="p-3 flex flex-col gap-2">
            <FormulaInput />
            <div className="cursor-pointer flex gap-1 text-blue-600 text-xs items-center">
              <div className="w-5 h-5">
                <i className="fa fa-plus"></i>
              </div>
              <a>Add Time Segment</a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Formula;
