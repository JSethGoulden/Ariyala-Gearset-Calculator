const getGearset = () => {
    //Keys in upgradeMats are upper case in order to exactly match the text of each item category
    let raidPieces = [], tomePieces = [], upgradeMats = { Solvent: 0, Twine: 0, Polish: 0 }, tomes = 0, food = '', foodId = 0;
    let books = { v4: 0, v3: 0, v2: 0, v1: 0 };

    let slots = [
        { name: 'Weapon', upgrade: 'Solvent', tomeCost: 1000, book: "v4", bookCost: 8 },
        { name: 'Head', upgrade: 'Twine', tomeCost: 495, book: "v2", bookCost: 6 },
        { name: 'Body', upgrade: 'Twine', tomeCost: 825, book: "v4", bookCost: 8 },
        { name: 'Hands', upgrade: 'Twine', tomeCost: 495, book: "v2", bookCost: 6 },
        { name: 'Waist', upgrade: 'Polish', tomeCost: 375, book: "v1", bookCost: 6 },
        { name: 'Legs', upgrade: 'Twine', tomeCost: 825, book: "v3", bookCost: 8 },
        { name: 'Feet', upgrade: 'Twine', tomeCost: 495, book: "v2", bookCost: 6 },
        { name: 'Earrings', upgrade: 'Polish', tomeCost: 375, book: "v1", bookCost: 4 },
        { name: 'Necklace', upgrade: 'Polish', tomeCost: 375, book: "v1", bookCost: 4 },
        { name: 'Bracelet', upgrade: 'Polish', tomeCost: 375, book: "v1", bookCost: 4 },
        { name: 'Ring', upgrade: 'Polish', tomeCost: 375, book: "v1", bookCost: 4 },
    ];

    document.querySelectorAll('.itemName.selected').forEach(item => {
        if (item.parentElement.parentElement.querySelector(".slotName").innerText === "Food") {
            //Food is always the last category on Ariyala
            foodId = item.style.backgroundImage.split("/")[item.style.backgroundImage.split("/").length - 1].replace(/\D/g, '')
            food = item.querySelector('.floatLeft').innerText
            return;
        }
        let currentSlot = slots.filter(slot => {
            return slot.name === item.parentElement.parentElement.querySelector(".slotName").innerText.split(' ')[0]
        })[0]

        //Items starting with "augmented" are treated as tome gear, while everything else is treated as raid gear.
        //This isn't necessarily true, as it is possible (though extremely unlikely) that other items
        //could be listed in a BiS set. Ultimate sets are an example.
        if (item.querySelector('.floatLeft').innerText.indexOf("Augmented ") !== -1) {
            //tome
            tomePieces.push(currentSlot.name)
            upgradeMats[currentSlot.upgrade] += 1
            tomes += currentSlot.tomeCost;
        }
        else {
            //raid
            raidPieces.push(currentSlot.name)
            books[currentSlot.book] += currentSlot.bookCost
        }
    });

    let gearset = {
        raidPieces: (raidPieces.join(", ") || ''),
        books: JSON.stringify(books),
        tomePieces: (tomePieces.join(", ") || ''),
        upgradePieces: JSON.stringify(upgradeMats),
        totalTomes: tomes,
        food: (food || ''),
        foodId: foodId
    }
    return gearset;
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.greeting == "hello")
        sendResponse({ data: getGearset() })
})
