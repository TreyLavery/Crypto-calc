let calculatePressed = document.getElementById("Calculate");
let saveFees = document.getElementById("SaveFees");
let load = document.getElementById("Load");

chrome.storage.sync.get(["FeeTaker", "FeeMaker"], function(results){
  document.getElementById("feeTaker").value = results.FeeTaker;
  document.getElementById("feeMaker").value = results.FeeMaker;
});

// chrome.storage.sync.get("color", ({ color }) => {
//   changeColor.style.backgroundColor = color;
// });

calculatePressed.addEventListener("click", async () => {
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
  var header = document.createTextNode("You need the price to be above:");
  tag.appendChild(header);
  var tt = document.createTextNode("Taker-Taker: "+ priceNeededTT );
  tag.appendChild(document.createElement('br'));
  tag.appendChild(tt);
  var mm = document.createTextNode(" \nMaker-Maker: " + priceNeededMM);
  tag.appendChild(document.createElement('br'));
  tag.appendChild(mm);
  var tm = document.createTextNode(" \nTaker-Maker: " + priceNeededTM);
  tag.appendChild(document.createElement('br'));
  tag.appendChild(tm);
  var mt = document.createTextNode("Maker-Taker: " + priceNeededMT);
  tag.appendChild(document.createElement('br'));
  tag.appendChild(mt);
   var element = document.getElementById("results");
   element.appendChild(tag);
  // chrome.scripting.executeScript({
  //   target: { tabId: tab.id },
  //   function: setPageBackgroundColor,
  // });
});

saveFees.addEventListener("click", async () =>{
  var feeTaker = document.getElementById("feeTaker").value;
  var feeMaker = document.getElementById("feeMaker").value;

  chrome.storage.sync.set({"FeeTaker": feeTaker});
  chrome.storage.sync.set({"FeeMaker": feeMaker});
});


// The body of this function will be executed as a content script inside the
// current page
function setPageBackgroundColor() {
  chrome.storage.sync.get("color", ({ color }) => {
    document.body.style.backgroundColor = color;
  });
}
