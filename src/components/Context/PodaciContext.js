import React, { createContext, useState } from 'react'

export const PodaciContext = createContext()

export const PodaciProvider = (props) => {

    const [simpleksSmjer, setSimpleksSmjer] = useState(null)
    const [vrijednostiFunkcijeCiljaJSON, setVrijednostiFunkcijeCiljaJSON] = useState(null)
    const [poljeUvjetaJSON, setPoljeUvjetaJSON] = useState(null)
    const [poljeKanonskihUvjeta, setPoljeKanonskihUvjeta] = useState(null)
    const [poljeStupacaVarijabli, setPoljeStupacaVarijabli] = useState([]) // npr. x1, x2, u1, w1, w2
    const [brojVarijabli, setBrojVarijabli] = useState(0)
    const [brojOgraničenja, setBrojOgraničenja] = useState(0)

    return (
        <PodaciContext.Provider value={{
            simpleksSmjer,
            setSimpleksSmjer,
            vrijednostiFunkcijeCiljaJSON,
            setVrijednostiFunkcijeCiljaJSON,
            poljeUvjetaJSON,
            setPoljeUvjetaJSON,
            poljeKanonskihUvjeta,
            setPoljeKanonskihUvjeta,
            poljeStupacaVarijabli,
            setPoljeStupacaVarijabli,
            brojVarijabli,
            setBrojVarijabli,
            brojOgraničenja,
            setBrojOgraničenja,
        }}>
            {props.children}
        </PodaciContext.Provider>
    )

}