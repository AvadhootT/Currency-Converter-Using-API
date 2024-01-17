const base_url = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/"

const dropdown = document.querySelectorAll(".dropdown select")

const img = document.querySelector("img");

const button = document.querySelector("button")

const fromcurr = document.querySelector(".from select");

const tocurr = document.querySelector(".to select");

const msg = document.querySelector(".msgresult")


for(let select of dropdown){
    for (currcode in countryList){
        let newoption = document.createElement("option");
        newoption.innerText = currcode;
        newoption.value = currcode;
        if(select.name === "from" && currcode === "USD"){
            newoption.selected = "selected";
        }else if(select.name === "to" && currcode === "INR"){
            newoption.selected = "selected";
        }
        select.append(newoption);
    }
    select.addEventListener("change",(evt)=>{
        updateflag(evt.target);
    })
}

const updateflag = (element)=>{
    let currcode = element.value;
    // console.log(element);
    let countrycode = countryList[currcode];
    let newsrc = `https://flagsapi.com/${countrycode}/shiny/64.png`
    let img = element.parentElement.querySelector("img");
    img.src = newsrc;
}


const updateExchangeRate = async ()=>{
    let amount = document.querySelector(".amount input")
    let amtvalue = amount.value;
    if(amtvalue === "" || amtvalue <0){
      amtvalue = 1
      amount.value = 1;
    }
    //usd/inr.json
  //   console.log(fromcurr.value,tocurr.value);
    let new_url = `${base_url}/${fromcurr.value.toLowerCase()}/${tocurr.value.toLowerCase()}.json`
    let response = await fetch(new_url);
  //   console.log(response);
    let convertedresponse = await response.json();
  //   console.log(convertedresponse);
    let rate = convertedresponse[tocurr.value.toLowerCase()];
    console.log(rate);
    let finalamt = amtvalue*rate;
    console.log(finalamt);
    msg.innerText = `${amtvalue} ${fromcurr.value} = ${finalamt} ${tocurr.value}`
}

button.addEventListener("click",(evt)=>{
  evt.preventDefault();
  updateExchangeRate();
})


window.addEventListener("load",()=>{
    updateExchangeRate();
})