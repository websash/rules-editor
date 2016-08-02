import {combineReducers} from 'redux'
import {uniqBy, without} from 'lodash'

const editorData = () => [
  {
    site: {value: 1, label: '1) lion.com'},
    project: {value: 1, label: '1) lorem ipsum'},
    status: {value: 1, label: '1) pending'}
  }, {
    site: {value: 2, label: '2) dragonfly.com'},
    project: {value: 2, label: '2) dolor sit amet'},
    status: {value: 2, label: '2) done'}
  }, {
    site: {value: 3, label: '3) zebra.com'},
    project: {value: 3, label: '3) maximus sapien'},
    status: {value: 1, label: '1) pending'}
  }, {
    site: {value: 4, label: '4) monkey.com'},
    project: {value: 4, label: '4) dapibus turpis'},
    status: {value: 2, label: '2) done'}
  }, {
    site: {value: 5, label: '5) parrot.com'},
    project: {value: 5, label: '5) morbi tristique'},
    status: {value: 1, label: '1) pending'}
  }, {
    site: {value: 3, label: '3) zebra.com'},
    project: {value: 5, label: '5) morbi tristique'},
    status: {value: 1, label: '1) pending'}
  }
]

const testData = () => [
  {site: 1, project: 2, status: 1},
  {site: 2, project: 2, status: 2},
  {site: 2, project: 3, status: 1},
  {site: 4, project: 4, status: 2},
  {site: 5, project: 5, status: 1},
  {site: 3, project: 5, status: 3}
]

export const inclusionRule = (state = {site: null, project: null}, action) => {
  return {
    ...state,
    site: action.rule.site === undefined ? state.site : action.rule.site,
    project: action.rule.project === undefined ? state.project : action.rule.project
  }
}

export const inclusionRules = (state = [{site: null, project: null}], action) => {
  switch (action.type) {
    case 'INS_INCLUSION_RULE':
      return [
        ...state.slice(0, action.index + 1),
        {site: action.rule.site, project: action.rule.project},
        ...state.slice(action.index + 1)
      ]
    case 'UPD_INCLUSION_RULE':
      return [
        ...state.slice(0, action.index),
        inclusionRule(state[action.index], action),
        ...state.slice(action.index + 1)
      ]

    case 'REM_INCLUSION_RULE':
      return state.filter((_, i) => i !== action.index)

    default:
      return state
  }
}

export const exclusionRule = (state = null, action) => {
  switch (action.type) {
    case 'UPD_EXCLUSION_RULE':
      return action.rule.status
  default:
    return state
  }
}

export default combineReducers({editorData, inclusionRules, exclusionRule, testData})

export const getInclusionRules = (state) => state.inclusionRules

export const getSites = (state) => uniqBy(state.editorData.map(entry => entry.site), 'value')

export const getProjects = (state) => uniqBy(state.editorData.map(entry => entry.project), 'value')

export const getStatuses = (state) => uniqBy(state.editorData.map(entry => entry.status), 'value')

export const getExclusionRule = (state) => state.exclusionRule

export const isRuleFulfilled = (state) => state.testData
  .filter(entry => state.exclusionRule && entry.status !== state.exclusionRule)
  .some(entry => state.inclusionRules.some(rule =>
    entry.site === rule.site && entry.project === rule.project))
