/*
15 45 25
max

2

2 2 3
≤ 700
1 4 2
≤ 900

//////////////////////////////

Z = 15x1 + 45x2 + 25x3 -> max
2x1 + 2x2 + 3x3 + u1 = 700
1x1 + 4x2 + 2x3 + u2 = 900
x1, x2, x3, u1, u2 ≥ 0

{
{Stupac: Cj, VrijednostiStupca: [0, 0]},         // ubačene varijable
{Stupac: Var, VrijednostiStupca: [u1, u2]},      // nazivi varijabli
{Stupac: Kol, VrijednostiStupca: [700, 900]},    // desni dio od uvjetaa
{Stupac: x1, VrijednostiStupca: [2, 1]},          
{Stupac: x2, VrijednostiStupca: [2, 4]},          
{Stupac: u1, VrijednostiStupca: [3, 2]},          
{Stupac: u2, VrijednostiStupca: [1, 0]},          
{Stupac: w1, VrijednostiStupca: [0, 1]},          
{Stupac: R, VrijednostiStupca: [350, 225]}       // kasnije
}

ZjCj {
    []
}
 */
var najranijiRedakIdućeDopunske;
var najranijiRedakIdućeArtificijalne;
var riješeno = false;

function IzračunajStupacPrveTablice({
    nazivStupca,
    brojOgraničenja,
    naziviVarijabli,
    funkcijaCilja,
    poljeUvjeta,
    smjer,
    VARStupac
}) {

    var poljeVrijednostiNovogaStupca = [];
    var većUpisanaDopunska = false;
    var većUpisanaArtificijalne = false;
    let mogućeVarijable = naziviVarijabli.filter(slovo => slovo[0] !== 'x');

    for (let index = 0; index < brojOgraničenja; index++) {
        switch (nazivStupca) {
            case "Cj":

                if (VARStupac["VrijednostiStupca"][index][0] === "u") {
                    poljeVrijednostiNovogaStupca.push(0);
                }
                else if (VARStupac["VrijednostiStupca"][index][0] === "w") {
                    poljeVrijednostiNovogaStupca.push(smjer === "max" ? "-M" : "M");
                }

                break;
            case "Var":

                if (mogućeVarijable[index][0] === 'w') {
                    poljeVrijednostiNovogaStupca.push(mogućeVarijable[index]);
                }
                else if (mogućeVarijable[index][0] === 'u') {
                    if (poljeUvjeta[index]["ograničenjeUvjeta"] !== "≥") {
                        poljeVrijednostiNovogaStupca.push(mogućeVarijable[index]);
                    }
                    else {
                        mogućeVarijable.shift();
                        index--;
                    }
                }

                break;
            case "Kol":

                poljeVrijednostiNovogaStupca.push(parseInt(poljeUvjeta[index]["desnaStranaUvjeta"]));

                break;
            default:

                switch (nazivStupca[0]) {

                    case 'x':

                        poljeVrijednostiNovogaStupca.push(
                            parseInt(poljeUvjeta[index]["lijevaStranaUvjeta"][parseInt(nazivStupca.substring(1)) - 1])
                        );

                        break;
                    case 'u':

                        if (većUpisanaDopunska ||
                            najranijiRedakIdućeDopunske > index ||
                            poljeUvjeta[index]["ograničenjeUvjeta"] === "=") {

                            poljeVrijednostiNovogaStupca.push(0);

                        } else {
                            poljeVrijednostiNovogaStupca.push(poljeUvjeta[index]["ograničenjeUvjeta"] === "≤" ? 1 : -1);
                            većUpisanaDopunska = true;
                            najranijiRedakIdućeDopunske = index + 1;
                        }

                        break;
                    case 'w':

                        if (većUpisanaArtificijalne || najranijiRedakIdućeArtificijalne > index || poljeUvjeta[index]["ograničenjeUvjeta"] === "≤") {
                            poljeVrijednostiNovogaStupca.push(0);
                        } else {
                            poljeVrijednostiNovogaStupca.push(1);
                            većUpisanaArtificijalne = true;
                            najranijiRedakIdućeArtificijalne = index + 1;
                        }

                        break;

                }

                break;
        }
    }

    /* Zj-Cj redak */
    if (nazivStupca[0] == 'x') {
        let broj = funkcijaCilja[parseInt(nazivStupca[1]) - 1];
        if (smjer == "max") {
            broj *= -1;
        }
        poljeVrijednostiNovogaStupca.push(broj);
    } else if (nazivStupca == 'Cj') {
        poljeVrijednostiNovogaStupca.push("zjcj");
        poljeVrijednostiNovogaStupca.push("dj");
    } else if (nazivStupca != 'Var') {
        poljeVrijednostiNovogaStupca.push(0);
    } else if (nazivStupca == 'Var') {
        poljeVrijednostiNovogaStupca.push(null, null);
    }

    if (nazivStupca != 'Cj' && nazivStupca != 'Var') {
        let zbrojZaDjRedak = 0;
        poljeUvjeta.forEach((uvjeti, index) => {
            if (uvjeti["ograničenjeUvjeta"] !== '≤') {
                zbrojZaDjRedak += poljeVrijednostiNovogaStupca[index];
            }
        });
        if (smjer == "max") {
            zbrojZaDjRedak *= -1;
        }
        poljeVrijednostiNovogaStupca.push(zbrojZaDjRedak);
    } else if (nazivStupca == 'Var') {
        poljeVrijednostiNovogaStupca.push(null, null);
    }


    return { Stupac: nazivStupca, VrijednostiStupca: [...poljeVrijednostiNovogaStupca] };
}

