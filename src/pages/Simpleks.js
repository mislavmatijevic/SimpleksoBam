import React, { useState } from 'react'
import FunkcijaCilja from '../components/FunkcijaCilja/FunkcijaCilja'
import Main from '../components/Main/Main';

const Simpleks = () => {

    const [simpleksData, setSimpleksData] = useState([]);
    const [simpleksSmjer, setSimpleksSmjer] = useState([]);

    return (
        <Main>
            <FunkcijaCilja setSimpleksData={setSimpleksData} setSimpleksSmjer={setSimpleksSmjer} />
            Smjer: {simpleksSmjer}
            <table>
            <thead>
                {
                    simpleksData?.map(index => {
                        return(<th>{index}</th>)
                    })
                }
            </thead>
                {/*
                    simpleksData.map(simplDat => {
                        <td>{simplDat}</td>
                    }) */
                }
            </table>
        </Main>
    )
}

export default Simpleks;