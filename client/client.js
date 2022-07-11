function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
console.log(Notification.permission);
if (Notification.permission !== "granted") {
  Notification.requestPermission((status) => {
    if (status === "granted") {
      navigator.serviceWorker.register("/service-worker.js", {
        scope: "/",
      });
    }
  });
}
if(Notification.permission === 'granted'){
    navigator.serviceWorker.getRegistration().then((req)=> {
        req.showNotification('Hello')
    })
} 

document.querySelector('.btn').addEventListener('click', () => {
    navigator.serviceWorker.ready.then(async (register) => {
        const subscription = await register.pushManager.getSubscription()
        if(subscription === undefined){
            //ask user to register for push
        } else {
            //public key must be convert from URL Base64 to UInt*Array
            register.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: urlBase64ToUint8Array('BPB7bpmLjdplP4XHIKDEFESrpH5MW8pFAC0zin8wQvZOZWY9M2Ni1IVMDa1lLPprHf2tjOavlyV0im577Yo9jWI')})
            .then((sub) => {
                fetch('/subscribe', {
                    method: 'POST',
                    body: JSON.stringify(sub),
                    headers: {
                        'Content-Type': 'Application/json'
                    }
                })
            })
        }
    })
})