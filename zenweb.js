let URLC = false;
const Pourcentage = 57;
let idUser = null;

LoadData = async () => {
    try {
        const url = 'https://api.tisamo.fr/workshop/getid'
        const res = await fetch(url);
        const data = await res.json();
        chrome.storage.sync.set({'idUser': data.data}, function () {});
    } catch (e) {
        console.log(e);
    }
}


chrome.storage.sync.get(['idUser'], function (items) {
    idUser = items.idUser;
    if (!items) {
        LoadData().then(r => r);
    }
});
console.log(idUser)

document.getElementById("pour100").innerText = Pourcentage + "%";
document.getElementById("btnEnSavoirPlus").addEventListener("click", enSavoirPlus);
document.getElementById("buttonSignaler").addEventListener("click", Signalement);

chrome.tabs.query({currentWindow: true, active: true}, (tabs) => {
    console.log('query: ' + idUser);
    let URLs = tabs[0].url;
    let URL = URLs.split('/');
    URL = URL[0] + '//' + URL[2];
    if (URLC) {
        message = URL + " est conforme."
    } else if (!URLC) {
        message = URL + " n\'est pas conforme."
        document.getElementById('URLNC').hidden = false;
    }
    document.getElementById("URLC").innerText = message;

});

function enSavoirPlus() {
    document.getElementById("Signaler").hidden = false;
    document.getElementById("btnEnSavoirPlus").hidden = true;
    chrome.storage.sync.get(['idUser'], function (items) {
        console.log(items);
    });
}


function Signalement() {
    chrome.tabs.query({currentWindow: true, active: true}, (tabs) => {
        let URLs = tabs[0].url;
        let URL = URLs.split('/');
        URL = URL[0] + '//' + URL[2];
        fetch("https://api.tisamo.fr/workshop/report",
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({id: idUser, url: URL})
            })
            .then((res) => {
                alert('Signalement effectué.');
            })
            .catch((res) => {
                alert(res);
            })
    })
}


