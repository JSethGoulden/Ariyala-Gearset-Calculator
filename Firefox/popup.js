let gearsetData = {}
function updatePopupHtml(data) {
  let gearDiv = document.getElementById("gear")
  applyDataset(gearDiv, data)

  //render raid pieces 
  //if empty, show "None selected"
  let raidDiv = document.createElement('div')
  raidDiv.append(title('Raid'))
  let raidPieces = text(gearDiv.dataset.raidpieces ? gearDiv.dataset.raidpieces : "None selected")
  raidDiv.append(raidPieces)
  gearDiv.append(raidDiv)

  //render books needed
  //if no raid pieces, don't render
  if(gearDiv.dataset.raidpieces) {
    let books = JSON.parse(gearDiv.dataset.books)
    let booksDiv = document.createElement('div')
    booksDiv.className = 'subsection'
    booksDiv.append(text('=>'))
    for(book in books) {
      if(!books[book]) continue
      let img = document.createElement('img')
      setAttributes(img, {'src': 'images/' + book + '_book.png', 'title': book, 'width': 32, 'height': 32})
      booksDiv.append(img)
      booksDiv.append(text(book + ' (' + books[book] + 'x)'))
    }
    gearDiv.append(booksDiv)
  }

  //render tome pieces 
  //if empty, show "None selected"
  let tomeDiv = document.createElement('div')

  tomeDiv.append(title('Tome'))
  let tomePieces = text(gearDiv.dataset.tomepieces ? gearDiv.dataset.tomepieces : "None selected")
  tomeDiv.append(tomePieces)
  gearDiv.append(tomeDiv)

  //render upgrade mats
  //if no tome pieces, don't render
  if(gearDiv.dataset.tomepieces) {
    let upgrades = JSON.parse(gearDiv.dataset.upgradepieces)
    let upgradesDiv = document.createElement('div')
    upgradesDiv.className = 'subsection'
    upgradesDiv.append(text('=>'))
    for(upgrade in upgrades) {
      if(!upgrades[upgrade]) continue
      let img = document.createElement('img')
      setAttributes(img, {'src': 'images/' + upgrade + '.png', 'title': upgrade, 'width': 32, 'height': 32})
      upgradesDiv.append(img)
      upgradesDiv.append(text(upgrade + ' (' + upgrades[upgrade] + 'x)'))
    }
    gearDiv.append(upgradesDiv)
  }


  //render total tomestones
  //if no tome pieces, don't render
  if(gearDiv.dataset.tomepieces) {
    let totalTomesDiv = document.createElement('div')
    totalTomesDiv.className = 'subsection'
    totalTomesDiv.append(text('=>'))
    let tomeImg = document.createElement('img')
    setAttributes(tomeImg, {'src': 'images/tomestone.png','title': 'Tome', 'width': 32,'height': 32})
    totalTomesDiv.append(tomeImg)
    totalTomesDiv.append(text('Tomes (' + gearDiv.dataset.totaltomes + 'x)'))
    gearDiv.append(totalTomesDiv)
  }


  //render food
  //if empty, don't render
  if(gearDiv.dataset.food) {
    let foodDiv = document.createElement('div')
    foodDiv.append(title('Food'))
    let foodA = document.createElement('a')
    foodA.href = 'http://garlandtools.org/db/#item/' + gearDiv.dataset.foodid
    foodA.target = "_blank"
    foodA.append(text(gearDiv.dataset.food))
    foodDiv.append(foodA)
    gearDiv.append(foodDiv)
  }

}

function applyDataset(element, data) {
  for(atr in data) {
    element.setAttribute('data-' + atr, data[atr])
  }
}
function setAttributes(element, attributes) {
  //...
  if(!element || !attributes) return
  for(atr in attributes) {
    element.setAttribute(atr, attributes[atr])
  }
}

function title(str) {
  let span = document.createElement('span')
  span.className = 'title'
  span.append(document.createTextNode(str + ' - '))
  return span
}

function text(str) {
  let span = document.createElement('span')
  span.append(document.createTextNode(str))
  return span
}

function copyToClipboard() {
  document.getElementById("clipboardIcon").className = "glyphicon glyphicon-ok"
  document.getElementById("clipboardIcon").style.color = "#6F0"
  let gearDiv = document.getElementById('gear')

  let bookString = ''
  let books = JSON.parse(gearDiv.dataset.books)
  for(book in books) {
    if(!books[book]) continue
    bookString += book + '(' + books[book] + 'x) '
  }

  let upgradeString = ''
  let upgrades = JSON.parse(gearDiv.dataset.upgradepieces)
  for(upgrade in upgrades) {
    if(!upgrades[upgrade]) continue
    upgradeString += upgrade + '(' + upgrades[upgrade] + 'x) '
  }

  let copyString = ""
  copyString += "Raid - " + (gearDiv.dataset.raidpieces ? gearDiv.dataset.raidpieces : "N/A") + " \n"
  copyString += "Books - " + (bookString ? bookString : "N/A") + "\n"
  copyString += "Tome - " + (gearDiv.dataset.tomepieces ? gearDiv.dataset.tomepieces : "N/A")+ " \n"
  copyString += "Upgrade Materials - " + (upgradeString ? upgradeString : "N/A") + " \n"
  copyString += "Total Tomestones - " + gearDiv.dataset.totaltomes + " \n"
  copyString += "Food - " + (gearDiv.dataset.food ? gearDiv.dataset.food : "N/A")

  navigator.clipboard.writeText(copyString)
}

browser.tabs.query({active: true, currentWindow: true}, function(tabs) {
  browser.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
    document.getElementById("clipboard").addEventListener("click", copyToClipboard)
    updatePopupHtml(response.data)
  });
});