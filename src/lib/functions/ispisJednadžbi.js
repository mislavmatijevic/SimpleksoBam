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