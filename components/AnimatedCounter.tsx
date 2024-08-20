'use client'

import React from 'react'
import CountUp from 'react-countup'

const AnimatedCounter = ({amount}: {amount: number}) => {
  return (
    <>
        <CountUp prefix='$' decimal='.' decimals={2} duration={2} end={amount} />
    </>
  )
}

export default AnimatedCounter