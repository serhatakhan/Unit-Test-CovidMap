import { useState } from "react"
import Map from "../../components/Map"

const MapPage = () => {
  // hover olunan ülkenin isminin state'i
  const [tooltipContent, setTooltipContent] = useState("")

  return (
    <div className="h-[calc(100vh-82px)] bg-gray-200 text-white overflow-hidden max-md:pt-32">
     <h6 className="text-center text-slate-950 font-semibold p-1 text-lg">Country: {tooltipContent}</h6>
     <Map setTooltipContent={setTooltipContent} />
    </div>
  )
}

export default MapPage