import React, { useContext, useState, useEffect } from 'react'
import { Label } from '../../generalStyles/generalStyles';
import { UredanIspisBrojevaIzPolja } from '../../lib/functions/ispisJednadžbi';
import { PodaciContext } from '../Context/PodaciContext';

const KanonskiOblik = () => {

    const {
        poljeUvjetaJSON,
        poljeNepoznanica,
        setPoljeNazivaVarijabli,
        poljeKanonskihUvjeta,
        setPoljeKanonskihUvjeta,
        setBrojVarijabli,
        setBrojOgraničenja,
        brojOgraničenja,
        brojVarijabli
    } = useContext(PodaciContext);

    const [uvjetiNenegativnosti, setUvjetiNenegativnosti] = useState([])

    useEffect(() => {

        let lokalneVarijable = [];
        let lokalniKanonski = [...JSON.parse(poljeUvjetaJSON)];

        let lokalniUvjetiNenegativnosti = [];

        let brojacVarijabli = 0;

        let brojacDopunskih = 1;
        let brojacArtificijalnih = 1;

        for (let i = 1; i <= lokalniKanonski[0]["lijevaStranaUvjeta"].length; i++) {
            lokalneVarijable.push("x" + i);
            lokalniUvjetiNenegativnosti.length !== 0 && lokalniUvjetiNenegativnosti.push(<span>, </span>);
            lokalniUvjetiNenegativnosti.push(<span>x<sub>{i}</sub></span>);
            brojacVarijabli++;
        }

        for (let i = 0; i < lokalniKanonski.length; i++) {

            lokalniKanonski[i]["lijevaStranaUvjeta"] = UredanIspisBrojevaIzPolja(lokalniKanonski[i]["lijevaStranaUvjeta"]);

            switch (lokalniKanonski[i]["ograničenjeUvjeta"]) {
                case "=":
                    lokalniKanonski[i]["lijevaStranaUvjeta"].push(<span> + w<sub>{brojacArtificijalnih}</sub></span>);
                    lokalniKanonski[i]["ograničenjeUvjeta"] = " =";
                    lokalniUvjetiNenegativnosti.push(<span>, w<sub>{brojacArtificijalnih}</sub></span>);
                    lokalneVarijable.push("w" + brojacArtificijalnih);
                    brojacArtificijalnih++;
                    brojacVarijabli++;
                    break;

                case "≤":
                    lokalniKanonski[i]["lijevaStranaUvjeta"].push(<span> + u<sub>{brojacDopunskih}</sub></span>);
                    lokalniKanonski[i]["ograničenjeUvjeta"] = " =";
                    lokalniUvjetiNenegativnosti.push(<span>, u<sub>{brojacDopunskih}</sub></span>);
                    lokalneVarijable.push("u" + brojacDopunskih);
                    brojacDopunskih++;
                    brojacVarijabli++;
                    break;

                case "≥":
                    lokalniKanonski[i]["lijevaStranaUvjeta"].push(<span> - u<sub>{brojacDopunskih}</sub> + w<sub>{brojacArtificijalnih}</sub></span>);
                    lokalniKanonski[i]["ograničenjeUvjeta"] = " =";
                    lokalniUvjetiNenegativnosti.push(<span>, u<sub>{brojacDopunskih}</sub></span>);
                    lokalniUvjetiNenegativnosti.push(<span>, w<sub>{brojacArtificijalnih}</sub></span>);
                    lokalneVarijable.push("u" + brojacDopunskih);
                    lokalneVarijable.push("w" + brojacArtificijalnih);
                    brojacArtificijalnih++;
                    brojacDopunskih++;
                    brojacVarijabli += 2;
                    break;

                default:
                    break;
            }
        }
        lokalniUvjetiNenegativnosti.push(<span> ≥ 0</span>);
        setUvjetiNenegativnosti([...lokalniUvjetiNenegativnosti]);

        setPoljeNazivaVarijabli(lokalneVarijable);
        setPoljeKanonskihUvjeta(lokalniKanonski);

        // Bitno da su ispod ostalih settera jer se jedino njih gleda prilikom updatea simpleksice!
        setBrojOgraničenja(lokalniKanonski.length);
        setBrojVarijabli(brojacVarijabli);

    }, [poljeUvjetaJSON, brojOgraničenja, brojVarijabli, setBrojOgraničenja, setBrojVarijabli, setPoljeKanonskihUvjeta, setPoljeNazivaVarijabli]);

    return (
        <>
            {poljeKanonskihUvjeta?.length > 0 &&
                <>
                    <Label display="block" color="blue">Kanonski oblik:</Label>
                    {poljeKanonskihUvjeta.map((value, index) => {
                        return (
                            <Label key={index} display="block" color="blue">{value.lijevaStranaUvjeta} {value.ograničenjeUvjeta} {value.desnaStranaUvjeta}</Label>
                        )
                    })
                    }

                    {uvjetiNenegativnosti &&
                        <Label display="block" color="blue">{uvjetiNenegativnosti}</Label>
                    }
                    
                    {poljeKanonskihUvjeta && poljeNepoznanica?.length > 0 &&
                        <Label>{poljeNepoznanica}</Label>
                    }
                </>
            }
        </>
    );

}

export default KanonskiOblik;