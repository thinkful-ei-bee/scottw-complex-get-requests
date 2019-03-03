//API key format: &api_key=INSERT-API-KEY-HERE

//[ Base URL: api.nps.gov/api/v1 ]

//https://api.nps.gov/api/v1/parks?stateCode=oh%2Cma%2Cil&limit=50&api_key=apiKey

'use strict';

const apiKey = '7XUzAnhslCmvbTZ13Z3R560psqZ5SQx85fdIvrHp';
const baseUrl = 'https://api.nps.gov/api/v1/parks?';

function formatUrl(){
  const rawStates = $('#js-states-to-search').val().replace(/\s+/g,'').split(',');
  const formattedStates = rawStates.join('%2C');
  const maxResults = $('#js-max-results').val() - 1;
  return `${baseUrl}api_key=${apiKey}&stateCode=${formattedStates}&limit=${maxResults}`;
}


function displayResults(responseJson) {
  console.log(responseJson);
  $('#results-list').empty();
  for (let i=0; i< responseJson.data.length; i++) {
    $('#results-list').append(
      `<li>
          <h3>${responseJson.data[i].fullName}</h3>
          <p>${responseJson.data[i].description}</p>
          <p>${responseJson.data[i].url}</p>
        </li>`
    );
  }
  $('#results').removeClass('hidden');
}

function getParks() {
  fetch(formatUrl())
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function handleForm() {
  $('form').submit(event => {
    event.preventDefault();
    getParks();
  });
}

$(handleForm);