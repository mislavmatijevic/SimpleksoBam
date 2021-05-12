import React, { useState } from 'react'
import { Container, Input, Label, Select } from './FunkcijaCiljaStyle';

const FunkcijaCilja = (props) => {

    const [koeficijenti, setKoeficijenti] = useState(null)

    function parseNepoznanice(values) {

        let razdvojeniKoeficijenti = values.split(' ').filter((str) => {
            return /^[0-9]+$/.test(str);
        });

        if (razdvojeniKoeficijenti.length === 0) {
            props.setSimpleksData(null);
            setKoeficijenti(null);
            return;
        }

        props.setSimpleksData(razdvojeniKoeficijenti)


        let uredjeniKoeficijenti = [];


        razdvojeniKoeficijenti.forEach((element, i) => {
            uredjeniKoeficijenti.push(
                <span>{element}x<sub>{i + 1}</sub></span>
            );
            uredjeniKoeficijenti.push(<span> + </span>);
        });

        uredjeniKoeficijenti.pop();

        setKoeficijenti(uredjeniKoeficijenti);
    }

    function smjer(values) {
        console.log("Smjer: " + values);
        props.setSimpleksSmjer(values)
    }

    return (
        <Container>
            <Label htmlFor="koefUFunkCilja">Koeficijenti uz nepoznanice: </Label>
            <Input name="koefUFunkCilja" placeholder="10 20 30" onChange={(event) => parseNepoznanice(event.target.value)} />
            {koeficijenti &&
                <>
                    <br></br>
                    <Label htmlFor="funkCilja">Z = {koeficijenti} &#8594;</Label>
                    <Select onChange={(event) => smjer(event.target.value)}>
                        <option>max</option>
                        <option>min</option>
                    </Select>
                </>
            }
        </Container>
    )

}

export default FunkcijaCilja;