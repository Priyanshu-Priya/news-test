const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const apiKey = process.env.NEWS_API_KEY;
  
  // The 'q' parameter is optional for top-headlines, but we keep it for searching
  const query = event.queryStringParameters.q || ''; 
  
  // Use 'top-headlines' and specify the country 'in' for India
  const apiURL = `https://newsapi.org/v2/top-headlines?country=in&q=${query}&apiKey=${apiKey}`;

  try {
    const response = await fetch(apiURL);

    // This is a good practice for handling API errors
    if (!response.ok) {
      const errorData = await response.json(); 
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: `News API error: ${errorData.message}` })
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
      body: JSON.stringify({ error: 'Failed to fetch data' })
    };
  }
};