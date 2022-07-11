console.log('Service Worker loaded')

self.addEventListener('install', () => {
    console.log('Service worker installing')
})

self.addEventListener('activate', () => {
  console.log('Activate')
})

self.addEventListener('push', async (event) => {
    if (!(self.Notification && self.Notification.permission === 'granted')) {
        alert('User dont allow to push notification')
        return;
      }
      const data = await event.data.text()
      event.waitUntil(
        self.registration.showNotification("Your content is ready", {
          body: data,
          icon: "https://img.redbull.com/images/c_limit,w_1500,h_1000,f_auto,q_auto/redbullcom/2013/10/05/1331614344109_6/skt-t1-season-3-lol-world-champs",
          actions: [
              {
                  action: "view-content",
                  title: "Yes"
              },
              {
                  action: "go-home",
                  title: "No"
              }
          ]
      })
      )
})

self.addEventListener('notificationclick', (event) => {
  console.log(event)
})