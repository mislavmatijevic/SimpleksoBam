import React, { useState } from 'react'

const KanonskiOblik = (props) => {

    const [poljeUvjeta, setPoljeUvjeta] = useState([]);
    
    useEffect(() => {

        let poljeUvjetiUKanonski = [];
        let brojacDopunskih = 1;
        let brojacArtificijalnih = 1;

        poljeUvjeta?.forEach((element, i) => {
            poljeUvjetiUKanonski[i] = element;
            
            switch (poljeUvjetiUKanonski[i]["ograničenjeUvjeta"]) {

                case "=":
                    return

                case "≤":
                    poljeUvjetiUKanonski[i]["lijevaStranaUvjeta"].push(<span> + u<sub>{brojacDopunskih++}</sub></span>);
                    poljeUvjetiUKanonski[i]["ograničenjeUvjeta"] = " =";
                    break;

                case "≥":
                    poljeUvjetiUKanonski[i]["lijevaStranaUvjeta"].push(<span> - u<sub>{brojacDopunskih++}</sub> + w<sub>{brojacArtificijalnih++}</sub></span>);
                    poljeUvjetiUKanonski[i]["ograničenjeUvjeta"] = " =";
                    break;

                default:
                    break;
            }

        });

        setPoljeKanonskihOblika([poljeUvjetiUKanonski]);

    }, [poljeUvjeta])

    return (
        <>

        </>
    )
}