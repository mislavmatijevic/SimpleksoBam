import React, { useState, useEffect, useContext } from 'react'
import { SimpleksTablicaStyle, TableD, TableRow } from './SimpleksTablicaStyle';
import { IzračunajPočetnuTablicu } from '../../lib/functions/iteracijeIzračun';
import { PodaciContext } from '../Context/PodaciContext'

const SimpleksTablica = () => {

    const {
        poljeUvjetaJSON,
        vrijednostiFunkcijeCiljaJSON,
        simpleksSmjer,
        poljeNazivaVarijabli,
        brojVarijabli,
        brojOgraničenja,
    } = useContext(PodaciContext);

    const [redoviPočetneTablice, setRedoviPočetneTablice] = useState(null);

    useEffect(() => {
        if (poljeUvjetaJSON?.length > 0) {
            setRedoviPočetneTablice([...IzračunajPočetnuTablicu({
                brojVarijabli: brojVarijabli,
                brojOgraničenja: brojOgraničenja,
                naziviVarijabli: poljeNazivaVarijabli,
                funkcijaCilja: JSON.parse(vrijednostiFunkcijeCiljaJSON),
                poljeUvjeta: JSON.parse(poljeUvjetaJSON),
                smjer: simpleksSmjer
            })]);
        }
    }, [brojVarijabli, brojOgraničenja, poljeNazivaVarijabli, vrijednostiFunkcijeCiljaJSON, poljeUvjetaJSON, simpleksSmjer]);

    return (
        <>
            { redoviPočetneTablice &&
                <SimpleksTablicaStyle key={1}>
                    <caption>Početna tablica</caption>
                    <thead>
                        <tr>
                            <th>Cj</th>
                            <th>Var</th>
                            <th>Kol</th>
                            {
                                poljeNazivaVarijabli.map((value, index) => {
                                    return (<th key={index}>{value}</th>)
                                })
                            }
                            <th>R</th>
                        </tr>
                    </thead>
                    <tbody>
                            {
                                redoviPočetneTablice.map((redak, index) => {
                                    return (
                                        <tr>
                                            {redak.map((value) => {
                                                return(
                                                    <td>{value}</td>
                                                )
                                            })}
                                        </tr>
                                    )
                                })
                            }
                    </tbody>
                </SimpleksTablicaStyle>

            }
        </>
    )
}

export default SimpleksTablica;