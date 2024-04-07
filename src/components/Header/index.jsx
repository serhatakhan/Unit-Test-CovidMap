import { FaVirusCovid } from "react-icons/fa6";
import { TbVaccine } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom"
import Form from "./Form";

const Header = () => {
  const navigate = useNavigate()

  const handleSubmit = (e) =>{
    e.preventDefault()

    // aratılan metni al
    const text = e.target[0].value

    // kullanıcıyı detay sayfasına yönlendir
    navigate(`/detail/${text}`)

    e.target.reset()
  }

  return (
    <header className="flex bg-slate-950 text-white py-5 px-10 md:px-20 justify-between items-center">
      <Link to={'/'} className="flex items-center gap-2">
        <FaVirusCovid className="text-green-500 text-xl" />
        <h1 className="font-mono font-semibold text-lg md:text-xl">COVID Tracker</h1>
      </Link>

     <Form handleSubmit={handleSubmit} />

      <div className="max-md:hidden flex items-center gap-3">
        <p className="flex flex-col text-sm">
          <span>Vaccinated Today</span>
          <span className="text-gray-400">(12.345)</span>
        </p>
        <TbVaccine className="text-xl" />
      </div>
    </header>
  )
}

export default Header