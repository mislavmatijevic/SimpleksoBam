import styled, { css, keyframes } from 'styled-components';

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
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

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

export const Header = styled.h1`
    font-size: xx-large;
    color: darkgreen;
    text-align: ${props => props?.textAlign};
`;

export const Description = styled.h3`
    font-size: ${props => props?.fontSize};
    margin-top: -10px;
    color: ${props => props.color};
    text-align: ${props => props?.textAlign};
`;

export const Label = styled.label`
    ${InputSyle};
    border: none;
    margin: 3px 5px 20px;
    font-size: large;
    color: ${props => props.color};
`;