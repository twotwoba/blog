import React, { useRef, useState, useEffect } from 'react'

interface PopoverProps {
    content: React.ReactNode
    children: React.ReactNode
    placement?: 'top' | 'bottom' | 'left' | 'right'
    offset?: number
}

const getPopoverStyle = (
    triggerRect: DOMRect | null,
    popoverRect: DOMRect | null,
    placement: string,
    offset: number
) => {
    if (!triggerRect || !popoverRect) return { visibility: 'hidden' }
    const style: React.CSSProperties = { position: 'absolute' }
    switch (placement) {
        case 'top':
            style.left = triggerRect.left + triggerRect.width / 2 - popoverRect.width / 2
            style.top = triggerRect.top - popoverRect.height - offset
            break
        case 'bottom':
            style.left = triggerRect.left + triggerRect.width / 2 - popoverRect.width / 2
            style.top = triggerRect.bottom + offset
            break
        case 'left':
            style.left = triggerRect.left - popoverRect.width - offset
            style.top = triggerRect.top + triggerRect.height / 2 - popoverRect.height / 2
            break
        case 'right':
            style.left = triggerRect.right + offset
            style.top = triggerRect.top + triggerRect.height / 2 - popoverRect.height / 2
            break
        default:
            break
    }
    style.zIndex = 1000
    return style
}

const Popover: React.FC<PopoverProps> = ({ content, children, placement = 'bottom', offset = 8 }) => {
    const [visible, setVisible] = useState(false)
    const [triggerRect, setTriggerRect] = useState<DOMRect | null>(null)
    const [popoverRect, setPopoverRect] = useState<DOMRect | null>(null)
    const triggerRef = useRef<HTMLDivElement>(null)
    const popoverRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (visible && triggerRef.current && popoverRef.current) {
            setTriggerRect(triggerRef.current.getBoundingClientRect())
            setPopoverRect(popoverRef.current.getBoundingClientRect())
        }
    }, [visible])

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (
                triggerRef.current &&
                !triggerRef.current.contains(e.target as Node) &&
                popoverRef.current &&
                !popoverRef.current.contains(e.target as Node)
            ) {
                setVisible(false)
            }
        }
        if (visible) {
            document.addEventListener('mousedown', handleClick)
        }
        return () => {
            document.removeEventListener('mousedown', handleClick)
        }
    }, [visible])

    return (
        <>
            <div ref={triggerRef} style={{ display: 'inline-block' }} onClick={() => setVisible((v) => !v)}>
                {children}
            </div>
            {visible && (
                <div
                    ref={popoverRef}
                    style={
                        {
                            ...getPopoverStyle(triggerRect, popoverRect, placement, offset),
                            position: 'fixed',
                            background: '#fff',
                            border: '1px solid #ddd',
                            borderRadius: 4,
                            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                            padding: 8,
                            minWidth: 120
                        } as any
                    }>
                    {content}
                </div>
            )}
        </>
    )
}

export default Popover
