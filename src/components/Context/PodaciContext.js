import React, { createContext, useState } from 'react'

export const PodaciContext = createContext()

export const PodaciProvider = (props) => {

    const [simpleksSmjer, setSimpleksSmjer] = useState(null)
    const [vrijednostiFunkcijeCiljaJSON, setVrijednostiFunkcijeCiljaJSON] = useState(null)
    const [poljeUvjetaJSON, setPoljeUvjetaJSON] = useState(null)
    const [poljeKanonskihUvjeta, setPoljeKanonskihUvjeta] = useState(null)
    const [poljeNepoznanica, setPoljeNepoznanica] = useState([]) // npr. x1, x2, u1, w1, w2

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
            poljeNepoznanica,
            setPoljeNepoznanica,
        }}>
            {props.children}
        </PodaciContext.Provider>
    )

}