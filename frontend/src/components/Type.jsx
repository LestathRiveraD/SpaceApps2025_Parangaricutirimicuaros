import { Globe, Sun, Plug, Users } from "lucide-react"
import { useState } from "react"

export default function Type() {
  const [checked, setChecked] = useState({
    Suelo: true,
    Aire: true,
    Electrico: true,
    Densidad: true,
  })

  const toggle = (label) => {
    setChecked((prev) => ({ ...prev, [label]: !prev[label] }))
  }

  const types = [
    { icon: <Globe className="w-5 h-5 text-gray-700" />, label: "Suelo" },
    { icon: <Sun className="w-5 h-5 text-gray-700" />, label: "Aire" },
    { icon: <Plug className="w-5 h-5 text-gray-700" />, label: "Electrico" },
    { icon: <Users className="w-5 h-5 text-gray-700" />, label: "Densidad" },
  ]

  return (
    <div className="Results_comp ml-24 text-left">
      <h2 className="summary-title text-xl font-semibold mb-4">Tipo</h2>

      <div className="flex flex-col divide-y divide-gray-200 w-64">
        {types.map((type) => (
          <div
            key={type.label}
            className="flex justify-between items-center py-2"
          >
            <div className="flex items-center gap-3">
              {type.icon}
              <span className="text-gray-800 font-medium">{type.label}</span>
              <input
                type="checkbox"
                checked={checked[type.label]}
                onChange={() => toggle(type.label)}
                className="appearance-none w-5 h-5 border border-gray-300 rounded-sm bg-white checked:bg-[#2F465C] checked:[background-image:url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 20 20%22 fill=%22white%22><path fill-rule=%22evenodd%22 d=%22M16.704 5.29a1 1 0 00-1.414-1.415L8 11.17 4.707 7.875A1 1 0 103.293 9.29l4 4a1 1 0 001.414 0l8-8z%22 clip-rule=%22evenodd%22/></svg>')] bg-center bg-no-repeat"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
