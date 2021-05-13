import React from 'react'

export function IzračunajKanonski(poljeUvjeta) {

    let poljeUvjetiUKanonski = [...poljeUvjeta];
    let brojacDopunskih = 1;
    let brojacArtificijalnih = 1;

    for (let i = 0; i < poljeUvjetiUKanonski.length; i++) {
        poljeUvjetiUKanonski[i] = poljeUvjeta[i];

        switch (poljeUvjetiUKanonski[i]["ograničenjeUvjeta"]) {
            case "=":
                continue;

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
    }

    return poljeUvjetiUKanonski;

}