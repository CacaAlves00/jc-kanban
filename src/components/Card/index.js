import React, { useEffect, useRef, useState } from 'react'
import Draggable from 'react-draggable'
import { GrClose } from 'react-icons/gr'
import './styles.scss'

const cardColors = [
    '#C3D06A',
    '#FFDD00'
]

const initialPosition = {
    x: 0,
    y: 0
}

function getRandomColor() {
    return cardColors[Math.floor(Math.random() * cardColors.length)]
}

function Card({ cardId, removeCard }) {

    const [subject, setSubject] = useState('')

    const color = useRef(getRandomColor())

    const cardRef = useRef()

    const [position, setPosition] = useState(initialPosition)

    const styles = {
        borderColor: `${color.current}`,
    }

    useEffect(() => {
        retrieveStateFromLocalStorage()
        console.log(cardId)
    }, [])

    useEffect(() => {
        saveStateIntoLocalStorage()
    }, [subject, position])

    function saveStateIntoLocalStorage() {
        if (subject !== '')
            window.localStorage.setItem(`JC_KANBAN_CARD_${cardId}`, JSON.stringify(subject))
        if (JSON.stringify(position) !== JSON.stringify(initialPosition))
            window.localStorage.setItem(`JC_KANBAN_CARD_${cardId}_POS`, JSON.stringify(position))
    }

    function retrieveStateFromLocalStorage() {
        const retrievedCardSubjectData = window.localStorage.getItem(`JC_KANBAN_CARD_${cardId}`)
        const retrievedCardPosData = window.localStorage.getItem(`JC_KANBAN_CARD_${cardId}_POS`)

        if (retrievedCardSubjectData !== null) {
            const retrievedSubject = JSON.parse(retrievedCardSubjectData)
            setSubject(retrievedSubject)
        }

        if (retrievedCardPosData !== null) {
            const retrievedCardPos = JSON.parse(retrievedCardPosData)
            setPosition(retrievedCardPos)
        }

    }

    function handleRemoveCard() {
        window.localStorage.setItem(`JC_KANBAN_CARD_${cardId}`, null)
        window.localStorage.setItem(`JC_KANBAN_CARD_${cardId}_POS`, null)
        removeCard()
    }

    function handelDrag(e) {
        const bounding = cardRef.current.getBoundingClientRect()

        setPosition((position) => {
            return {
                x: position.x + (e.clientX - bounding.x) - bounding.width / 2,
                y: position.y + (e.clientY - bounding.y) - bounding.height / 2

                // x: e.clientX,
                // y: e.clientY
            }
        })
    }

    return (
        <Draggable position={position} onDrag={handelDrag}>
            <div id='card' ref={cardRef} style={styles}>
                <GrClose className='icon' onClick={handleRemoveCard} />
                <textarea type='text' placeholder='Assunto..'
                    value={subject} onChange={(e) => setSubject(e.target.value)} />
            </div>
        </Draggable>
    )
}

export default Card