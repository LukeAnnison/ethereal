
export const badgeStakingOn = () => {

      chrome.browserAction.setBadgeText({text: ' '})

      chrome.browserAction.setBadgeBackgroundColor({ color: 'gold'});
}



export const badgeStakingOff = () => {

      chrome.browserAction.setBadgeText({text: ''})

      
}
