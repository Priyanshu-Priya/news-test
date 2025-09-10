const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const apiKey = process.env.NEWS_API_KEY;
  const query = event.queryStringParameters?.q || '';

  // Default to top-headlines in India
  let apiURL = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${apiKey}`;

  // If query is provided, append it
  if (query.trim()) {
    apiURL += `&q=${encodeURIComponent(query)}`;
  }

  try {
    const response = await fetch(apiURL);
    const data = await response.json();

    return {
      statusCode: response.ok ? 200 : response.status,
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch data', details: error.message }),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    };
  }
};
