const fetch = require('node-fetch');

const main = async () => {
    try {
        // Fetch Stripe openAPI spec
        const openAPIBlob = await fetch('https://raw.githubusercontent.com/stripe/openapi/master/openapi/spec3.json');
        const openAPI = JSON.parse(await openAPIBlob.text());

        // Retrieve schema information
        const openAPISchema = openAPI.components.schemas

        // Specify active (used) Stripe Objects
        // TODO: Empty array leads to all objects being processed
        const activeObjects = ["checkout.session", "subscription"]

        // Create new array of openapi schema objects
        let activeObjectsOpenAPI = {}
        activeObjects.forEach(obj => {
            activeObjectsOpenAPI[obj] = openAPISchema[obj]
        });
        console.log(activeObjectsOpenAPI)

  } catch (err) {
    console.log('fetch error', err);
  }
}

main()