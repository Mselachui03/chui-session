const mega = require("megajs");

const auth = {
    email: 'lazck22@gmail.com',
    password: '@Lazack_28',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.246'
};

const upload = (data, name) => {
    return new Promise((resolve, reject) => {
        try {
            if (!auth.email || !auth.password || !auth.userAgent) {
                throw new Error("Missing required authentication fields");
            }

            console.log("Using auth:", auth); // Debugging

            const storage = new mega.Storage(auth); // FIXED here

            storage.on('ready', () => {
                const up = storage.upload({ name: name, allowUploadBuffering: true });
                data.pipe(up);

                storage.on("add", (file) => {
                    file.link((err, url) => {
                        if (err) return reject(err);
                        storage.close(); // Clean up session
                        resolve(url);
                    });
                });
            });

            storage.on('error', (err) => {
                reject(err);
            });

        } catch (err) {
            reject(err);
        }
    });
};

module.exports = { upload };
