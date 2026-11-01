import React from 'react'
import { MAX_BASE_STAT, statBarPercent, statLabel } from '../functions/pokeFunctions'

const StatTable = ({statTableData}) => {
    let pokeStats = statTableData
    let total = pokeStats.reduce((sum, stat) => sum + stat.base_stat, 0)

  return (
    <section className='panel' aria-labelledby='stats-heading'>
        <div className='panel-header'>
            <h2 id='stats-heading' className='panel-title'>Base stats</h2>
            <p className='panel-meta'>Total <span className='num stat-total'>{total}</span></p>
        </div>
        <table className='stat-table'>
            <thead className='visually-hidden'>
                <tr>
                    <th scope='col'>Stat</th>
                    <th scope='col'>Value</th>
                    <th scope='col'>Out of {MAX_BASE_STAT}</th>
                </tr>
            </thead>
            <tbody>
                {pokeStats.map((stat) => (
                    <tr key={stat.stat.name}>
                        <th scope='row' className='stat-table-attribute'>{statLabel(stat.stat.name)}</th>
                        <td className='stat-table-value num'>{stat.base_stat}</td>
                        <td className='stat-table-bar'>
                            <span className='stat-track'>
                                <span className='stat-fill' style={{ width: `${statBarPercent(stat.base_stat)}%` }} />
                            </span>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        <p className='stat-scale' aria-hidden='true'>
            <span>0</span><span>{MAX_BASE_STAT}</span>
        </p>
    </section>
  )
}

export default StatTable
