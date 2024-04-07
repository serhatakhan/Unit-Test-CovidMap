import { IoSearchOutline } from "react-icons/io5";

const Form = ({handleSubmit}) => {
  return (
    <form onSubmit={handleSubmit} className="flex items-center border rounded">
      <input
        type="text"
        placeholder="Search by country name"
        className="bg-transparent py-2 px-3 md:px-5 outline-none"/>

      <button className="bg-transparent w-full h-full text-2xl p-2 rounded transition hover:bg-green-900">
        <IoSearchOutline className="text-green-400" />
      </button>
    </form>
  );
};

export default Form;
