export const insInclusionRule = (index, rule) => ({type: 'INS_INCLUSION_RULE', index, rule})
export const updateInclusionRule = (index, rule) => ({type: 'UPD_INCLUSION_RULE', index, rule})
export const removeInclusionRule = (index) => ({type: 'REM_INCLUSION_RULE', index})
export const updateExclusionRule = (rule) => ({type: 'UPD_EXCLUSION_RULE', rule})
