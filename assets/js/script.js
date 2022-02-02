let countSelectors  = 0;
countSelectors = document.querySelectorAll(".parInsert").length;

let rpmValue = 0;
let rcfValue = 0;
let rotorValue = 0;

let rpmCalculated = 0;
let rcfCalculated = 0;
let rotorCalculated = 0;

const GCONSTANT = 1.118; // Gravitational constant

function changeRPMButton() {
    if (document.querySelector('#rpm-button').classList.contains("parAuto")){
        document.querySelector('#rpm-button').classList.remove("parAuto");
        document.querySelector('#rpm-button').classList.add("parInsert");
        document.querySelector('.calculator-parameter-RPM').style.boxShadow='0px 0px 10px red';
        document.querySelector(".calculator-parameter-RPM").innerHTML = '<input type="number" id="submitedRPM" placeholder="Insert"/>';
        document.getElementById('submitedRPM').addEventListener('keyup', getRPM);
    }else{
        document.querySelector('#rpm-button').classList.remove("parInsert");
        document.querySelector(".calculator-parameter-RPM").style.boxShadow='none';
        document.querySelector('#rpm-button').classList.add("parAuto");
        document.querySelector(".calculator-parameter-RPM").textContent="Auto";            
    }

    countSelectors = document.querySelectorAll(".parInsert").length;
    if (countSelectors == 3) {
        document.querySelector('#rpm-button').classList.remove("parInsert");
        document.querySelector('#rpm-button').classList.add("parAuto");
        document.querySelector(".calculator-parameter-RPM").textContent="Auto";
        document.querySelector(".calculator-parameter-RPM").style.boxShadow='none';
        countSelectors = document.querySelectorAll(".parInsert").length;
        alert("Please select only two parameters to insert.")
    }
}

function changeRCFButton() {
    if (document.querySelector('#rcf-button').classList.contains("parAuto")){
        document.querySelector('#rcf-button').classList.remove("parAuto");
        document.querySelector('#rcf-button').classList.add("parInsert");
        document.querySelector(".calculator-parameter-RCF").style.boxShadow='0px 0px 10px red';
        document.querySelector(".calculator-parameter-RCF").innerHTML = '<input type="number" id="submitedRCF" placeholder="Insert" />';
        document.getElementById('submitedRCF').addEventListener('keyup', getRCF);
    }else{
        document.querySelector('#rcf-button').classList.remove("parInsert");
        document.querySelector(".calculator-parameter-RCF").style.boxShadow='none';
        document.querySelector('#rcf-button').classList.add("parAuto");
        document.querySelector(".calculator-parameter-RCF").textContent="Auto";
    }
    countSelectors = document.querySelectorAll(".parInsert").length;
    if (countSelectors == 3) {
        document.querySelector('#rcf-button').classList.remove("parInsert");
        document.querySelector('#rcf-button').classList.add("parAuto")
        document.querySelector(".calculator-parameter-RCF").textContent="Auto";
        countSelectors = document.querySelectorAll(".parInsert").length;
        alert("Please select only two parameters to insert.")
    }
}

function changeRotorButton() {
    if (document.querySelector('#rotor-button').classList.contains("parAuto")){
        document.querySelector('#rotor-button').classList.remove("parAuto");
        document.querySelector('#rotor-button').classList.add("parInsert");
        document.querySelector(".calculator-parameter-Rotor").style.boxShadow='0px 0px 10px red';
        document.querySelector(".calculator-parameter-Rotor").innerHTML = '<input type="number" id="submitedRotor" placeholder="Insert" />';
        document.getElementById('submitedRotor').addEventListener('keyup', getRotor);
    }else{
        document.querySelector('#rotor-button').classList.remove("parInsert");
        document.querySelector(".calculator-parameter-Rotor").style.boxShadow='none';
        document.querySelector('#rotor-button').classList.add("parAuto");
        document.querySelector(".calculator-parameter-Rotor").textContent="Auto";
    }
    countSelectors = document.querySelectorAll(".parInsert").length;
    if (countSelectors == 3) {
        document.querySelector('#rotor-button').classList.remove("parInsert");
        document.querySelector('#rotor-button').classList.add("parAuto")
        document.querySelector(".calculator-parameter-Rotor").style.boxShadow='none';
        document.querySelector(".calculator-parameter-Rotor").textContent="Auto";
        countSelectors = document.querySelectorAll(".parInsert").length;
        alert("Please select only two parameters to insert.")
    }
}

function getRPM() {
    rpmValue = Number(document.getElementById('submitedRPM').value);
}

function getRCF() {
    rcfValue = Number(document.getElementById('submitedRCF').value);
}

function getRotor() {
    rotorValue = Number(document.getElementById('submitedRotor').value);
}


function calculateRPM() {
    getRCF();
    getRotor();
    rpmCalculated = (Math.sqrt(rcfValue/(rotorValue * GCONSTANT)) * 1000);
    document.querySelector(".calculator-parameter-RPM").value = rpmCalculated.toFixed(0);
}

function calculateRCF() {
    getRPM();
    getRotor();
    rcfCalculated = ((Math.pow((rpmValue/1000), 2)) * rotorValue * GCONSTANT);
    document.querySelector(".calculator-parameter-RCF").value = rcfCalculated.toFixed(0);
}

function calculateRotor() {
    getRPM();
    getRCF();
    rotorCalculated = ((rcfValue)/(Math.pow((rpmValue/1000), 2) * GCONSTANT));
    document.querySelector(".calculator-parameter-Rotor").value = rotorCalculated.toFixed(2);
}

function calculate() {
    if (document.querySelector('#rpm-button').classList.contains("parAuto")){
        calculateRPM();
        document.querySelector('.calculator-parameter-RPM').textContent = Math.round(rpmCalculated).toFixed(0);
    }else{
        if(document.querySelector('#rcf-button').classList.contains("parAuto")){
            calculateRCF();
            document.querySelector('.calculator-parameter-RCF').textContent = Math.round(rcfCalculated).toFixed(0);
        }else{
            if(document.querySelector('#rotor-button').classList.contains("parAuto")){
                calculateRotor();
            document.querySelector('.calculator-parameter-Rotor').textContent = rotorCalculated.toFixed(2);
            }
        }
    }
}

document.querySelector('#rpm-button').addEventListener('click', changeRPMButton);
document.querySelector('#rcf-button').addEventListener('click', changeRCFButton);
document.querySelector('#rotor-button').addEventListener('click', changeRotorButton);

document.getElementById('calcButton').addEventListener('click', calculate);