import React, { useState, useEffect } from 'react'
import FunkcijaCilja from '../components/FunkcijaCilja/FunkcijaCilja'
import Main from '../components/Main/Main'
import SimpleksTablica from '../components/SimpleksTablica/SimpleksTablica'
import { Label } from '../generalStyles/generalStyles'
import { IzračunajKanonski } from '../lib/functions/kanonski'

const SimpleksPage = () => {

    const [simpleksSmjer, setSimpleksSmjer] = useState(null)
    const [vrijednostiFunkcijeCilja, setVrijednostiFunkcijeCilja] = useState(null)
    const [poljeUvjeta, setPoljeUvjeta] = useState([])
    const [poljeKanonskihOblika, setPoljeKanonskihOblika] = useState([])

    useEffect(() => {
        
    }, [poljeUvjeta]);

    return (
        <Main>
            <FunkcijaCilja setVrijednostiFunkcijeCilja={setVrijednostiFunkcijeCilja} setPoljeUvjeta={setPoljeUvjeta} setSimpleksSmjer={setSimpleksSmjer} />
            <p>{simpleksSmjer}</p>

            {poljeKanonskihOblika?.length > 0 &&
                <>
                    <Label display="block" color="brown">Kanonski oblik:</Label>
                    {poljeKanonskihOblika.map((value, index) => {
                        <p>{index} - {value}</p>
                    })
                    }
                    <SimpleksTablica />
                </>
            }
        </Main>
    )
}

export default SimpleksPage;