/*
// Get the modal
let popup = document.getElementById("mypopup");


// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    popup.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == popup) {
        popup.style.display = "none";
    }
}
*/

/* boutton evenement*/

document.getElementById("liencorrect").addEventListener("click",checksite);

/*fonction recuperation */

function checksite() {
    fetch("https://api.tisamo.fr/workshop/getsite",
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
        })
        .then((res) => {
            alert(' aucune erreur');
        })
        .catch((res) => {
            alert(res);
        })
}