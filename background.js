chrome.webNavigation.onCompleted.addListener(function () {
    chrome.tabs.query({currentWindow: true, active: true}, (tabs) => {
        console.log(tabs[0]);
        alert(tabs[0]);
        tabs[0].body.insertAdjacentHTML("beforeend", ' < buttonid = "myBtn" > OpenModal < /button> <div id="myModal" class="modal"> <div class="modal-content"> <span class="close">&times;</span><p>Some text in the Modal..</p></div></div>'
        );
    });
});