let URLC = false;
const Pourcentage = 57;
let idUser = localStorage.getItem('idUser');


document.getElementById("pour100").innerText = Pourcentage + "%";
document.getElementById("btnEnSavoirPlus").addEventListener("click", enSavoirPlus);
document.getElementById("buttonSignaler").addEventListener("click", Signalement);

chrome.tabs.query({currentWindow: true, active: true}, function (tabs) {
    let URLs = tabs[0].url;
    let URL = URLs.split('/');
    if (!idUser) {
        idUser = '1';
        localStorage.setItem('idUser', idUser);
    }

    if (URLC) {
        message = URL[0] + '//' + URL[2] + " est conforme."
    } else if (!URLC) {
        message = URL[0] + '//' + URL[2] + " n\'est pas conforme."
        document.getElementById('URLNC').hidden = false;
    }
    document.getElementById("URLC").innerText = message;
});

function enSavoirPlus() {
    document.getElementById("Signaler").hidden = false;
    document.getElementById("btnEnSavoirPlus").hidden = true;
}

function Signalement() {
    alert("le signalement à été effectué.");
}
