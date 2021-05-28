let changeColor = document.getElementById("Calculate");

// chrome.storage.sync.get("color", ({ color }) => {
//   changeColor.style.backgroundColor = color;
// });

changeColor.addEventListener("click", async () => {
  //let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  var price = document.getElementById("price").value;
  var feeTaker = document.getElementById("feeTaker").value;
  var feeMaker = document.getElementById("feeMaker").value;
  var tag = document.createElement("p");
  // var increase_needed_buy = (fee/100)*price;
  // var target_price_buy = (increase_needed_buy) + parseFloat(price);
  // var target_price = (target_price_buy)/(1-(fee/100));
  //var target_price = calculatePriceNeeded(feeTaker,feeTaker,price);
  var realBuyPriceTaker = ((feeTaker/100)*price)+parseFloat(price);
  var realBuyPriceMaker = ((feeMaker/100)*price)+parseFloat(price);
  //Price needed is how much the price must be with these fees
  var priceNeededTT = realBuyPriceTaker/(1-(feeTaker/100));
  var priceNeededMM = realBuyPriceMaker/(1-(feeMaker/100));
  var priceNeededTM = realBuyPriceTaker/(1-(feeMaker/100));
  var priceNeededMT = realBuyPriceMaker/(1-(feeTaker/100));
  var text = document.createTextNode("You need the price to be above:\n"+
                                    "Taker-Taker: "+ priceNeededTT 
                                    + " \nMaker-Maker: " + priceNeededMM
                                    + " \nTaker-Maker:" + priceNeededTM
                                    + " \nMaker-Taker:" + priceNeededMT);
   tag.appendChild(text);
   var element = document.getElementById("results");
   element.appendChild(tag);
  // chrome.scripting.executeScript({
  //   target: { tabId: tab.id },
  //   function: setPageBackgroundColor,
  // });
});


// The body of this function will be executed as a content script inside the
// current page
function setPageBackgroundColor() {
  chrome.storage.sync.get("color", ({ color }) => {
    document.body.style.backgroundColor = color;
  });
}
