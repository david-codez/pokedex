import React from 'react'
import {calculateHeight, calculateWeight, metricHeight, metricWeight} from '../functions/pokeFunctions'

const SizeTable = (props) => {
    let height = calculateHeight(props.height)
    let weight = calculateWeight(props.weight)
  return (
    <dl className='size-table'>
        <div className='size-cell'>
            <dt className='size-table-header'>Height</dt>
            <dd className='size-table-value'>{height}</dd>
            <dd className='size-table-metric'>{metricHeight(props.height)}</dd>
        </div>
        <div className='size-cell'>
            <dt className='size-table-header'>Weight</dt>
            <dd className='size-table-value'>{weight}</dd>
            <dd className='size-table-metric'>{metricWeight(props.weight)}</dd>
        </div>
    </dl>
  )
}

export default SizeTable
