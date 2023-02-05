import * as settings from "/js/settings.js";

function setSelectedTheme(themeName) {
    $('#theme-select').val(themeName);
}

function getSelectedTheme() {
    return $('#theme-select').val();
}

function saveTheme() {
    settings.saveSettings({'theme': getSelectedTheme()});
}

function reloadWikiTabs() {
    chrome.tabs.query({
        url: [
            "http://*.wikipedia.org/*",
            "https://*.wikipedia.org/*"
        ]
    }).then((tabs) => {
        console.log(tabs);
        tabs.forEach(tab => {
            chrome.tabs.reload(tab.id),
            {
                bypassCache: true
            }
        })
    })
}

function setup() {
    settings.getSyncSettings().then(values => {
        setSelectedTheme(values['theme'])
    })
    $(document).ready(() => {
        $('#theme-select').on('change', () => {
            saveTheme();
            reloadWikiTabs();
        })
    })
}

setup()