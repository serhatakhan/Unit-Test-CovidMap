import { IoWarning } from "react-icons/io5";

const ErrorDisplay = ({ message, retry }) => {
  return (
    // col-span-3 diyerek 3 sütunluk alan kaplatmış olduk buna. normalde tek sütünluk alan kaplıyordu. neden? çünkü çağırdığımız yerde öyle bir grid yapısı yazmıştık.
    <div className="col-span-3 flex flex-col w-full gap-6">
      <div className="flex items-center gap-4 bg-red-600 rounded-sm p-5">
        <IoWarning className="text-4xl" />
        <div>
          <h2>Sorry, an error occurred :/</h2>
          <p>{message}</p>
        </div>
      </div>

      <button onClick={retry} className="border border-slate-700 text-slate-700 hover:bg-slate-800 hover:text-white transition rounded-sm p-2">Try Again</button>
    </div>
  );
};

export default ErrorDisplay;
