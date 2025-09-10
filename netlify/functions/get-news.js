const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const apiKey = process.env.NEWS_API_KEY;
  const category = event.queryStringParameters.category || 'general'; // Default category = general
  const apiURL = `https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=${apiKey}`;

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
