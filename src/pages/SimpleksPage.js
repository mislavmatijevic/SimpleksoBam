import React, { useEffect, useContext } from 'react'

// Components
import FunkcijaCilja from '../components/FunkcijaCilja/FunkcijaCilja'
import Main from '../components/Main/Main'
import SimpleksTablica from '../components/SimpleksTablica/SimpleksTablica'

// Functions
import { IzradiKanonski } from '../lib/functions/ispisJednadžbi'
import { PodaciContext } from '../components/Context/PodaciContext'

// Styles
import {
    Header,
    Description
} from '../generalStyles/generalStyles'
import KanonskiOblik from '../components/KanonskiOblik/KanonskiOblik'

const SimpleksPage = () => {

    const {
        poljeUvjetaJSON
    } = useContext(PodaciContext);

    return (
        <Main>
            <Header textAlign="center">Simplekso-Bam</Header>
            <Description textAlign="center" fontSize="larger" color="green">Bam! I simpleksica nastaje!</Description>
            <Description textAlign="right" fontSize="small">Mislav Matijević, svibanj 2021.</Description>

            <FunkcijaCilja />

            {poljeUvjetaJSON?.length > 0 &&
                <>
                    <KanonskiOblik />
                    <SimpleksTablica />
                </>
            }
        </Main>
    )
}

export default SimpleksPage;