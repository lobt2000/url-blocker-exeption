navigator.serviceWorker.getRegistrations().then((res) => {
  for (let worker of res) {
    console.log(worker)
    if (worker.active.scriptURL.includes('background.ts')) {
      return
    }
  }

  navigator.serviceWorker
    .register(chrome.runtime.getURL('background.ts'))
    .then((registration) => {
      console.log('Service worker success:', registration)
    }).catch((error) => {
      console.log('Error service:', error)
    })
})
