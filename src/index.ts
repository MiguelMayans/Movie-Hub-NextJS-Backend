import app from "./server";
import config from "./config/config";

const PORT = config.app.PORT;

app.listen(config.app.PORT, () => {
  console.log(`The server is running in port: ${PORT}`);
});
