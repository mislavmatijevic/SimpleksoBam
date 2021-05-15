import React, { useState, useEffect, useContext } from 'react'
import { SimpleksTablicaStyle, TableD, TableRow } from './SimpleksTablicaStyle';
import { IzračunajPočetnuTablicu } from '../../lib/functions/iteracijeIzračun';
import { PodaciContext } from '../Context/PodaciContext'

const SimpleksTablica = () => {

    const [početnaTablica, setPočetnaTablica] = useState(null)

    const {
        poljeUvjetaJSON,
        vrijednostiFunkcijeCiljaJSON,
        simpleksSmjer,
        poljeNazivaVarijabli,
        brojVarijabli,
        brojOgraničenja,
    } = useContext(PodaciContext);

    useEffect(() => {
        setPočetnaTablica(IzračunajPočetnuTablicu({
            brojVarijabli: brojVarijabli,
            brojOgraničenja: brojOgraničenja,
            naziviVarijabli: poljeNazivaVarijabli,
            funkcijaCilja: JSON.parse(vrijednostiFunkcijeCiljaJSON),
            poljeUvjeta: JSON.parse(poljeUvjetaJSON),
            smjer: simpleksSmjer
        }));
        console.log("Poč tab:");
        console.log(početnaTablica);
    }, [poljeUvjetaJSON, simpleksSmjer, vrijednostiFunkcijeCiljaJSON]);

    return (
        <>
            { početnaTablica &&
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
                            početnaTablica.map((value, index) => {
                                return (
                                    <TableRow>
                                        {value.VrijednostiStupca.map((innerValue, innerIndex) => {
                                            return (<TableRow>{value.VrijednostiStupca[innerIndex]}</TableRow>)
                                        })}
                                    </TableRow>
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