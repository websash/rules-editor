import React from 'react'
import {connect} from 'react-redux'
import Select from 'react-select'
import {Button} from 'elemental'

class InclusionRule extends React.Component {
  shouldComponentUpdate(nextProps) {
    return this.props.rule.site !== nextProps.rule.site ||
      this.props.rule.project !== nextProps.rule.project ||
      this.props.single !== nextProps.single
  }

  render() {
    const {
      index, rule, single, sites, projects, onAdd, onUpdate, onRemove
    } = this.props

    return (
      <div className="rule-incl">
        <label>site:</label>
        <Select placeholder="No site selected"
          options={sites} onChange={val => onUpdate(index, {site: val && val.value})}
          value={rule.site} />

        <label>on project:</label>
        <Select placeholder="No project selected"
          options={projects} onChange={val => onUpdate(index, {project: val && val.value})}
          value={rule.project} />

        <div className="btn-group">
          <Button onClick={() => onRemove(index)} disabled={single}>-</Button>
          <Button onClick={() => onAdd(index, {site: null, project: null})}>+</Button>
        </div>
      </div>
    )
  }
}

export default InclusionRule
