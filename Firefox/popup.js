let gearsetData = {}
function updatePopupHtml(data) {
    document.getElementById("raidPieces").append(document.createTextNode(data.raidPieces))
    document.getElementById("tomePieces").append(document.createTextNode(data.tomePieces))
    document.getElementById("upgradePieces").append(document.createTextNode(data.upgradePieces))
    document.getElementById("totalTomes").append(document.createTextNode(data.totalTomes)) 
    document.getElementById("food").append(document.createTextNode(data.food))
    document.getElementById("foodUrl").href = "http://garlandtools.org/db/#item/" + data.foodId
}

function copyToClipboard() {
  document.getElementById("clipboardIcon").className = "glyphicon glyphicon-ok"
  document.getElementById("clipboardIcon").style.color = "#6F0"

  let copyString = ""
  copyString += "Raid - " + document.getElementById("raidPieces").innerText + " \n"
  copyString += "Tome - " + document.getElementById("tomePieces").innerText + " \n"
  copyString += "Upgrade Materials - " + document.getElementById("upgradePieces").innerText + " \n"
  copyString += "Total Tomestones - " + document.getElementById("totalTomes").innerText + " \n"
  copyString += "Food - " + document.getElementById("food").innerText

  navigator.clipboard.writeText(copyString)
}

browser.tabs.query({active: true, currentWindow: true}, function(tabs) {
    browser.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
      document.getElementById("clipboard").addEventListener("click", copyToClipboard)
      updatePopupHtml(response.data)
    });
});