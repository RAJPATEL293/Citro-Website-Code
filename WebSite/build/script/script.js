const vehicleBtn = document.getElementById('vehicleBtn');
const publicBtn = document.getElementById('publicBtn');
const houseBtn = document.getElementById('houseBtn');
const cityBtn = document.getElementById('cityBtn');
const countryBtn = document.getElementById('countryBtn');

vehicleBtn.addEventListener('click',showVehicle);
houseBtn.addEventListener('click',showHouse);
cityBtn.addEventListener('click',showCity);
countryBtn.addEventListener('click',showCoutnry);
publicBtn.addEventListener('click',showPublic);
function showVehicle(){
    const Modal = document.getElementById('vehicle');
    Modal.classList.remove('hidden')
    hideCity();
    hideCoutnry();
    hideHouse();
    hidePublic()
}
function hideVehicle(){
    const Modal = document.getElementById('vehicle');
    Modal.classList.add('hidden')
}
function showPublic(){
    const Modal = document.getElementById('publicTransport');
    Modal.classList.remove('hidden')
    hideCity();
    hideCoutnry();
    hideHouse();
    hideVehicle();
}
function hidePublic(){
    const Modal = document.getElementById('publicTransport');
    Modal.classList.add('hidden')
}
function showHouse(){
    const Modal = document.getElementById('house');
    Modal.classList.remove('hidden')
    hideCity();
    hideCoutnry();
    hideVehicle();
    hidePublic()
}
function hideHouse(){
    const Modal = document.getElementById('house');
    Modal.classList.add('hidden')
}
function showCity(){
    const Modal = document.getElementById('city_block');
    Modal.classList.remove('hidden')
    hideVehicle();
    hideCoutnry();
    hideHouse();
    hidePublic()
}
function hideCity(){
    const Modal = document.getElementById('city_block');
    Modal.classList.add('hidden')
}
function showCoutnry(){
    const Modal = document.getElementById('country_block');
    Modal.classList.remove('hidden')
    hideCity();
    hideVehicle();
    hideHouse();
    hidePublic()
}
function hideCoutnry(){
    const Modal = document.getElementById('country_block');
    Modal.classList.add('hidden')
}

