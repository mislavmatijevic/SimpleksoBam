import React, { useState, useEffect, useContext } from 'react'
import {
    TablicaStyle,
    TablicaCaption,
    TablicaHead,
    TablicaBody,
    Tr,
    Th,
    Td,
    Td2Cols
} from './SimpleksTablicaStyle';
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
                <TablicaStyle key={1}>
                    <TablicaCaption>Početna tablica</TablicaCaption>
                    <TablicaHead>
                        <Tr>
                            <Th>Cj</Th>
                            <Th>Var</Th>
                            <Th>Kol</Th>
                            {
                                poljeNazivaVarijabli.map((value, index) => {
                                    return (<Th key={index}>{value}</Th>)
                                })
                            }
                            <Th>R</Th>
                        </Tr>
                    </TablicaHead>
                    <TablicaBody>
                        {
                            redoviPočetneTablice.map((redak, index) => {
                                return (
                                    <Tr key={index}>
                                        {redak.map((value, index) => {
                                            if (value == "zjcj") {
                                                return (<Td2Cols colSpan="2"><strong>Zj-Cj</strong></Td2Cols>);
                                            } else if (value == "dj") {
                                                return (<Td2Cols colSpan="2"><strong>dj</strong></Td2Cols>);
                                            } else if (value === null) {
                                                return;
                                            } else return (
                                                <Td>{value}</Td>
                                            )
                                        })}
                                    </Tr>
                                )
                            })
                        }
                    </TablicaBody>
                </TablicaStyle>

            }
        </>
    )
}

export default SimpleksTablica;