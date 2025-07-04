import React, { useId } from 'react'

function Select({
  options = [],
  label,
  className = '',
  ref,
  ...props
}) {
  const id = useId();
  return (
    <div className='w-full'>
      {label && <label htmlFor={id} className=''></label>}
      <select
        className={`px-3 py-2 rounded-xl bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full 
          ${className}`}
        id={id}
        ref={ref}
        {...props}
      >
        {options?.map(option => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Select