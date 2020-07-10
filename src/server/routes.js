const userRoutes = (app, fs) => {
    // variables
    const dataPath = "./src/config/initialData.json";

    // READ
    app.get("/init", (req, res) => {
        fs.readFile(dataPath, "utf8", (err, data) => {
            if (err) {
                throw err;
            }

            res.send(JSON.parse(data));
        });
    });
};

module.exports = userRoutes;