import React from 'react'

const ScreenLoader = () => {
  return (
    <div className='flex h-[100vh] w-[100wh] items-center justify-center'>
        <svg className="custom-svg">
          <g>
            <path d="M 50,100 A 1,1 0 0 1 50,0" />
          </g>
          <g>
            <path d="M 50,75 A 1,1 0 0 0 50,-25" />
          </g>
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#4893FF" stopOpacity="1" />
              <stop offset="100%" stopColor="#0179FE" stopOpacity="1" />
            </linearGradient>
          </defs>
        </svg>

      </div>
  )
}

export default ScreenLoader