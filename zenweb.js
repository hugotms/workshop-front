function OpenURL() {
    chrome.tabs.create({ url: "https://nicolas.brondin-bernard.com" });
    alert("test");
}
document.getElementById("buttonClose").addEventListener("click", OpenURL);