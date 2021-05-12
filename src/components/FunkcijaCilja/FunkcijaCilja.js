import React, { useState } from 'react'
import { Container, Input, Label, Select } from './FunkcijaCiljaStyle';

const FunkcijaCilja = (props) => {

    const [koeficijenti, setKoeficijenti] = useState(null)
    const [labelWidth, setLabelWidth] = useState("225px")

    function parseNepoznanice(target) {

        // Povećaj input text za nepoznanice tako da sav tekst stane
        if (target.value.length > 25) {
            setLabelWidth(target.value.length/2 + 3 + "em");
            console.log(labelWidth);
        } else {
            setLabelWidth("225px");
        }

        // Razdvoji koeficijente i izluči samo normalne brojeve
        let razdvojeniKoeficijenti = target.value.split(' ').filter((str) => {
            return /^[1-9]+[0-9]*$/.test(str);
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
                <span key={i*2}>{element}x<sub key={i*2}>{i + 1}</sub></span>
            );
            uredjeniKoeficijenti.push(<span key={i*2-1}> + </span>);
        });

        uredjeniKoeficijenti.pop();

        setKoeficijenti(uredjeniKoeficijenti);
    }

    const nepoznatSmjer = "?";
    function smjer(values) {
        if (values === nepoznatSmjer) return;
        props.setSimpleksSmjer(values)
    }

    return (
        <Container>
            <Label htmlFor="koefUFunkCilja">Koeficijenti uz nepoznanice: </Label>
            <Input name="koefUFunkCilja" placeholder="10 20 30" style={{width: labelWidth}} onChange={(event) => parseNepoznanice(event.target)} />
            {koeficijenti &&
                <>
                    <Label htmlFor="funkCilja">Z = {koeficijenti} &#8594;</Label>
                    <Select name="funkCilja" onChange={(event) => smjer(event.target.value)}>
                        <option>{nepoznatSmjer}</option>
                        <option>max</option>
                        <option>min</option>
                    </Select>
                </>
            }
        </Container>
    )
}

export default FunkcijaCilja;