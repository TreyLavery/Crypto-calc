let calculatePressed = document.getElementById("Calculate");
let saveFees = document.getElementById("SaveFees");

// var tab;
// chrome.tabs.query({active: true, currentWindow: true }, (tabs) => {
//   tab = tabs[0];
//   chrome.scripting.executeScript({
//     target: {tabId: tabs[0].id},
//     function: getOrderPrice,
//   },
//   function(value) {
//     document.getElementById("price").value = value;
//   }
//   )
// });

function getOrderPrice(){
  return document.querySelector("input[data-pup='Trade_LimitOrder_Price']").value;
};

// chrome.scripting.executeScript({
//   target: {tabId: tab.id},
//   function: getOrderPrice,
// },
// (value) => {
//   document.getElementById("price").value = value;
// }
// )


chrome.storage.sync.get(["FeeTaker", "FeeMaker"], function(results){
  document.getElementById("feeTaker").value = results.FeeTaker;
  document.getElementById("feeMaker").value = results.FeeMaker;
});


calculatePressed.addEventListener("click", async () => {
  var price = document.getElementById("price").value;
  var feeTaker = document.getElementById("feeTaker").value;
  var feeMaker = document.getElementById("feeMaker").value;
  let target = document.getElementById("target").value;
  var tag = document.createElement("p");

  var priceTT = calculatePrice(price, feeTaker,feeTaker,target);
  var priceMM = calculatePrice(price,feeMaker,feeMaker,target);
  var priceTM = calculatePrice(price,feeTaker,feeMaker,target);
  var priceMT = calculatePrice(price,feeMaker,feeTaker,target);


  var header = document.createTextNode("You need the price to be above:");
  tag.appendChild(header);
  var tt = document.createTextNode("Taker-Taker: "+ priceTT );
  tag.appendChild(document.createElement('br'));
  tag.appendChild(tt);
  var mm = document.createTextNode(" \nMaker-Maker: " + priceMM);
  tag.appendChild(document.createElement('br'));
  tag.appendChild(mm);
  var tm = document.createTextNode(" \nTaker-Maker: " + priceTM);
  tag.appendChild(document.createElement('br'));
  tag.appendChild(tm);
  var mt = document.createTextNode("Maker-Taker: " + priceMT);
  tag.appendChild(document.createElement('br'));
  tag.appendChild(mt);
  var element = document.getElementById("results");
  element.appendChild(tag);
});


saveFees.addEventListener("click", async () =>{
  var feeTaker = document.getElementById("feeTaker").value;
  var feeMaker = document.getElementById("feeMaker").value;
  chrome.storage.sync.set({"FeeTaker": feeTaker,"FeeMaker": feeMaker});
});

function calculatePrice(price, buyFee, sellFee,target){
  var realValue = ((buyFee)*price)+parseFloat(price);
  realValue += (realValue * target);
  return realValue/(1-(sellFee));
}

