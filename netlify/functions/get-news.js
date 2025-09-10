const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const apiKey = process.env.NEWS_API_KEY;
  
  // The 'top-headlines' endpoint doesn't use a 'q' parameter in the same way.
  // We specify the country instead.
  // The 'q' parameter is optional for top-headlines.
  const query = event.queryStringParameters.q || ''; 
  
  // Use 'top-headlines' and specify the country 'in' for India
  const apiURL = `https://newsapi.org/v2/top-headlines?country=in&q=${query}&apiKey=${apiKey}`;

  try {
    const response = await fetch(apiURL);
    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch data' })
    };
  }
};