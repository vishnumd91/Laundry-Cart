import React from 'react'
import styled from 'styled-components';

const Container = styled.div`
    display: flex
`;
const Panel = styled.div`
    flex: ${props => props.flex}
`;

function SplitScreen({children, leftWidth, rightWidth}) {
    const [left, right] = children;
  return (
    <>
        <Container style={{height:'74vh'}}>
            <Panel flex={leftWidth}>
                {left}
            </Panel>
            <Panel flex={rightWidth}>
                {right}
            </Panel>
        </Container>
    </>
  )
}

export default SplitScreen