export function ParsirajStupceURetke(stupci) {

    najranijiRedakIdućeDopunske = 0;
    najranijiRedakIdućeArtificijalne = 0;

    let brojRedova = stupci[0]["VrijednostiStupca"].length;
    let poljeRedaka = [];

    for (let index = 0; index < brojRedova; index++) {

        let redak = [];

        stupci.forEach((stupac) => {
            redak.push(stupac["VrijednostiStupca"][index]);
        });

        poljeRedaka.push(redak);
    }

    console.log(poljeRedaka);

    return poljeRedaka;
}

// TODO: degeneracija!

function IzračunajStupacR(stupci, retci, smjer, brojVarijabli) {

    stupci[stupci.length].push({Stupac: "R", Array});

    let indeksVodećegStupca = -1;
    let indeksVodećegRetka = -1;

    var djRed = retci.filter(redak => redak[0] == "dj")[0];
    var zjcjRed = retci.filter(redak => redak[0] == "zjcj")[0];

    var KoličinaStupac = stupci.filter(stupac => stupac.Stupac == "Kol")[0];

    let minBroj = 0;

    djRed.forEach((broj, index) => {
        // Traži određeni broj u dj redu za odabir vodećeg stupca:
        if ((smjer == "max" && broj < 0 && Math.abs(broj) > minBroj) ||
            (smjer == "min" && broj > minBroj)) {
            minBroj = broj;
            indeksVodećegStupca = index;
            // ILI ako su dva broja ista:
        } else if ((smjer == "max" && broj != 0 && Math.abs(broj) == minBroj) ||
            (smjer == "min" && broj > minBroj)) {
            minBroj = broj;
            indeksVodećegStupca = index;
        }
    });

    if (minBroj == 0) {
        zjcjRed.forEach((broj, index) => {
            if ((smjer == "max" && broj < 0 && Math.abs(broj) > minBroj) ||
                smjer == "min" && broj > minBroj) {
                minBroj = broj;
                indeksVodećegStupca = index;
            }
        });
    }

    if (indeksVodećegStupca == -1) return false;

    // Postoji vodeći stupac!

    let indexRstupca = stupci.length - 1; // Koristi se za pristupanje R stupcu u trenutnoj tablici.

    var postojiDegeneracija = false;
    var indexiRedovaDegeneriranih = [];

    let najmanjiKoličnik = -Infinity; // Traženje najmanjeg R-a i otkrivanje degeneracija.
    let indexNajmanjegKoličnika = -1;

    stupci[indeksVodećegStupca].forEach((element, indexOvogRetka) => {
        if (element <= 0) {
            stupci[indexRstupca].push(null); // Ne dijelimo s nulom ili neg.
        }
        else {
            let količnik = KoličinaStupac[indexOvogRetka] / element;
            let indexMogućeDegeneracije = stupci[indexRstupca].indexOf(količnik);
            if (indexMogućeDegeneracije !== -1) { // Degeneracija!

                // Zapamti indexe ovih degeneriranih redaka za kasnije (ako već nisi).
                if (indexiRedovaDegeneriranih.indexOf(indexMogućeDegeneracije) == -1) {
                    indexiRedovaDegeneriranih.push(indexMogućeDegeneracije);
                }
                if (indexiRedovaDegeneriranih.indexOf(indexOvogRetka) == -1) {
                    indexiRedovaDegeneriranih.push(indexOvogRetka);
                }

            }
            stupci[indexRstupca].push(količnik);
            if (količnik < najmanjiKoličnik) {
                najmanjiKoličnik = količnik;
                indexNajmanjegKoličnika = indexOvogRetka;
            }
        }
    });

    // Ako je stupac R pun null-ova, prekini cijeli ovaj proces.
    let postojiDaljnjeRješenje = false;
    stupci[indexRstupca].forEach(element => {
        if (element != null) {
            postojiDaljnjeRješenje = true;
        }
    });

    if (!postojiDaljnjeRješenje) return false;

    // U ovom trenutku imamo stupacR popunjen najmanje jednim brojem i možda nullovima.

    // Tražimo degeneraciju!

    var indexStupcaPrveVarijable = stupci.map((stupac, index) => { if (stupac.nazivStupca == "x1") return index });

    if (!postojiDegeneracija) {
        indeksVodećegRetka = indexNajmanjegKoličnika;
    } else if (postojiDegeneracija) {

        let minimalniBroj = Infinity;
        let indeksMinRezultataDijeljenja = -1;

        for (let i = indexStupcaPrveVarijable; i < indexStupcaPrveVarijable + brojVarijabli; i++) {
            if (i == indeksVodećegStupca) continue; // Ne želimo razrješavati degeneraciju istim stupcem!
            let stupacVećDegeneriran = false;

            stupci[i].forEach((value, index) => {
                let rezultatDijeljenja = value / stupci[indeksVodećegStupca][index];
                if (rezultatDijeljenja == minimalniBroj) {
                    stupacVećDegeneriran = true; // Već su dva isti brojevi, nastavi na sljedeći stupac jer je i ovdje degeneracija.
                }
                if (!stupacVećDegeneriran) {
                    minimalniBroj = rezultatDijeljenja;
                    indeksMinRezultataDijeljenja = index;
                }
            });

            if (!stupacVećDegeneriran && minimalniBroj !== Infinity) {
                indeksVodećegRetka = indeksMinRezultataDijeljenja;
                break;
            }
        }

    }

    if (indeksVodećegRetka == -1) return false;

    return {indeksVodećegRetka: indeksVodećegRetka, indeksVodećegStupca: indeksVodećegStupca};
}

