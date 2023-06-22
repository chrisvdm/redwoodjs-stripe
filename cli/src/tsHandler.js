const fs = require('fs-extra');

(async () => {
    // Does graphql.js exist or is it
    const fileName = './api/tsconfig.json'
    const isTSApp = await fs.existsSync(fileName)
    console.log(isTSApp)
})()