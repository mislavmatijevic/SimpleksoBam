import React, { useContext, useEffect } from 'react'
import { Label } from '../../generalStyles/generalStyles';
import { UredanIspisBrojevaIzPolja } from '../../lib/functions/ispisJednadžbi';
import { PodaciContext } from '../Context/PodaciContext';

const KanonskiOblik = () => {

    const {
        poljeUvjetaJSON,
        poljeNepoznanica,
        setPoljeNepoznanica,
        poljeKanonskihUvjeta,
        setPoljeKanonskihUvjeta
    } = useContext(PodaciContext);

    

    useEffect(() => {

        let lokalneNepoznanice = [];
        let lokalniKanonski = [...JSON.parse(poljeUvjetaJSON)];

        let brojacDopunskih = 1;
        let brojacArtificijalnih = 1;

        for (let i = 1; i <= lokalniKanonski[0]["lijevaStranaUvjeta"].length; i++) {
            lokalneNepoznanice.push("x" + i);
        }

        for (let i = 0; i < lokalniKanonski.length; i++) {

            lokalniKanonski[i]["lijevaStranaUvjeta"] = UredanIspisBrojevaIzPolja(lokalniKanonski[i]["lijevaStranaUvjeta"]);

            switch (lokalniKanonski[i]["ograničenjeUvjeta"]) {
                case "=":
                    lokalniKanonski[i]["lijevaStranaUvjeta"].push(<span> + w<sub>{brojacArtificijalnih}</sub></span>);
                    lokalniKanonski[i]["ograničenjeUvjeta"] = " =";
                    lokalneNepoznanice.push("w" + brojacArtificijalnih);
                    brojacArtificijalnih++;
                    break;

                case "≤":
                    lokalniKanonski[i]["lijevaStranaUvjeta"].push(<span> + u<sub>{brojacDopunskih}</sub></span>);
                    lokalniKanonski[i]["ograničenjeUvjeta"] = " =";
                    lokalneNepoznanice.push("u" + brojacDopunskih);
                    brojacDopunskih++;
                    break;

                case "≥":
                    lokalniKanonski[i]["lijevaStranaUvjeta"].push(<span> - u<sub>{brojacDopunskih}</sub> + w<sub>{brojacArtificijalnih}</sub></span>);
                    lokalniKanonski[i]["ograničenjeUvjeta"] = " =";
                    lokalneNepoznanice.push("u" + brojacDopunskih);
                    lokalneNepoznanice.push("w" + brojacArtificijalnih);
                    brojacArtificijalnih++;
                    brojacDopunskih++;
                    break;

                default:
                    break;
            }
        }

        setPoljeNepoznanica(lokalneNepoznanice);
        setPoljeKanonskihUvjeta(lokalniKanonski);

    }, [poljeUvjetaJSON])

    return (
        <>
            {poljeKanonskihUvjeta?.length > 0 &&
                <>
                    <Label display="block" color="blue">Kanonski oblik:</Label>
                    {poljeKanonskihUvjeta.map(value => {
                        return (
                            <Label display="block" color="blue">{value.lijevaStranaUvjeta} {value.ograničenjeUvjeta} {value.desnaStranaUvjeta}</Label>
                        )
                    })
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