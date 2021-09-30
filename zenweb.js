let URLC = false;
let pourcentage = 57;
let idUser = null;

LoadID = async () => {
    console.log('url')
    try {
        const url = 'https://api.tisamo.fr/workshop/getid'
        const res = await fetch(url);
        const data = await res.json();
        chrome.storage.sync.set({'idUser': data.data}, function () {
            console.log('test', data.data);
        });
    } catch (e) {
        console.log('toto', e);
    }
}

async function LoadStats(url) {
    return await fetch("https://api.tisamo.fr/workshop/getsite",
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({url: url})
        })
        .then(res => res.json())
        .then(r => r)
        .catch((res) => {
            alert(res);
        })
}


chrome.storage.sync.get(['idUser'], function (items) {
    idUser = items.idUser;
    if (!idUser) {
        LoadID().then(r => r);
    }
});
console.log(idUser)

document.getElementById("btnEnSavoirPlus").addEventListener("click", enSavoirPlus);
document.getElementById("buttonSignaler").addEventListener("click", Signalement);

chrome.tabs.query({currentWindow: true, active: true}, async (tabs) => {
    let URLs = tabs[0].url;
    let URL = URLs.split('/');
    URL = URL[0] + '//' + URL[2];
    const stats = await LoadStats(URL);
    switch (stats.statusCode) {
        case 200:
            if (stats.data.status) {
                message = stats.data.status;
            } else {
                message = "Fuite de données detecté sur " + stats.data.breachName;
            }
            pourcentage = stats.data.score;
            pourcentage = Math.trunc(pourcentage);
            document.getElementById("pour100").innerText = pourcentage + "%";
            break;
        case 402:
            message = stats.data;
            document.getElementById('URLNC').hidden = false;
            break;
    }
    // if (stats.statusCode === 200) {
    //     message = URL + " est conforme."
    // } else if (stats.statusCode === 402) {
    //     message = URL + " est inconnu."
    // }
    document.getElementById("URLC").innerText = message;

});

function enSavoirPlus() {
    document.getElementById("Signaler").hidden = false;
    document.getElementById("btnEnSavoirPlus").hidden = true;
}


function Signalement() {
    chrome.tabs.query({currentWindow: true, active: true}, (tabs) => {
        let URLs = tabs[0].url;
        let URL = URLs.split('/');
        URL = URL[0] + '//' + URL[2];
        console.log(idUser, URL);
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


