import React from 'react'

const DefaultNoMatch = ({ location }) => (
  <div>
    <p>{location.pathname}</p>
    <p>The route you are looking for was not found.</p>
  </div>
)

export default DefaultNoMatch
