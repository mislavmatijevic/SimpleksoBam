import React, { useState, useEffect, useContext } from 'react'
import { Label } from '../../generalStyles/generalStyles';
import { Container, Input, Select } from './FunkcijaCiljaStyle';
import { IzvadiBrojeveIzTekstaUPolje, UredanIspisBrojevaIzPolja } from './../../lib/functions/ispisJednadžbi';
import { PodaciContext } from '../Context/PodaciContext';

const FunkcijaCilja = () => {

    const {
        setSimpleksSmjer,
        setVrijednostiFunkcijeCiljaJSON,
        setPoljeUvjetaJSON,
        setBrojVarijabli,
        setBrojOgraničenja
    } = useContext(PodaciContext);

    const [vrijednostiFunkcijeCilja, setVrijednostiFunkcijeCilja] = useState(null)
    const [funkcijaCilja, setFunkcijaCilja] = useState(null)
    const [placeholderKoeficijenata, setPlaceholderKoeficijenata] = useState(null)
    const [labelWidth, setLabelWidth] = useState("225px")
    const [smjer, setSmjer] = useState(null)
    const [poljeParsiranihUvjeta, setPoljeParsiranihUvjeta] = useState([])
    const [poljeUvjeta, setPoljeUvjeta] = useState([]) // Polje brojeva 0-n gdje n predstavlja uneseni ukupan broj uvjeta za problem.
    // Polje je napravljeno na sljedeći način:
    // [{lijevaStranaUvjeta: [x1, x2, ... xn], ograničenjeUvjeta: vrijednost2, desnaStranaUvjeta: vrijednost3}]
    // npr. (treći uvjet -> poljeUvjeta[2] ->) 3x + 4x <= 200 ---> poljeUvjeta[2] = {lijevaStranaUvjeta: [3, 4], ograničenjeUvjeta: "<=", desnaStranaUvjeta: "200"}

    // Funkcija cilja:
    function parseNepoznanice(target) {

        // Povećaj input text za nepoznanice tako da sav tekst stane
        if (target.value.length > 25) {
            setLabelWidth(target.value.length / 2 + 2 + "em");
        } else {
            setLabelWidth("225px");
        }

        // Razdvoji koeficijente i izluči samo normalne brojeve
        let razdvojeniKoeficijenti = IzvadiBrojeveIzTekstaUPolje(target.value);

        if (razdvojeniKoeficijenti === undefined || razdvojeniKoeficijenti.length === 0) {
            setFunkcijaCilja(null);
            setVrijednostiFunkcijeCilja(null);
            setSmjer(null);
            setPoljeUvjeta([]);
            setPoljeParsiranihUvjeta([]);
            return;
        }

        setVrijednostiFunkcijeCilja([...razdvojeniKoeficijenti]);


        let placeholderiUvjeta = [];
        let i = 1;
        razdvojeniKoeficijenti.forEach((element, index) => {
            placeholderiUvjeta[index] = (i++) * 10;
        });

        placeholderiUvjeta = placeholderiUvjeta.toString().replaceAll(',', ' ');
        placeholderiUvjeta = "npr. " + placeholderiUvjeta;

        setPlaceholderKoeficijenata([placeholderiUvjeta]);
        setFunkcijaCilja([...UredanIspisBrojevaIzPolja(razdvojeniKoeficijenti)]);
        setPoljeUvjeta([...poljeUvjeta]);
        setPoljeParsiranihUvjeta([...poljeParsiranihUvjeta]);
    }

    // Uvjeti: 

    const nepoznataVrijednost = "?";

    function promjenaBrojaUvjeta(upisanBrojUvjeta) {
        let brojUvjeta = IzvadiBrojeveIzTekstaUPolje(upisanBrojUvjeta)[0];

        if (brojUvjeta === undefined || brojUvjeta < 1) {
            setPoljeUvjeta([]);
            setPoljeParsiranihUvjeta([]);
            return;
        }

        if (poljeUvjeta.length < brojUvjeta) {
            let noviElementi = [];
            let noviParsiraniElementi = [];

            for (let index = poljeUvjeta.length; index < brojUvjeta; index++) {
                noviElementi.push({ lijevaStranaUvjeta: [], ograničenjeUvjeta: null, desnaStranaUvjeta: null });
                noviParsiraniElementi.push("");
            }

            setPoljeUvjeta([...poljeUvjeta, ...noviElementi]);
            setPoljeParsiranihUvjeta([...poljeParsiranihUvjeta, ...noviParsiraniElementi]);
        }

        if (poljeUvjeta.length > brojUvjeta) {
            let smanjenoPolje = [...poljeUvjeta];
            let smanjenoPoljeParsiranih = [...poljeParsiranihUvjeta];

            for (let index = poljeUvjeta.length; index > brojUvjeta; index--) {
                smanjenoPolje.pop();
                smanjenoPoljeParsiranih.pop();
            }

            setPoljeUvjeta([...smanjenoPolje]);
            setPoljeParsiranihUvjeta([...smanjenoPoljeParsiranih]);
        }
    }

    function ParsirajUvjet(index) {
        let uvjet = poljeUvjeta[index];
        let parsiraniUvjet = [];

        if (uvjet["lijevaStranaUvjeta"].length !== 0) {
            parsiraniUvjet = UredanIspisBrojevaIzPolja(uvjet["lijevaStranaUvjeta"]);
        } else {
            parsiraniUvjet.push("uvjet?")
        }

        if (uvjet["ograničenjeUvjeta"] && uvjet["ograničenjeUvjeta"] !== nepoznataVrijednost) parsiraniUvjet.push(" " + uvjet["ograničenjeUvjeta"]);
        else parsiraniUvjet.push("  ograničenje?");

        if (uvjet["desnaStranaUvjeta"]) parsiraniUvjet.push(" " + uvjet["desnaStranaUvjeta"]);
        else parsiraniUvjet.push("  granica?");

        let promijenjenoPoljeParsiranihUvjeta = [...poljeParsiranihUvjeta];
        promijenjenoPoljeParsiranihUvjeta[index] = parsiraniUvjet;
        setPoljeParsiranihUvjeta([...promijenjenoPoljeParsiranihUvjeta]);
    }

    function odrediUvjet(indexUvjeta, dioUvjeta, vrijednost) {

        setPoljeUvjeta([]);

        let novaVrijednostDijela = null;
        let promijenjenoStanjeJednadžbi = poljeUvjeta;

        switch (dioUvjeta) {

            case "lijevaStranaUvjeta":
                novaVrijednostDijela = IzvadiBrojeveIzTekstaUPolje(vrijednost);
                if (novaVrijednostDijela === undefined || novaVrijednostDijela.length === 0) novaVrijednostDijela = [];
                break;

            case "ograničenjeUvjeta":
                if (vrijednost === nepoznataVrijednost) novaVrijednostDijela = null;
                novaVrijednostDijela = vrijednost;
                break;

            case "desnaStranaUvjeta":
                novaVrijednostDijela = IzvadiBrojeveIzTekstaUPolje(vrijednost)[0];
                if (novaVrijednostDijela === undefined) novaVrijednostDijela = null;
                break;

            default:
                return;
        }

        promijenjenoStanjeJednadžbi[indexUvjeta][dioUvjeta] = novaVrijednostDijela;

        setPoljeUvjeta([...promijenjenoStanjeJednadžbi]);

        ParsirajUvjet(indexUvjeta);
    }

    const uvjetPotpun = (uvjet) => {
        return (uvjet["lijevaStranaUvjeta"]?.length === vrijednostiFunkcijeCilja.length && uvjet["ograničenjeUvjeta"] && uvjet["ograničenjeUvjeta"] !== nepoznataVrijednost && uvjet["desnaStranaUvjeta"])
    }

    // Pretvori uvjet u string koji je prava matematička nejednadžba.
    useEffect(() => {
        
        setBrojVarijabli(null);
        setBrojOgraničenja(null);

        if (poljeUvjeta.length > 0) {
            let uvjetiDovršeni = true;
            poljeUvjeta.forEach((value) => {
                if (!uvjetPotpun(value)) {
                    uvjetiDovršeni = false;
                }
            });

            if (uvjetiDovršeni) {
                setVrijednostiFunkcijeCiljaJSON(JSON.stringify(vrijednostiFunkcijeCilja));
                setPoljeUvjetaJSON(JSON.stringify(poljeUvjeta));
                setSimpleksSmjer(smjer);
                return;
            }
        }

        setVrijednostiFunkcijeCiljaJSON(null);
        setPoljeUvjetaJSON(null);
        setSimpleksSmjer(null);

    }, [poljeUvjeta, smjer, vrijednostiFunkcijeCilja, setPoljeUvjetaJSON, setSimpleksSmjer, setVrijednostiFunkcijeCiljaJSON])

    function odrediSmjer (value) {
        if (value === nepoznataVrijednost) {
            setSmjer(null);
            setPoljeUvjeta([]);
        } else {
            setSmjer(value);
            setSimpleksSmjer(value);
        }
    }

    return (
        <Container>
            <Label htmlFor="koefUFunkCilja">Koeficijenti uz nepoznanice: </Label>
            <Input defaultValue="15 20 30" display="block" name="koefUFunkCilja" placeholder="npr. 10 20 30" style={{ width: labelWidth }} onChange={(event) => parseNepoznanice(event.target)} />
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
                            <Input defaultValue="3" width="50px" textAlign="center" display="block" name="brojUvjeta" placeholder="npr. 3" onChange={(event) => promjenaBrojaUvjeta(event.target.value)} />
                        </>
                    }
                </>
            }
            {
                poljeUvjeta?.map((value, index) => {
                    return (
                        <div key={index}>
                            <Label htmlFor="koefUPoljuUvjeta">Koeficijenti uz {index + 1}. uvjet: </Label>
                            <Input defaultValue="2 2 1" name="koefUPoljuUvjeta1" placeholder={placeholderKoeficijenata} onChange={(event) => odrediUvjet(index, "lijevaStranaUvjeta", event.target.value)} />
                            <Select name="koefUPoljuUvjeta2" onChange={(event) => odrediUvjet(index, "ograničenjeUvjeta", event.target.value)}>
                                <option>{nepoznataVrijednost}</option>
                                <option>≤</option>
                                <option>≥</option>
                                <option>=</option>
                            </Select>
                            <Input defaultValue="900" name="koefUPoljuUvjeta3" width="50px" placeholder="200" onChange={(event) => odrediUvjet(index, "desnaStranaUvjeta", event.target.value)} />
                            
                            {poljeParsiranihUvjeta && poljeParsiranihUvjeta[index]?.length !== 0 &&
                                <Label color={uvjetPotpun(poljeUvjeta[index]) ? "green" : "darkred"} >{poljeParsiranihUvjeta[index]}</Label>
                            }
                        </div>
                    )
                })
            }
        </Container>
    )
}

export default FunkcijaCilja;