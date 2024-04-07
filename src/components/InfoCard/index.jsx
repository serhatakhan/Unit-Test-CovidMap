const InfoCard = ({item}) => {
  return (
    <div className="bg-gray-300 text-slate-600 p-4 shadow-md shadow-slate-400 rounded-sm ">
        {/* _ olarak gelen yerlere " " boşluk gelsin dedik */}
        <p className="text-md font-semibold text-slate-600 mb-2 capitalize">{item[0].split("_").join(" ")}</p>
        <h2 className="text-lg font-bold text-slate-800">{item[1]}</h2>
    </div>
  )
}

export default InfoCard