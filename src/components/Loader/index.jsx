const Loader = () => {
  //16 elemanlı dizi oluştur
  const arr = new Array(16).fill("a")

  return arr.map(() => (
    <div data-testid="card-loader" className="bg-gray-300 text-slate-600 p-4 shadow-md shadow-slate-400 rounded-sm min-w-[207px] h-[88px] animate-pulse">
      <p className="bg-slate-400 mb-4 mt-2 h-[6px] rounded-sm w-1/3" />
      <h2 className="bg-slate-500 h-[6px] rounded-sm w-3/4" />
    </div>
  ));
};

export default Loader;
