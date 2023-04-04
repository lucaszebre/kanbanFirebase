import { css, Global } from '@emotion/react';

const scrollbarStyle = css`
    ::-webkit-scrollbar {
        width: 10px;
        height: 10px;
        border-radius: 5px;
    }

    ::-webkit-scrollbar-track {
        background-color: transparent;
        border-radius: 5px;
    }

    ::-webkit-scrollbar-thumb {
        background-color: transparent;
        border-radius: 5px;
        border-radius: 5px;
    }


`;

export const GlobalScrollbarStyle = () => <Global styles={scrollbarStyle} />;