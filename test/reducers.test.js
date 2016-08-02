const test = require('tape')
const inclusionRules = require('../reducers').inclusionRules
const isRuleFulfilled = require('../reducers').isRuleFulfilled
const stringify = require('json-stringify-pretty-compact')

test('Reducer: inclusionRules()', t => {
  let state, action

  state = [{site: null, project: null}]
  action = {type: 'FOOBAR'}
  t.deepEqual(inclusionRules(state, action), state,
              'should return default state')


  state = [
    {site: 1, project: null},
    {site: null, project: 1}
  ]
  action = {
    type: 'INS_INCLUSION_RULE', index: 0, rule: {site: 2, project: 2}
  }
  t.deepEqual(inclusionRules(state, action), [
    {site: 1, project: null},
    {site: 2, project: 2},
    {site: null, project: 1}
  ], 'should insert rule at index + 1')


  state = [
    {site: 1, project: null},
    {site: 2, project: 2},
    {site: null, project: 1}
  ]
  action = {
    type: 'UPD_INCLUSION_RULE', index: 1, rule: {site: 3, project: 4}
  }
  t.deepEqual(inclusionRules(state, action), [
    {site: 1, project: null},
    {site: 3, project: 4},
    {site: null, project: 1}
  ], 'should update rule at specified index')


  state = [
    {site: 1, project: null},
    {site: 2, project: 2},
    {site: null, project: 1}
  ]
  action = {
    type: 'UPD_INCLUSION_RULE', index: 1, rule: {project: 4}
  }
  t.deepEqual(inclusionRules(state, action), [
    {site: 1, project: null},
    {site: 2, project: 4},
    {site: null, project: 1}
  ], 'should be able to update rule partially')


  state = [
    {site: 1, project: null},
    {site: 2, project: 2},
    {site: null, project: null}
  ]
  action = {
    type: 'UPD_INCLUSION_RULE', index: 2, rule: {site: 4}
  }
  t.deepEqual(inclusionRules(state, action), [
    {site: 1, project: null},
    {site: 2, project: 2},
    {site: 4, project: null}
  ], 'should be able to update rule partially')


  state = [
    {site: 1, project: null},
    {site: 2, project: 2},
    {site: null, project: 1}
  ]
  action = {
    type: 'REM_INCLUSION_RULE', index: 1
  }
  t.deepEqual(inclusionRules(state, action), [
    {site: 1, project: null},
    {site: null, project: 1}
  ], 'should remove rule at specified index')

  t.end()
})

const testData = [
  {site: 1, project: 2, status: 1},
  {site: 2, project: 2, status: 2},
  {site: 2, project: 3, status: 1},
  {site: 4, project: 4, status: 2},
  {site: 5, project: 5, status: 1},
  {site: 3, project: 5, status: 3}
]

test(`Selector: isRuleFulfilled()
testData = ${stringify(testData)}`, t => {
  let state

  state = {
    testData,
    exclusionRule: 1,
    inclusionRules: [
      {site: 1, project: null},
      {site: 2, project: 2}
    ]
  }
  t.ok(isRuleFulfilled(state),
       'case: (site==1 && project==null || site==2 && project==2) && !(status==1)')

  state = {
    testData,
    exclusionRule: 2,
    inclusionRules: [
      {site: 1, project: 2},
      {site: 2, project: 2}
    ]
  }
  t.ok(isRuleFulfilled(state),
       'case: (site==1 && project==2 || site==2 && project==2) && !(status==2)')

  state = {
    testData,
    exclusionRule: 2,
    inclusionRules: [
      {site: 1, project: 2},
      {site: 3, project: 5},
      {site: 4, project: 4}
    ]
  }
  t.ok(isRuleFulfilled(state),
       'case: (site==1 && project==2 || site==3 && project==5 || site==4 && project==4) && !(status==2)')

  state = {
    testData,
    exclusionRule: 1,
    inclusionRules: [
      {site: 1, project: 2},
      {site: 3, project: 5},
      {site: 4, project: 4}
    ]
  }
  t.ok(isRuleFulfilled(state),
       'case: (site==1 && project==2 || site==3 && project==5 || site==4 && project==4) && !(status==1)')
  t.end()
})
