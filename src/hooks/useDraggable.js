import React, { useEffect, useState } from 'react'

const defaultPosition = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2.5
}

function useDraggable(ref, initialPosition = defaultPosition) {

    const [position, setPosition] = useState(initialPosition)

    const [isDragging, setIsDragging] = useState(false)

    useEffect(() => {

        const handleWindowMouseMove = (e) => {
            if (!isDragging)
                return

            const bounding = ref.current.getBoundingClientRect()

            setPosition((position) => {
                return {
                    x: position.x + (e.clientX - bounding.x) - bounding.width / 2,
                    y: position.y + (e.clientY - bounding.y) - bounding.height / 2
                }
            })
        }

        const handleWindowTouchMove = (e) => {
            if (!isDragging)
                return

            const bounding = ref.current.getBoundingClientRect()

            setPosition((position) => {
                return {
                    x: position.x + (e.touches[0].clientX - bounding.x - bounding.width / 2),
                    y: position.y + (e.touches[0].clientY - bounding.y - bounding.height / 2)
                }
            })
        }

        window.addEventListener('mousemove', handleWindowMouseMove)
        window.addEventListener('touchmove', handleWindowTouchMove)

        return () => {
            window.removeEventListener('mousemove', handleWindowMouseMove)
            window.removeEventListener('touchmove', handleWindowTouchMove)
        }
    }, [isDragging])

    function toggleIsDragging() {
        setIsDragging((isDragging) => !isDragging)
    }

    return [position, setPosition, toggleIsDragging]
}

export default useDraggable