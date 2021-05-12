import React, { useState } from 'react'
import { Container, Input, Label, Select } from './FunkcijaCiljaStyle';

function IzvadiBrojeveIzTekstaUPolje(tekst) {
    return tekst.split(' ').filter((elementTeksta) => {
        return /^[1-9]+[0-9]*$/.test(elementTeksta);
    });
}

const FunkcijaCilja = (props) => {

    const [koeficijenti, setKoeficijenti] = useState(null)
    const [funkcijaCilja, setFunkcijaCilja] = useState(null)
    const [placeholderKoeficijenata, setPlaceholderKoeficijenata] = useState(null)
    const [labelWidth, setLabelWidth] = useState("225px")
    const [smjer, setSmjer] = useState(null) 
    const [poljeUvjeta, setPoljeUvjeta] = useState(null) // Polje brojeva 0-n gdje n predstavlja uneseni ukupan broj uvjeta za problem.
    // Polje je napravljeno na sljedeći način:
    // [{dio1: [x1, x2, ... xn], dio2: vrijednost2, dio3: vrijednost3}]
    // npr. (treći uvjet -> poljeUvjeta[2] ->) 3x + 4x <= 200 ---> poljeUvjeta[2] = {dio1: [3, 4], dio2: "<=", dio3: "200"}

    function parseNepoznanice(target) {

        // Povećaj input text za nepoznanice tako da sav tekst stane
        if (target.value.length > 25) {
            setLabelWidth(target.value.length / 2 + 2 + "em");
        } else {
            setLabelWidth("225px");
        }

        // Razdvoji koeficijente i izluči samo normalne brojeve
        let razdvojeniKoeficijenti = IzvadiBrojeveIzTekstaUPolje(target.value);

        if (razdvojeniKoeficijenti.length === 0) {
            props.setSimpleksData(null);
            setFunkcijaCilja(null);
            setKoeficijenti(null);
            setSmjer(null);
            setPoljeUvjeta(null);
            return;
        }

        props.setSimpleksData(razdvojeniKoeficijenti)


        let uređeniKoeficijentiZaFunkcijuCilja = [];

        let uređeniKoeficijenti = [];

        razdvojeniKoeficijenti.forEach((element, i) => {
            var objektIspisa = <span key={i * 2}>{element}x<sub key={i * 2}>{i + 1}</sub></span>;
            uređeniKoeficijenti.push(objektIspisa);
            uređeniKoeficijentiZaFunkcijuCilja.push(objektIspisa);
            uređeniKoeficijentiZaFunkcijuCilja.push(<span key={i * 2 - 1}> + </span>);
        });

        uređeniKoeficijentiZaFunkcijuCilja.pop();

        let placeholderKoef = IzvadiBrojeveIzTekstaUPolje(target.value);

        let i = 1;
        placeholderKoef.forEach((element, index) => {
            placeholderKoef[index] = (i++)*10;
        });

        placeholderKoef = placeholderKoef.toString().replaceAll(',', ' ');
        placeholderKoef = "npr. " + placeholderKoef;

        setPlaceholderKoeficijenata(placeholderKoef);

        setKoeficijenti(uređeniKoeficijenti);        
        setFunkcijaCilja(uređeniKoeficijentiZaFunkcijuCilja);
    }


    function pronađiJednadžbuPoAtributu(brojUzX) {
        for (var i = 0; i < poljeUvjeta.length; i += 1) {
            if (poljeUvjeta[i].x === brojUzX) {
                return i;
            }
        }
        return -1;
    }

    const nepoznataVrijednost = "?";

    function promjenaBrojaUvjeta(upisanBrojUvjeta) {
        let brojUvjeta = IzvadiBrojeveIzTekstaUPolje(upisanBrojUvjeta);
        if (brojUvjeta[0] === undefined) {
            setPoljeUvjeta(null);
        } else {
            setPoljeUvjeta(() => { // Pripremi sve da polje uvjeta bude u odgovarajućem obliku definiranom iznad
                let novoPolje = [];
                for (let index = 0; index < brojUvjeta[0]; index++) {
                    novoPolje.push({dio1: [], dio2: null, dio3: null});                    
                }
                return novoPolje;
            });
        }
    }

    function parseJednadžba(brojUzX, diopoljeUvjeta, vrijednost) {
        let indeksDijela = null;
        let pravaVrijednostDijela = null;

        switch (diopoljeUvjeta) {

            case "sredina":
                if (vrijednost === nepoznataVrijednost) return;

                indeksDijela = 1;
                pravaVrijednostDijela = vrijednost;
                break;

            case "lijevo":
                indeksDijela = 0;
                pravaVrijednostDijela = IzvadiBrojeveIzTekstaUPolje(vrijednost);
                break;

            case "desno":
                indeksDijela = 2;
                pravaVrijednostDijela = IzvadiBrojeveIzTekstaUPolje(vrijednost);

            default:
                return;
        }

        if (pravaVrijednostDijela === null) return;

        let noviElement = { x: brojUzX, dio: indeksDijela, vrijednost: pravaVrijednostDijela };

        if (poljeUvjeta === null) {
            setPoljeUvjeta([noviElement]);

        } else {

            let postojećiElement = pronađiJednadžbuPoAtributu(brojUzX);

            if (postojećiElement === -1) {
                let novoStanjeJednadžbi = [{ ...poljeUvjeta, noviElement }];
                setPoljeUvjeta(novoStanjeJednadžbi);
            } else {
                let promijenjenoStanjeJednadžbi = poljeUvjeta;
                promijenjenoStanjeJednadžbi[postojećiElement] = noviElement;
                setPoljeUvjeta(promijenjenoStanjeJednadžbi);
            }

        }
    }

    function odrediSmjer(values) {
        if (values === nepoznataVrijednost) {
            setSmjer(null);
            setPoljeUvjeta(null);
        } else {
            setSmjer(values);
        }
    }

    return (
        <Container>
            <Label htmlFor="koefUFunkCilja">Koeficijenti uz nepoznanice: </Label>
            <Input display="block" name="koefUFunkCilja" placeholder="npr. 10 20 30" style={{ width: labelWidth }} onChange={(event) => parseNepoznanice(event.target)} />
            {funkcijaCilja &&
                <>
                    <Label htmlFor="funkCilja">Z = {funkcijaCilja} &#8594;</Label>
                    <Select name="funkCilja" onChange={(event) => odrediSmjer(event.target.value)}>
                        <option>{nepoznataVrijednost}</option>
                        <option>max</option>
                        <option>min</option>
                    </Select>
                    {smjer &&
                        <>
                            <Label htmlFor="brojUvjeta" display="block">Broj uvjeta: </Label>
                            <Input display="block" name="brojUvjeta" placeholder="npr. 3" onChange={(event) => promjenaBrojaUvjeta(event.target.value)} />
                        </>
                    }
                </>
            }
            {
                poljeUvjeta?.map((value, index) => {
                    return(
                    <>
                        <Label htmlFor="koefUPoljuUvjeta">Koeficijenti uz {index+1}. uvjet: </Label>
                        <Input name="koefUPoljuUvjeta1" placeholder={placeholderKoeficijenata} onChange={(event) => parseJednadžba(index, event.target.value)} />

                        <Select name="koefUPoljuUvjeta2" onChange={(event) => parseJednadžba(index, "sredina", event.target.value)}>
                            <option>{nepoznataVrijednost}</option>
                            <option>≤</option>
                            <option>≥</option>
                        </Select>
                        <Input name="koefUPoljuUvjeta3" placeholder="200" onChange={(event) => parseJednadžba(index, "desno", event.target.value)} />
                        <br></br>
                    </>
                    );
                })
            }
        </Container>
    )
}

export default FunkcijaCilja;