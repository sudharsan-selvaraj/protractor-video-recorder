exports.config = {
    specs : ["test.js"],
    capabilities : {
        browserName: "chrome",
        chromeOptions : {
            'args': [
                '--load-extension=/Users/sudharsan/Documents/Git/sudharsan/chrome-extentions/protractor-video-recorder/lib/chrome-extension',
                '--user-agent=screen-recorder'
            ],
            prefs: {
                download: {
                    'prompt_for_download': false,
                    'directory_upgrade': true,
                    'default_directory': '/Users/sudharsan/Documents/Git/sudharsan/chrome-extentions/protractor-video-recorder/lib/test'
                }
            }
        }
    }
}