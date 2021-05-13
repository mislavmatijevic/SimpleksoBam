import styled, { css, keyframes } from 'styled-components';

export const Container = styled.div`
`;

export const SpawnAnimation = keyframes`
    from {margin-top: 50px; opacity: 0%;}
    to {opacity: 100%;}
`;

export const InputSyle = css`
    height: 30px;
    border-radius: 5px;
    border: 1px outset yellowgreen;
    border-style: outset;
    margin: 5px 5px 20px;
    font-size: 15px;
    display: ${props => props?.display};
    width: ${props => props?.width};
    text-align: ${props => props?.textAlign};
    transition: all 0.5s cubic-bezier(0, 0.5, 0.655, 1);

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
    margin: 3px 5px 20px;
    font-size: large;
    color: ${props => props.color};
`;

export const Input = styled.input`
    ${InputSyle};
    padding: 0 10px;
`;

export const Select = styled.select`
    ${InputSyle};
    padding: 5px;
`;