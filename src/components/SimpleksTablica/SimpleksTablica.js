import React, { useState, useEffect } from 'react'
import { SimpleksTablicaStyle } from './SimpleksTablicaStyle';
import { IzračunajPočetnuTablicu, IzračunajSljedećuIteraciju } from '../../functions/iteracijeIzračun';

const SimpleksTablica = (props) => {

    const [prvaIteracija, setPrvaIteracija] = useState(null);
    const [iteracije, setIteracije] = useState(null);
    const smjer = props.smjer;

    useEffect(() => {
        setPrvaIteracija(IzračunajPočetnuTablicu(props.nepoznanice));
    }, [props]);

    return (
        <>
            <SimpleksTablicaStyle>
                <caption>Početna tablica</caption>
                <thead>
                    <th>Cj</th>
                    <th>Var</th>
                    <th>Kol</th>
                    <th>x1</th>
                    <th>x2</th>
                    <th>x3</th>
                    <th>R</th>
                </thead>
                <tbody>
                    <td></td>
                </tbody>
            </SimpleksTablicaStyle>
        </>
    )
}

export default SimpleksTablica;