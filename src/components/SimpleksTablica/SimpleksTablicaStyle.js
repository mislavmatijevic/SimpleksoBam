import styled from "styled-components";

export const TablicaStyle = styled.table`
    position: relative;
    align-self: center;
    text-align: center;
    display: table;
    border: 5px darkgreen double;
    border-collapse: collapse;
    width: auto;
    min-width: 750px;
    font-size: larger;
`;

export const TablicaCaption = styled.caption`
    font-size: 25px;
`;

export const TablicaHead = styled.thead`
    font-weight: bold;
    border-bottom: 5px darkgreen double;
`;

export const TablicaBody = styled.tbody`
    font-weight: bold;
`;

export const Tr = styled.tr`
    border: 1px grey outset;
`;

export const Th = styled.th`
    font-weight: bold;
    width: 85px;
`;

export const Td = styled.td`
    font-weight: bold;
    border: 2px yellowgreen outset;
    min-width: 85px;
`;

export const TdZjCj = styled.td`
    ${Td};
    column-span: 2;
    border-top: 5px black double;
    border-right: 5px darkgreen double;
`;

export const TdDj = styled.td`
    ${Td};
    column-span: 2;
    border-right: 5px darkgreen double;
`;

export const TdIspod = styled.td`
    ${Td};
    border: 2px yellowgreen outset;
    border-top: 5px black double;
`;