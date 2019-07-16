import styled from 'styled-components';
import { Col } from 'bootstrap-4-react';

import { getClientHeight } from 'utils';

export const HeightCol = styled(Col)`
    @media (min-width: 768px) {
        height: ${ getClientHeight() }px;
    }
`;
