import '../styles/main.css'
import '../styles/react-select/less/default.less'
import 'elemental/less/elemental.less'

import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {
  getSites, getProjects, getStatuses,
  getInclusionRules, getExclusionRule, isRuleFulfilled
} from '../reducers'

import {Card, Button} from 'elemental'
import InclusionRule from './InclusionRule'
import ExclusionRule from './ExclusionRule'
import * as actions from '../actions'
import stringify from 'json-stringify-pretty-compact'

class App extends React.Component {
  render() {
    const {
      sites, projects, statuses,
      insInclusionRule, removeInclusionRule, updateInclusionRule, updateExclusionRule,
      inclusionRules, exclusionRule, testData, ok
    } = this.props

    return (
      <div id="app-container">
        <Card>
          <fieldset>
            <legend>If any of the following conditions are met:</legend>
            { inclusionRules.map((rule, n) =>
                <InclusionRule
                  key={n} index={n}
                  rule={rule}
                  single={inclusionRules.length === 1}
                  sites={sites}
                  projects={projects}
                  onAdd={insInclusionRule}
                  onUpdate={updateInclusionRule}
                  onRemove={removeInclusionRule} />
              )
            }
          </fieldset>

          <fieldset>
            <legend>and status is not equal to:</legend>
            <ExclusionRule
              rule={exclusionRule}
              statuses={statuses}
              onChange={updateExclusionRule} />
          </fieldset>

          <div className="submit">
            <Button size="sm" type="primary" disabled={!ok}>Have fun</Button>
          </div>
        </Card>
        <Card>
          <pre style={{fontSize: '.85rem'}}><b>{ok.toString()}</b></pre>
          <pre style={{fontSize: '.85rem'}}>{stringify(testData)}</pre>
        </Card>
        {this.props.children}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  inclusionRules: getInclusionRules(state),
  sites : getSites(state),
  projects: getProjects(state),
  statuses: getStatuses(state),
  exclusionRule: getExclusionRule(state),
  testData: state.testData,
  ok: isRuleFulfilled(state)
})

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(App)
