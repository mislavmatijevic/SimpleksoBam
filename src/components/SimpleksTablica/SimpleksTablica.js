import React, { useState, useEffect } from 'react'
import { SimpleksTablicaStyle } from './SimpleksTablicaStyle';
import { IzračunajPočetnuTablicu, IzračunajSljedećuIteraciju } from '../../lib/functions/iteracijeIzračun';

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
                    <tr>
                        <th>Cj</th>
                        <th>Var</th>
                        <th>Kol</th>
                        <th>x1</th>
                        <th>x2</th>
                        <th>x3</th>
                        <th>R</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>20</td>
                        <td>x1</td>
                        <td>125</td>
                        <td>5</td>
                        <td>7</td>
                        <td>3</td>
                        <td>163</td>
                    </tr>
                    <tr>
                        <td>20</td>
                        <td>x2</td>
                        <td>125</td>
                        <td>5</td>
                        <td>7</td>
                        <td>3</td>
                        <td>163</td>
                    </tr>
                </tbody>
            </SimpleksTablicaStyle>
        </>
    )
}

export default SimpleksTablica;