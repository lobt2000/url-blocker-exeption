
// chrome.runtime.onInstalled.addListener(() => {
//   // chrome.webNavigation.onCompleted.addListener(() => {
//   chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
//     // if (tabs[0].url?.startsWith("chrome://")) return undefined;
//     if (tabs[0].active && changeInfo.status === "complete") {
//     chrome.scripting.executeScript({
//       target: { tabId: tabs[0].id! },
//       files: ['./assets/infect.js']
//       //   func: updateBackgroundColor,
//       //   args: [this.color]
//     });
//     // return true
//   });
// })
// });
let urls = ['torent', 'torrent', 'itorrents', 'torrents', 'torents', 'kizi', 'youtube', 'youTube', 'telegram', 'igruha']
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tab.active && changeInfo.status === "complete") {
    console.log(urls.some(res => tab.url?.toLowerCase().includes(res)));

    if (urls.some(res => tab.url?.toLowerCase().includes(res))) {
      chrome.scripting.executeScript({
        target: { tabId: tab.id! },
        files: ['./assets/infect.js']
        //   func: updateBackgroundColor,
        //   args: [this.color]
      });
    }
  }
})