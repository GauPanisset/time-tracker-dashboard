import { XMarkIcon } from '@heroicons/react/24/solid'

const nullValue = ''

type Props = {
  isLoading: boolean
  items: { label: string; value: string }[]
  onChange: (event: React.ChangeEvent<HTMLSelectElement> | null) => void
  placeholder: string
  value?: string
}

const CalendarSelect: React.FunctionComponent<Props> = ({
  isLoading,
  items,
  onChange,
  placeholder,
  value = nullValue,
}) => {
  return (
    <div className="relative flex">
      <div className="relative">
        <select
          disabled={isLoading}
          id="select"
          className={`block	w-full appearance-none overflow-hidden text-ellipsis border border-light/40 bg-dark px-4 py-2 pr-12 font-medium text-light/90 shadow-sm transition-[border-radius] hover:bg-dark/80 hover:text-light disabled:border-light/10 disabled:bg-dark/20 disabled:text-light/40 ${
            value === nullValue ? 'rounded-lg' : 'rounded-l-lg'
          }`}
          onChange={onChange}
          value={value}
        >
          <option disabled={true} value={nullValue}>
            {placeholder}
          </option>
          {items.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
          />
        </svg>
      </div>

      <button
        className={`shrink-0 rounded-r-lg border border-l-0 border-light/40 bg-dark text-light/90 transition-[width,opacity] hover:bg-dark/80 hover:text-light active:bg-dark/90 disabled:border-light/10 disabled:bg-dark/20 disabled:text-light/40 ${
          value !== nullValue ? 'w-10 opacity-100' : 'w-0 border-0 opacity-0'
        }`}
        disabled={isLoading}
        onClick={() => {
          onChange(null)
        }}
        type="button"
      >
        <XMarkIcon
          className={`m-auto h-6 w-6 text-light transition-all ${
            value !== nullValue ? 'opacity-100 delay-200' : 'opacity-0'
          }`}
        />
      </button>
    </div>
  )
}

export default CalendarSelect
