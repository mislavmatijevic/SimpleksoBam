import React, { useState, useEffect } from 'react'
import FunkcijaCilja from '../components/FunkcijaCilja/FunkcijaCilja'
import Main from '../components/Main/Main';
import SimpleksTablica from '../components/SimpleksTablica/SimpleksTablica';

const SimpleksPage = () => {

    const [simpleksSmjer, setSimpleksSmjer] = useState(null)
    const [vrijednostiFunkcijeCilja, setVrijednostiFunkcijeCilja] = useState(null)
    const [poljeUvjeta, setPoljeUvjeta] = useState([])
    const [poljeKanonskihOblika, setPoljeKanonskihOblika] = useState([])

    return (
        <Main>
            <FunkcijaCilja setVrijednostiFunkcijeCilja={setVrijednostiFunkcijeCilja} setPoljeUvjeta={setPoljeUvjeta} setSimpleksSmjer={setSimpleksSmjer} />

            {simpleksSmjer && vrijednostiFunkcijeCilja && poljeUvjeta &&
                <>
                    <SimpleksTablica />
                </>
            }
        </Main>
    )
}

export default SimpleksPage;