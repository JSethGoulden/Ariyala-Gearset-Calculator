function getGearset() {
    let raidPieces = [], tomePieces = [], upgradeMats = {Solvent:0, Twine:0, Polish:0}, tomes = 0, food = '', foodId = 0;
    let slots = [
        {name:'Weapon', upgrade:'Solvent', tomes:1000},
        {name:'Head', upgrade:'Twine', tomes:495},
        {name:'Body', upgrade:'Twine', tomes:825},
        {name:'Hands', upgrade:'Twine', tomes:495},
        {name:'Waist', upgrade:'Polish', tomes:375},
        {name:'Legs', upgrade:'Twine', tomes:825},
        {name:'Feet', upgrade:'Twine', tomes:495},
        {name:'Earrings', upgrade:'Polish', tomes:375},
        {name:'Necklace', upgrade:'Polish', tomes:375},
        {name:'Bracelet', upgrade:'Polish', tomes:375},
        {name:'Ring Left', upgrade:'Polish', tomes:375},
        {name:'Ring Right', upgrade:'Polish', tomes:375}
    ];
    
    document.querySelectorAll('.itemName.selected').forEach(item => {
        if(item.parentElement.parentElement.querySelector(".slotName").innerText === "Food") {
            //ugliest possible way of getting an item id lol
            foodId = document.querySelectorAll(".itemName.selected")[12].style.backgroundImage.split("/")[document.querySelectorAll(".itemName.selected")[12].style.backgroundImage.split("/").length-1].replace(/\D/g,'')
            food = item.querySelector('.floatLeft').innerText;
            return;
        }
        let currentSlot = slots.filter(slot => {
            return slot.name === item.parentElement.parentElement.querySelector(".slotName").innerText;
        })[0]
        //items starting with "augmented " = tome, otherwise it's raid gear or an item below max ilvl
        if(item.querySelector('.floatLeft').innerText.indexOf("Augmented ") !== -1) {
            //augmented
            tomePieces.push(currentSlot.name);
            upgradeMats[currentSlot.upgrade] += 1;
            tomes += currentSlot.tomes;
        }
        else {
            //raid
            raidPieces.push(currentSlot.name);
        }
    });
    
    let upgradeMatList = '';
    for(upgrade in upgradeMats) {
        if(!upgradeMats[upgrade]) continue;
        upgradeMatList += upgradeMats[upgrade] + "x " + upgrade + ", ";
    }
    
    upgradeMatList = upgradeMatList.trim().slice(0, -1)
    
    let msg = "Raid pieces: " + (raidPieces.join(", ") || "(none selected") + "\r\n";
    msg += "Tome Pieces: " + (tomePieces.join(", ") || "(none selected)") + "\r\n";
    msg += "Upgrade pieces: " + upgradeMatList + "\r\n";
    msg += "Total tomes: " + tomes + "\r\n";
    msg += "Food: " + (food || "(none selected)");
    
    let gearset = {
        raidPieces: (raidPieces.join(", ") || "(none selected"),
        tomePieces: (tomePieces.join(", ") || "(none selected"),
        upgradePieces: upgradeMatList,
        totalTomes: tomes,
        food: (food || "(none selected)"),
        foodId: foodId
    }
    chrome.storage.local.set({gearset:gearset});
}

window.addEventListener("load", function() {
    //wait for page to populate properly
    initCheckTimer = setInterval(checkFinish, 120);
    function checkFinish() {
        if(document.querySelectorAll(".itemName").length >= 10) {
            clearInterval(initCheckTimer);
            getGearset();
        }
    }
}, false)