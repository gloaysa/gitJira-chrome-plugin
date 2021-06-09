import React from 'react';

function Foreground() {
  console.log('hola que tal')
  return (
  // @ts-ignore
    <div style={styles.main}>
      <h1>Chrome Ext - Foreground</h1>
    </div>
  )
}

const styles = {
  main: {
    fontSize: '80px',
    pointerEvents: 'none'
  }
}

export default Foreground;
