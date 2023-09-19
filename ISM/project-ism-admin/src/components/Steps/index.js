import React, { useRef } from "react"
import classnames from "classnames"
import "./index.scss"
import "./responsive.scss"

const Steps = ({ activeId, steps = [], onStepClick }) => {
  const allowClick = (el) => typeof onStepClick === "function" && !el.disabled
  const scrollRef = useRef()

  React.useEffect(() => {
    if (scrollRef.current) {
      const idx = steps.findIndex((item) => item.id === activeId)
      if (idx === 0) {
        scrollRef.current.scrollLeft = 0
        return
      }
      if (idx === 1) {
        scrollRef.current.scrollLeft = window.innerWidth * 0.6
        return
      }
      if (idx === 2) {
        scrollRef.current.scrollLeft = window.innerWidth * 1.5
        return
      }
    }
  }, [activeId])
  return (
    <div className="steps">
      <div className="steps__header-wrapper" ref={scrollRef}>
        <div className="steps__header flex-center">
          {steps.map((el, idx) => {
            const clickable = allowClick(el)
            return (
              <div
                onClick={() => clickable && onStepClick(el)}
                key={el.id}
                className={classnames({
                  step: true,
                  "cursor-pointer": clickable,
                  "step-active": el.id === activeId
                })}
              >
                {("0" + (idx + 1)).slice(-2)}. &nbsp;
                {el.title}
              </div>
            )
          })}
        </div>
      </div>
      <div className="steps__content">
        {steps.map((el) => (
          <div
            key={el.id}
            className={classnames({
              "d-none": el.id !== activeId
            })}
          >
            {el.content}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Steps
