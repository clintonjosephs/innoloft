import React from 'react'

const Label: React.FC<{text: string}> = ({text}) => {
  return (
    <span className="text-xs font-semibold inline-block py-2 px-2 rounded-full text-[#6B7280] bg-zinc-200 last:mr-0 mr-1 max-w-sm">{text}</span>
  )
}

export default Label;