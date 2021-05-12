import styled, { css, keyframes } from 'styled-components';

export const Container = styled.div`
`;

export const SpawnAnimation = keyframes`
    from {opacity: 0%;}
    to {opacity: 100%;}
`;

export const InputSyle = css`
    height: 30px;
    min-width: 50px;
    border-radius: 5px;
    border: 1px outset yellowgreen;
    border-style: outset;
    margin: 5px 5px 20px;
    font-size: 15px;
    display: ${props => props?.display};

    &:focus{
        border-color: greenyellow;
    }

    animation-name: ${SpawnAnimation};
    animation-duration: 0.5s;
    animation-iteration-count: 1;
`;


export const Label = styled.label`
    ${InputSyle};
    border: none;
    margin: 10px 7px 0;
    font-size: large;
`;

export const Input = styled.input`
    ${InputSyle};
`;

export const Select = styled.select`
    ${InputSyle};
`;