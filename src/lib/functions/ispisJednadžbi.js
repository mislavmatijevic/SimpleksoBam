import React from 'react'

export function IzvadiBrojeveIzTekstaUPolje(tekst) {
    return tekst.split(' ').filter((elementTeksta) => {
        return /^([0]){1}|([0-9]+)$/.test(elementTeksta);
    });
}

export function UredanIspisBrojevaIzPolja(polje) {
    let izlaznoPolje = [];

    polje?.forEach((element, i) => {
        let objektIspisa = <span key={i * 2}>{element}x<sub key={i * 2}>{i + 1}</sub></span>;
        izlaznoPolje.push(objektIspisa);
        izlaznoPolje.push(<span key={i * 2 - 1}> + </span>);
    });
    izlaznoPolje.pop();

    return izlaznoPolje;
}

export function IzradiKanonski(poljeUvjeta) {

    let poljeUvjetiUKanonski = [...JSON.parse(poljeUvjeta)];
    let brojacDopunskih = 1;
    let brojacArtificijalnih = 1;

    for (let i = 0; i < poljeUvjetiUKanonski.length; i++) {
        poljeUvjetiUKanonski[i]["lijevaStranaUvjeta"] = UredanIspisBrojevaIzPolja(poljeUvjetiUKanonski[i]["lijevaStranaUvjeta"]);
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