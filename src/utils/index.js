export const onVisibile = (handler) =>
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') handler()
  })
