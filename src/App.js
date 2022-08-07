import KanbanColumn from './components/KanbanColumn'
import { useEffect, useRef, useState } from 'react'
import { GrAdd } from 'react-icons/gr'

import './App.scss'
import Card from './components/Card'

function App() {

  const [cards, setCards] = useState([])

  const lastCardId = useRef(0)

  useEffect(() => {
    retrieveStateFromLocalStorage()
  }, [])

  useEffect(() => {
      saveStateIntoLocalStorage()
  }, [cards])

  function saveStateIntoLocalStorage() {
    
    if (cards.length !== 0)
      window.localStorage.setItem('JC_KANBAN_CARDS', JSON.stringify(cards))
      window.localStorage.setItem('JC_KANBAN_LAST_CARD_ID', JSON.stringify(lastCardId.current))
  }

  function retrieveStateFromLocalStorage() {
    const cardsData = window.localStorage.getItem('JC_KANBAN_CARDS')
    const lastCardIdData = window.localStorage.getItem('JC_KANBAN_LAST_CARD_ID')

    if (cardsData !== null)
      setCards(JSON.parse(cardsData))

    if (lastCardIdData !== null) 
      lastCardId.current = JSON.parse(lastCardIdData)

  }

  function handleAddIconClick() {
    setCards((cards) => [...cards, fetchNewCardId()])
  }

  function fetchNewCardId() {
    let newCardId = lastCardId.current + 1
    lastCardId.current = newCardId
    return newCardId
  }

  return (
    <div className="App">
      <GrAdd size={'3rem'} id='add-icon' onClick={handleAddIconClick} />

      <div id="kanban-columns">

        <KanbanColumn heading='Conteúdos Estudados' cards={cards} />
        <KanbanColumn heading='Conteúdos Em Estudo' isItMiddleCol={true} cards={cards} />
        <KanbanColumn heading='Conteúdos Em Dificuldade' cards={cards} />

      </div>

      {
        cards.map(cardId =>
          <Card key={cardId} cardId={cardId}
            removeCard={() => setCards(cards => cards.filter(card => card !== cardId))} />
        )
      }
    </div>
  )
}

export default App
