function getGearset() {
    //Keys in upgradeMats are upper case in order to exactly match the text of each item category
    let raidPieces = [], tomePieces = [], upgradeMats = {Solvent:0, Twine:0, Polish:0}, tomes = 0, food = '', foodId = 0;
    let slots = [
        {name:'Weapon', upgrade:'Solvent', tomeCost:1000},
        {name:'Head', upgrade:'Twine', tomeCost:495},
        {name:'Body', upgrade:'Twine', tomeCost:825},
        {name:'Hands', upgrade:'Twine', tomeCost:495},
        {name:'Waist', upgrade:'Polish', tomeCost:375},
        {name:'Legs', upgrade:'Twine', tomeCost:825},
        {name:'Feet', upgrade:'Twine', tomeCost:495},   
        {name:'Earrings', upgrade:'Polish', tomeCost:375},
        {name:'Necklace', upgrade:'Polish', tomeCost:375},
        {name:'Bracelet', upgrade:'Polish', tomeCost:375},
        {name:'Ring Left', upgrade:'Polish', tomeCost:375},
        {name:'Ring Right', upgrade:'Polish', tomeCost:375}
    ];
    
    document.querySelectorAll('.itemName.selected').forEach(item => {
        if(item.parentElement.parentElement.querySelector(".slotName").innerText === "Food") {
            //Food is always the last category on Ariyala
            foodId = item.style.backgroundImage.split("/")[item.style.backgroundImage.split("/").length-1].replace(/\D/g,'')
            food = item.querySelector('.floatLeft').innerText
            return;
        }
        let currentSlot = slots.filter(slot => {
            return slot.name === item.parentElement.parentElement.querySelector(".slotName").innerText
        })[0]

        //Items starting with "augmented" are treated as tome gear, while everything else is treated as raid gear.
        //This isn't necessarily true, as it is possible (though extremely unlikely) that other items
        //could be listed in a BiS set. Ultimate sets are an example.
        if(item.querySelector('.floatLeft').innerText.indexOf("Augmented ") !== -1) {
            //tome
            tomePieces.push(currentSlot.name)
            upgradeMats[currentSlot.upgrade] += 1
            tomes += currentSlot.tomeCost;
        }
        else {
            //raid
            raidPieces.push(currentSlot.name)
        }
    });
    
    let upgradeMatList = ''
    for(upgrade in upgradeMats) {
        if(!upgradeMats[upgrade]) continue
        upgradeMatList += upgradeMats[upgrade] + "x " + upgrade + ", "
    }
    
    upgradeMatList = upgradeMatList.trim().slice(0, -1)
    
    let msg = "Raid pieces: " + (raidPieces.join(", ") || "(none selected") + "\r\n"
    msg += "Tome Pieces: " + (tomePieces.join(", ") || "(none selected)") + "\r\n"
    msg += "Upgrade pieces: " + upgradeMatList + "\r\n"
    msg += "Total tomes: " + tomes + "\r\n"
    msg += "Food: " + (food || "(none selected)")
    
    let gearset = {
        raidPieces: (raidPieces.join(", ") || "(none selected"),
        tomePieces: (tomePieces.join(", ") || "(none selected"),
        upgradePieces: upgradeMatList,
        totalTomes: tomes,
        food: (food || "(none selected)"),
        foodId: foodId
    }
    return gearset;
}

window.addEventListener("load", function() {
    //wait for page to populate properly
    initCheckTimer = setInterval(checkFinish, 120)
    function checkFinish() {
        if(document.querySelectorAll(".itemName").length >= 10) {
            clearInterval(initCheckTimer)
            getGearset()
        }
    }
}, false)

browser.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.greeting == "hello")
        sendResponse({data: getGearset()})
});