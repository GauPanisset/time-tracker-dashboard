import React from 'react'

type Props = {
  children: React.ReactNode
  text: string
}

/**
 * Component adding a tooltip at the bottom of a given component.
 * The tooltip is displayed on component hover.
 */
const Tooltip: React.FunctionComponent<Props> = ({ children, text }) => {
  const containerRef = React.useRef<HTMLSpanElement>(null)
  /**
   * Width of the component at which the tooltip is attached.
   * This is needed to center the tooltip.
   */
  const [width, setWidth] = React.useState(0)

  React.useLayoutEffect(() => {
    setWidth(containerRef?.current?.getBoundingClientRect()?.width ?? 0)
  }, [])

  return (
    <span ref={containerRef} className="group relative inline-block">
      {children}
      <div
        className="pointer-events-none absolute z-10 mt-1 max-w-[10rem] rounded bg-light px-2 py-1 opacity-0 shadow-md transition-opacity group-hover:opacity-100"
        style={{
          transform: `translateX(-50%) translateX(${width / 2}px)`,
        }}
      >
        <p className="overflow-hidden text-ellipsis whitespace-nowrap text-sm text-dark">
          {text}
        </p>
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 border-4 border-solid border-transparent border-b-light" />
      </div>
    </span>
  )
}

export default Tooltip
