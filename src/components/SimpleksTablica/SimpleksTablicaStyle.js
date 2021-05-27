import styled from "styled-components";

export const TablicaStyle = styled.table`     
    border-radius: 10px;
    text-align: center;
    display: table;
    border: 5px darkgreen double;
    border-collapse: collapse;
    width: auto;
    max-width: 750px;
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
`;

export const Td = styled.td`
    font-weight: bold;
    border: 2px yellowgreen outset;
`;

export const Td2Cols = styled.td`
    ${Td};
    column-span: 2;
    border-top: 3px darkgreen double;
    border-right: 3px darkgreen double;
`;