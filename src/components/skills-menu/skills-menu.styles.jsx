import styled from 'styled-components';

const SkillsMenuContainer = styled.div`
    text-align: center;
    
    .MuiInputBase-root,
    .MuiSelect-icon {
        color: white;
    }

    .MuiFormLabel-root,
    .MuiFormLabel-root.Mui-focused {
        color: #d6d6d6;
    }
`;
SkillsMenuContainer.displayName = 'SkillsMenuContainer';

export default SkillsMenuContainer;