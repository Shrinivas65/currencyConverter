const BASE_URL='https://v6.exchangerate-api.com/v6/18f6505e3d982272c8c12c43/latest'
const dropdowns = document.querySelectorAll('.dropdown select');
const fromcurr = document.querySelector('.from select');
const tocurr = document.querySelector('.to select');
const btn = document.querySelector('form button');

for(let select of dropdowns){
    for(currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value =currCode;
       

        if(select.name === "from" && currCode ==="USD"){
            newOption.selected = 'selected';
        }else if(select.name === "to" && currCode ==="INR"){
            newOption.selected = 'selected';
        }

         select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateflag(evt.target);
    })
}

const updateflag=(element)=>{
    let currCode = element.value;
    let countrycode = countryList[currCode];

    let newsrc = `https://flagsapi.com/${countrycode}/flat/64.png`;

    let img = element.parentElement.querySelector("img");
    img.src=newsrc;
}

btn.addEventListener("click",async (evt)=>{
    evt.preventDefault();
    let amount = document.querySelector('.amount input');
    let amtVal = amount.value;
    if(amtVal <1 || amtVal==="" ){
        amount=1;
        amtVal=1;    
    }

    const URL = `${BASE_URL}/${fromcurr.value}`;
    let response = await fetch(URL);
    let data = await response.json();
    //console.log(data.conversion_rates[tocurr.value]);

    let finalAmt = amtVal * data.conversion_rates[tocurr.value];
     const finalTextVal = document.querySelector(".msg");
      finalTextVal.innerText= `${amtVal}${fromcurr.value} = ${finalAmt}${tocurr.value}`;
 });

