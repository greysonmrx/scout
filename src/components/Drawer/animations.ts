import { keyframes } from 'styled-components';

export const fadeIn = keyframes`
    from {
        background-color: rgba(0, 0, 0, 0);
    }

    to {
        background-color: rgba(0, 0, 0, 0.5);
    }
`;

export const fadeOut = keyframes`
    from {
        background-color: rgba(0, 0, 0, 0.5);
    }

    to {
        background-color: rgba(0, 0, 0, 0);
    }
`;

export const slideIn = keyframes`
    from {
        transform: translateX(400px);
    }

    to {
        transform: translateX(0px);
    }
`;

export const slideOut = keyframes`
    from {
        transform: translateX(0px);
    }

    to {
        transform: translateX(400px);
    }
`;