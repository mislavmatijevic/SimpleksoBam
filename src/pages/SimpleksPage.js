import React, { useState } from 'react'
import FunkcijaCilja from '../components/FunkcijaCilja/FunkcijaCilja'
import Main from '../components/Main/Main';
import SimpleksTablica from '../components/SimpleksTablica/SimpleksTablica';

const SimpleksPage = () => {

    const [simpleksData, setSimpleksData] = useState(null);
    const [simpleksSmjer, setSimpleksSmjer] = useState(null);

    function PodaciFunkcijeCilja() {

    }

    return (
        <Main>
            <FunkcijaCilja vratiPodatke={PodaciFunkcijeCilja} />

            {simpleksData && simpleksSmjer &&
                <SimpleksTablica />
            }
        </Main>
    )
}

export default SimpleksPage;