console.log('content script working')

// console.log on clicking somewhere on the page
document.addEventListener('click', (e) => {
  console.log('clicked', e.target)
}
)