function car(){
    let car = document.getElementById('cars').value
    let distance = document.getElementById('averageMileage').value;
    if (distance < 0 || distance == null) {
        document.getElementById('cf').innerHTML = 0 + parseFloat(document.getElementById('cf').innerHTML);
        return; 
    } else {
        distance *= 1.609;
    }
    console.log(car + distance);

    const data = null;

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            console.log(this.responseText);
            responseText = this.responseText.replace('{\"carbonEquivalent\":','').replace('}','')
            document.getElementById('cf').innerHTML = (parseFloat(responseText) + parseFloat(document.getElementById('cf').innerHTML)).toFixed(3);
            treeCalc();
            severity('averageMileage', .575576, .285)
        }
    });


    xhr.open("GET", "https://carbonfootprint1.p.rapidapi.com/CarbonFootprintFromCarTravel?vehicle=" + car + "&distance=" + distance);
    xhr.setRequestHeader("x-rapidapi-host", "carbonfootprint1.p.rapidapi.com");
    xhr.setRequestHeader("x-rapidapi-key", "d60d155353msh47f6c632f9ceb78p1736f0jsn3ffb771bdbb9");

    xhr.send(data);
    hideVehicle()
}
function treeCalc() {
    const cf = parseFloat(document.getElementById('cf').innerHTML);
    const treeWeight = 1000; //average weight of a tree?????
    const treeDMass = treeWeight / 2;
    const treeAge = 20; // average age of a tree?????????
    const treeCarb = treeDMass * 0.475;
    const treeCO2 = treeCarb * 3.67;
    const treeDie = treeCO2 / treeAge;
    const numOfTreesD = cf / treeDie;
    //console.log(treeDie);
    document.getElementById('treeKill').innerHTML = (parseFloat(document.getElementById('treeKill').innerHTML) + parseFloat(numOfTreesD)).toFixed(3);
}
function transit(){
    let transit = document.getElementById('transit').value
    let distance = document.getElementById('tdist').value
    console.log(transit + distance);

    if (distance < 0 || distance == null) {
        document.getElementById('cf').innerHTML = 0 + parseFloat(document.getElementById('cf').innerHTML);
        return; 
    } else {
        distance *= 1.609;
    }

    const data = null;

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            console.log(this.responseText);
            responseText = this.responseText.replace('{\"carbonEquivalent\":','').replace('}','')
            document.getElementById('cf').innerHTML = (parseFloat(responseText) + parseFloat(document.getElementById('cf').innerHTML)).toFixed(3);
            treeCalc();
            severity('tdist', 0.26, 0.037, responseText)
        }
    });

    xhr.open("GET", "https://carbonfootprint1.p.rapidapi.com/CarbonFootprintFromPublicTransit?type=" + transit + "&distance=" + distance);
    xhr.setRequestHeader("x-rapidapi-host", "carbonfootprint1.p.rapidapi.com");
    xhr.setRequestHeader("x-rapidapi-key", "d60d155353msh47f6c632f9ceb78p1736f0jsn3ffb771bdbb9");

    xhr.send(data);
    hidePublic();
}
function energy(){
    let energy = document.getElementById('etype').value
    let distance = document.getElementById('edist').value
    console.log(energy + distance);

    if (distance < 0 || distance == null) {
        document.getElementById('cf').innerHTML = 0 + parseFloat(document.getElementById('cf').innerHTML);
        return; 
    } else {
        distance *= 1.609;
    }

    const data = null;

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            console.log(this.responseText);
            responseText = this.responseText.replace('{\"carbonEquivalent\":','').replace('}','')
            document.getElementById('cf').innerHTML = (parseFloat(responseText) + parseFloat(document.getElementById('cf').innerHTML)).toFixed(3);
            treeCalc();
            severity('edist', 0.061, 0.008, responseText)
        }
    });

    xhr.open("GET", "https://carbonfootprint1.p.rapidapi.com/CleanHydroToCarbonFootprint?consumption=" + distance + "&energy=" + energy);
    xhr.setRequestHeader("x-rapidapi-host", "carbonfootprint1.p.rapidapi.com");
    xhr.setRequestHeader("x-rapidapi-key", "d60d155353msh47f6c632f9ceb78p1736f0jsn3ffb771bdbb9");

    xhr.send(data);
    hideHouse();
}
function food(){
    let food = document.getElementById('ftype').value
    let cal = document.getElementById('cal').value
    cal = parseFloat(cal)
    console.log(food+cal)
    if (food == 'd'){
        food = 2.2;
    }
    else if (food == 'ss'){
        food = 0.6;
    }
    else if (food == 'os'){
        food = 0.8;
    }
    else if (food == 'f'){
        food = 4.6;
    }
    else if (food == 'v'){
        food = 2.8;
    }
    else if (food == 'cb'){
        food = 1.3;
    }
    else if (food == 'd'){
        food = 4.5;
    }
    else if (food == 'cfp'){
        food = 3.8;
    }  
    else if (food == 'bl'){
        food = 14.1;
    }
    kg = (food * cal / 1000000)
    console.log(kg)
    document.getElementById('cf').innerHTML = (parseFloat(kg) + parseFloat(document.getElementById('cf').innerHTML)).toFixed(3);
    treeCalc();
    severity('cal', 0.0141, 0.0006, kg)
    hideCity();

}
function severity(id, maxNum, minNum, responseText) {
    let cf = parseFloat(responseText);
    let d = document.getElementById(id).value
    const max = maxNum*d;
    const min = minNum*d;
    let maxDif = max - cf;
    let minDif = cf - min;
    let mid = (maxDif + minDif)/2;
    let midDif = mid - cf;
    let severity = "";
    if(maxDif < minDif){
        if (maxDif < midDif){
            severity = 'High';
        }
        else {
            severity = 'Medium High';
        }

    }
    else if (minDif < maxDif){
        if (minDif < midDif){
            severity = 'Low';
        }
        else {
            severity = 'Medium Low';
        }
    }
    else {
        severity = 'Medium'
    }

    console.log(severity);
    document.getElementById('severity').innerHTML = severity;
}
function countrybc(){
    hideCoutnry();
}