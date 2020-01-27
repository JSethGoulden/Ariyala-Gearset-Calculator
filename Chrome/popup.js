function updatePopupHtml(data) {
    document.getElementById("raidPieces").append(document.createTextNode(data.raidPieces))
    document.getElementById("tomePieces").append(document.createTextNode(data.tomePieces))
    document.getElementById("upgradePieces").append(document.createTextNode(data.upgradePieces))
    document.getElementById("totalTomes").append(document.createTextNode(data.totalTomes)) 
    document.getElementById("food").append(document.createTextNode(data.food))
    document.getElementById("foodUrl").href = "http://garlandtools.org/db/#item/" + data.foodId
}
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
      updatePopupHtml(response.data);
    });
});