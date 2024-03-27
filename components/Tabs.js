import styled from "styled-components";

const StyledTabs = styled.div`
  display: flex;
  gap: 40px;
  margin-bottom: 20px;
`;

const StyledTab = styled.span`
  font-size: 1.3rem;
  cursor: pointer;
  ${props => props.$isActive ? `
        color:#BD195D;
        border-bottom: 1px solid #BD195D;
    ` : `
        color:#555
  `}
`;

export default function Tabs({tabs, isActive, onChange}) {
    return (
        <StyledTabs>
            {tabs.map(tabName => (
                <StyledTab key={tabName}
                           $isActive={tabName === isActive}
                           onClick={() => {onChange(tabName)}}
                >
                    {tabName}
                </StyledTab>
            ))}
        </StyledTabs>
    )
}