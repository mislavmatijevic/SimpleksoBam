import React, { useState } from 'react'
import FunkcijaCilja from '../components/FunkcijaCilja/FunkcijaCilja'
import Main from '../components/Main/Main';
import SimpleksTablica from '../components/SimpleksTablica/SimpleksTablica';

const SimpleksPage = () => {

    const [simpleksData, setSimpleksData] = useState(null);
    const [simpleksSmjer, setSimpleksSmjer] = useState(null);

    return (
        <Main>
            <FunkcijaCilja setSimpleksData={setSimpleksData} setSimpleksSmjer={setSimpleksSmjer} />

            {simpleksData && simpleksSmjer &&
                <SimpleksTablica nepoznanice={simpleksData} smjer={simpleksSmjer} />
            }
        </Main>
    )
}

export default SimpleksPage;