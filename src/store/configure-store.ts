let configureStore;

if (process.env.NODE_ENV === "production") {
    configureStore = require("./configure-store.prod").default;
} else {
    configureStore = require("./configure-store.dev").default;
}

export default configureStore;