chrome.storage.local.get(['gearset'], result => {
    document.getElementById("raidPieces").innerHTML = result.gearset.raidPieces
    document.getElementById("tomePieces").innerHTML = result.gearset.tomePieces
    document.getElementById("upgradePieces").innerHTML = result.gearset.upgradePieces
    document.getElementById("totalTomes").innerHTML = result.gearset.totalTomes
    document.getElementById("food").innerHTML = result.gearset.food
    document.getElementById("foodUrl").href = "http://garlandtools.org/db/#item/" + result.gearset.foodId
})
