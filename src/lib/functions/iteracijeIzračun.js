/*
15 45 25

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

function IzračunajStupacPrveTablice({
    nazivStupca,
    brojVarijabli,
    brojOgraničenja,
    naziviVarijabli,
    funkcijaCilja,
    poljeUvjeta,
    smjer
}) {

    let poljeVrijednostiNovogaStupca = [];
    let indexZadnjeDopunske = -1;

    for (let index = 0; index < brojOgraničenja; index++) {
        switch (nazivStupca) {
            case "Cj":
                poljeVrijednostiNovogaStupca.push(0);
                break;
            case "Var":
                for (let index = 0; index < naziviVarijabli.length; index++) {
                    if (naziviVarijabli[index][0] !== "x") poljeVrijednostiNovogaStupca.push(naziviVarijabli[index]); // TO DO ubaciti uvjet koji provjerava predznak
                }
                break;
            case "Kol":
                poljeVrijednostiNovogaStupca.push(parseInt(poljeUvjeta[index]["desnaStranaUvjeta"]));
                break;
            case "R":
                poljeVrijednostiNovogaStupca.push(0);
                break;
            default:
                switch (nazivStupca[0]) {
                    case 'x':
                        poljeVrijednostiNovogaStupca.push(parseInt(poljeUvjeta[index]["lijevaStranaUvjeta"][parseInt(nazivStupca.substring(1)) - 1]));
                        break;
                    case 'u':
                        if (poljeUvjeta[index]["ograničenjeUvjeta"] === "≤") {
                            if (indexZadnjeDopunske <= index) {
                                poljeVrijednostiNovogaStupca.push(0);
                            } else {
                                indexZadnjeDopunske = index;
                                poljeVrijednostiNovogaStupca.push(1);
                            }
                        } else if  (poljeUvjeta[index]["ograničenjeUvjeta"] === "≥") {
                            if (indexZadnjeDopunske <= index) {
                                poljeVrijednostiNovogaStupca.push(0);
                            } else {
                                indexZadnjeDopunske = index;
                                poljeVrijednostiNovogaStupca.push(-1);
                            }
                        }
                    case 'w':
                        if (poljeUvjeta[index]["ograničenjeUvjeta"] === "=") {
                            if (indexZadnjeDopunske <= index) {
                                poljeVrijednostiNovogaStupca.push(0);
                            } else {
                                indexZadnjeDopunske = index;
                                poljeVrijednostiNovogaStupca.push(1);
                            }
                        } else if  (poljeUvjeta[index]["ograničenjeUvjeta"] === "≥") {
                            if (indexZadnjeDopunske <= index) {
                                poljeVrijednostiNovogaStupca.push(0);
                            } else {
                                indexZadnjeDopunske = index;
                                poljeVrijednostiNovogaStupca.push(1);
                            }
                        }
                        break;
                }
                break;
        }
    }

    return { Stupac: nazivStupca, VrijednostiStupca: poljeVrijednostiNovogaStupca };
}

export function IzračunajPočetnuTablicu(argumenti) {

    console.log(argumenti);

    let vrijednostiStupaca = [];
    vrijednostiStupaca.push(IzračunajStupacPrveTablice({ ...argumenti, nazivStupca: "Cj" }))
    vrijednostiStupaca.push(IzračunajStupacPrveTablice({ ...argumenti, nazivStupca: "Var" }))
    vrijednostiStupaca.push(IzračunajStupacPrveTablice({ ...argumenti, nazivStupca: "Kol" }))

    for (let index = 0; index < argumenti.brojVarijabli; index++) {
        vrijednostiStupaca.push(IzračunajStupacPrveTablice({ ...argumenti, nazivStupca: argumenti.naziviVarijabli[index] }));
    }

    return vrijednostiStupaca;
}

export function IzračunajSljedećuIteraciju(bivšaSimpleksica, smjer) {
    return [{
    }]
}