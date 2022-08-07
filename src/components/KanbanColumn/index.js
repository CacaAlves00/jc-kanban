import React from 'react'
import './styles.scss'

const middleColStyles = {
    'borderLeft': '3px solid #3C3C3B',
    'borderRight': '3px solid #3C3C3B'
}

function KanbanColumn({ cards, heading, isItMiddleCol }) {

    return (
        <section className='kanban-column' style={isItMiddleCol ? middleColStyles : {}}>
            <header>
                {heading}
            </header>

            <main>
            </main>

        </section>
    )
}

export default KanbanColumn