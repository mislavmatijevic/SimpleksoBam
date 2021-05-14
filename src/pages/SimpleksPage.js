import React, { useState, useEffect } from 'react'
import FunkcijaCilja from '../components/FunkcijaCilja/FunkcijaCilja'
import Main from '../components/Main/Main'
import SimpleksTablica from '../components/SimpleksTablica/SimpleksTablica'
import { Label } from '../generalStyles/generalStyles'
import { IzradiKanonski } from '../lib/functions/ispisJednadžbi'

const SimpleksPage = () => {

    const [simpleksSmjer, setSimpleksSmjer] = useState(null)
    const [vrijednostiFunkcijeCiljaJSON, setVrijednostiFunkcijeCiljaJSON] = useState(null)
    const [poljeUvjetaJSON, setPoljeUvjetaJSON] = useState(null)

    return (
        <Main>

            <FunkcijaCilja setVrijednostiFunkcijeCiljaJSON={setVrijednostiFunkcijeCiljaJSON} setPoljeUvjetaJSON={setPoljeUvjetaJSON} setSimpleksSmjer={setSimpleksSmjer} />

            {poljeUvjetaJSON &&
                <>
                    <Label display="block" color="blue">Kanonski oblik:</Label>
                    {IzradiKanonski(poljeUvjetaJSON).map((value, index) => {
                        return (
                            <Label>{value.lijevaStranaUvjeta} {value.ograničenjeUvjeta} {value.desnaStranaUvjeta}</Label>
                            )
                    })
                    }
                    <SimpleksTablica />
                </>
            }
        </Main>
    )
}

export default SimpleksPage;