export function IzračunajPočetnuTablicu(argumenti) {

    var vrijednostiStupaca = [];
    var VarStupac = IzračunajStupacPrveTablice({ ...argumenti, nazivStupca: "Var" });
    vrijednostiStupaca.push(IzračunajStupacPrveTablice({ ...argumenti, nazivStupca: "Cj", VARStupac: { ...VarStupac } }));
    vrijednostiStupaca.push(VarStupac);
    vrijednostiStupaca.push(IzračunajStupacPrveTablice({ ...argumenti, nazivStupca: "Kol" }));

    for (let index = 0; index < argumenti.brojVarijabli; index++) {
        vrijednostiStupaca.push(IzračunajStupacPrveTablice({ ...argumenti, nazivStupca: argumenti.naziviVarijabli[index] }));
    }

    vrijednostiStupaca.push(IzračunajStupacPrveTablice({ ...argumenti, nazivStupca: "R" })); // Samo pripremi R stupac.

    var retci = ParsirajStupceURetke([...vrijednostiStupaca]);

    IzračunajStupacR(vrijednostiStupaca, retci, argumenti.smjer, argumenti.brojVarijabli);

    return retci;
}

export function IzračunajSljedećuIteraciju(bivšaSimpleksica, smjer) {
    return [{
    }]
}