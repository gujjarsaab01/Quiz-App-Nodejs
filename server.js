const app = require('./app');
const PORT = process.env.PORT || 5000;

app.listen(PORT, (err) => {
    if (err) {
      console.log("Error occured while running PORT", PORT);
    }
    console.log(`Server is listening on ${PORT}....`);
  });
