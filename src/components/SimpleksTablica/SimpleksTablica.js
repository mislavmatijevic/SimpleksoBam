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
                <caption>Iteracija br. 1</caption>
                <thead>
                    {prvaIteracija?.zaglavlje.map((index, value) => {
                        <th>{value}<sub>{index}</sub></th>
                    })}
                </thead>
                <tbody>
                    {
                        prvaIteracija?.sadržajIteracije.map((sadržajIteracije) => {
                            return (
                                <td>{sadržajIteracije}</td>
                            )
                        })
                    }
                </tbody>
            </SimpleksTablicaStyle>
        </>
    )
}

export default SimpleksTablica;