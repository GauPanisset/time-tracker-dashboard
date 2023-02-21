type Props = { value: number; onChange: (sprint: number) => void }

/**
 * Component displaying the sprint to display and two button to increase and decrease this number.
 */
const SprintPicker: React.FunctionComponent<Props> = ({ value, onChange }) => {
  return (
    <div className="flex flex-col items-center rounded-xl border border-light/40 bg-mid/10 shadow-lg">
      <div className="flex h-14 w-full items-center justify-center rounded-t-xl border-light/40 bg-mid px-2">
        <p className="text-3xl font-bold text-dark">Sprint</p>
      </div>
      <div className="flex w-full items-center justify-between py-4 px-2">
        <button
          className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-light/20"
          onClick={() => {
            onChange(value - 1)
          }}
        >
          <div className="h-3 w-3 translate-x-1/4 rotate-45 border-l-2 border-b-2" />
        </button>
        <div className="text-6xl font-bold">{value}</div>
        <button
          className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-light/20"
          onClick={() => {
            onChange(value + 1)
          }}
        >
          <div className="h-3 w-3 -translate-x-1/4 rotate-45 border-r-2 border-t-2" />
        </button>
      </div>
    </div>
  )
}
export default SprintPicker
