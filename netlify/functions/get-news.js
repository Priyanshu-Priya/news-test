// If using Node v16 or lower
const fetch = require('node-fetch');  

exports.handler = async function(event, context) {
  const apiKey = process.env.NEWS_API_KEY;
  const query = event.queryStringParameters?.q || '';

  // Build URL
  let apiURL = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${apiKey}`;
  if (query) {
    apiURL += `&q=${encodeURIComponent(query)}`;
  }

  try {
    const response = await fetch(apiURL);

    if (!response.ok) {
      const errorData = await response.json(); 
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: `News API error: ${errorData.message}` }),
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      };
    }

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
      body: JSON.stringify({ error: 'Failed to fetch data', details: error.message }),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    };
  }
};
