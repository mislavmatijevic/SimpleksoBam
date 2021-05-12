import styled, { css } from 'styled-components';

export const Container = styled.div`

`;

export const InputSyle = css`
    height: 30px;
    min-width: 50px;
    border-radius: 5px;
    border: 1px outset yellowgreen;
    border-style: outset;
    margin: 5px 5px 20px;
    font-size: 15px;
    &:focus{
        border-color: greenyellow;
    }
`;

export const Label = styled.label`
`;

export const Input = styled.input`
    ${InputSyle};
    width: 300px;
`;

export const Select = styled.select`
    ${InputSyle};
`;