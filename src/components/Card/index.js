import React, { useEffect, useRef, useState } from 'react'
import Draggable from 'react-draggable'
import { GrClose } from 'react-icons/gr'
import useDraggable from '../../hooks/useDraggable'
import './styles.scss'

const cardColors = [
    '#C3D06A',
    '#FFDD00'
]

function getRandomColor() {
    return cardColors[Math.floor(Math.random() * cardColors.length)]
}

function Card({ cardId, removeCard }) {

    const [subject, setSubject] = useState('')

    const color = useRef(getRandomColor())

    const cardRef = useRef()

    const initialPosition = {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2.5
    }

    const [position, setPosition, toggleIsDragging] = useDraggable(cardRef, initialPosition)

    const styles = {
        border: `5px solid ${color.current}`,
        top: `${position.y}px`,
        left: `${position.x}px`
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
        
        if (retrievedCardPosData !== null){
            const retrievedCardPos = JSON.parse(retrievedCardPosData)
            setPosition(retrievedCardPos)
        }

    }

    function handleRemoveCard() {
        window.localStorage.setItem(`JC_KANBAN_CARD_${cardId}`, null)
        window.localStorage.setItem(`JC_KANBAN_CARD_${cardId}_POS`, null)
        removeCard()
    }

    return (
        <div id='card' ref={cardRef} style={styles} onClick={toggleIsDragging}>
            <GrClose className='icon' onClick={handleRemoveCard} />
            <textarea type='text' placeholder='Assunto..'
                value={subject} onChange={(e) => setSubject(e.target.value)} />
        </div>
    )
}

export default Card