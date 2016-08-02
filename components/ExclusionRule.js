import React from 'react'
import {connect} from 'react-redux'
import Select from 'react-select'
import {Button} from 'elemental'

const ExclusionRule = ({rule, statuses, onChange}) =>
  <Select
    options={statuses}
    onChange={val => onChange({status: val && val.value})}
    value={rule} />

export default ExclusionRule
