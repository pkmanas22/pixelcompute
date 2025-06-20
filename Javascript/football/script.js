// Predefined array of football club objects
const footballClubs = [
  {
    name: 'Real Madrid',
    country: 'Spain',
    trophies: 98,
    league: 'La Liga',
  },
  {
    name: 'Manchester United',
    country: 'England',
    trophies: 66,
    league: 'Premier League',
  },
  {
    name: 'Bayern Munich',
    country: 'Germany',
    trophies: 71,
    league: 'Bundesliga',
  },
  {
    name: 'Liverpool',
    country: 'England',
    trophies: 65,
    league: 'Premier League',
  },
  {
    name: 'ATK Mohun Bagan',
    country: 'India',
    trophies: 6,
    league: 'Indian Super League',
  },
  {
    name: 'Juventus',
    country: 'Italy',
    trophies: 68,
    league: 'Serie A',
  },
  {
    name: 'Paris Saint-Germain',
    country: 'France',
    trophies: 42,
    league: 'Ligue 1',
  },
  {
    name: 'Barcelona',
    country: 'Spain',
    trophies: 95,
    league: 'La Liga',
  },
  {
    name: 'Chelsea',
    country: 'England',
    trophies: 32,
    league: 'Premier League',
  },
  {
    name: 'Mumbai City FC',
    country: 'India',
    trophies: 3,
    league: 'Indian Super League',
  },
  {
    name: 'AC Milan',
    country: 'Italy',
    trophies: 48,
    league: 'Serie A',
  },
  {
    name: 'Inter Milan',
    country: 'Italy',
    trophies: 41,
    league: 'Serie A',
  },
  {
    name: 'Manchester City',
    country: 'England',
    trophies: 29,
    league: 'Premier League',
  },
  {
    name: 'Arsenal',
    country: 'England',
    trophies: 46,
    league: 'Premier League',
  },
  {
    name: 'Ajax',
    country: 'Netherlands',
    trophies: 48,
    league: 'Eredivisie',
  },
];

// Write your code below
const introduction = document.createElement('div');
const footballTime = document.createElement('h1');
footballTime.innerText = 'Football Time';
introduction.append(footballTime);

const detailsSection = document.createElement('div');
detailsSection.classList.add('details-section');

const allClubs = document.createElement('div');
allClubs.id = 'all-clubs-section';

const allClubsHeading = document.createElement('h2');
allClubsHeading.innerText = 'All Clubs';
allClubs.appendChild(allClubsHeading);

const table = document.createElement('table');
allClubs.appendChild(table);
const tableHead = document.createElement('thead');
tableHead.innerHTML = `
  <tr>
    <td>Name</td>
    <td>Country</td>
    <td>League</td>
    <td>Trophies</td>
  </tr>
`;
table.append(tableHead);
const tableBody = document.createElement('tbody');
table.appendChild(tableBody);

footballClubs.forEach((club) => {
  const tableRow = document.createElement('tr');
  tableRow.innerHTML = `
    <td>${club.name}</td>
    <td>${club.country}</td>
    <td>${club.league}</td>
    <td>${club.trophies}</td>
  `;
  tableBody.appendChild(tableRow);
});

const moreTrophy = document.createElement('div');
moreTrophy.id = 'trophy-70-or-more-section';
allClubs.appendChild(moreTrophy);
const moreTrophyHeading = document.createElement('h2');
moreTrophyHeading.innerText = 'Clubs with More Than 70 Championships.';
moreTrophy.appendChild(moreTrophyHeading);

const trophyTable = document.createElement('table');
moreTrophy.appendChild(trophyTable);
const trophyTableHead = document.createElement('thead');
trophyTableHead.innerHTML = `
  <tr>
    <td>Name of the Club</td>
    <td>Trophies</td>
  </tr>
`;
trophyTable.append(trophyTableHead);
const trophyTableBody = document.createElement('tbody');
trophyTable.appendChild(trophyTableBody);

footballClubs
  .filter((club) => club.trophies > 70)
  .forEach((club) => {
    const tableRow = document.createElement('tr');
    tableRow.innerHTML = `
    <td>${club.name}</td>
    <td>${club.trophies}</td>
  `;
    trophyTableBody.appendChild(tableRow);
  });

const premierLeague = document.createElement('div');
premierLeague.id = 'premier-league-section';
allClubs.appendChild(premierLeague);
const premierLeagueHeading = document.createElement('h2');
premierLeagueHeading.innerText = 'Premier League';
premierLeague.appendChild(premierLeagueHeading);

const list = document.createElement('ol');
list.id = 'premier-league';
premierLeague.appendChild(list);

footballClubs
  .filter((club) => club.country === 'England')
  .forEach((club) => {
    const listItem = document.createElement('li');
    listItem.innerText = club.name;
    list.appendChild(listItem);
  });

const trivia = document.createElement('div');
trivia.id = 'trivia-section';
allClubs.appendChild(trivia);
const triviaHeading = document.createElement('h2');
triviaHeading.innerText = 'Trivia Section';
trivia.appendChild(triviaHeading);

const triviaList = document.createElement('ol');
triviaList.id = 'trivia';
trivia.appendChild(triviaList);

footballClubs.forEach((club) => {
  const listItem = document.createElement('li');
  listItem.innerText = `${club.name} from ${club.country} plays in ${club.league} and has won ${club.trophies} championships`;
  triviaList.appendChild(listItem);
});

const totalTrophies = document.createElement('div');
totalTrophies.id = 'total-trophies-section';
allClubs.appendChild(totalTrophies);
const totalTrophiesHeading = document.createElement('h2');
totalTrophiesHeading.innerText = 'Total Trophies';
totalTrophies.appendChild(totalTrophiesHeading);
const totalCnt = footballClubs.reduce((sum, club) => sum + club.trophies, 0);

const totalTrophiesPara = document.createElement('p');
totalTrophiesPara.innerText = `In total, all these listed clubs have won ${totalCnt} number of trophies.`;
totalTrophies.appendChild(totalTrophiesPara);

document.querySelector('.container').appendChild(introduction);
document.querySelector('.container').appendChild(detailsSection);
detailsSection.appendChild(allClubs);
