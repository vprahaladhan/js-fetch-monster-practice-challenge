const url = "http://localhost:3000/monsters/";
const limit = 50;
let currentPage = 1;
let endOfMonsters = false;

document.addEventListener('DOMContentLoaded', () => {
  fetchMonsters(1);
  
  document.getElementById('monster-form').addEventListener('submit', event => {
    event.preventDefault();
  
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name: document.getElementById('name').value,
        age: parseFloat(document.getElementById('age').value),
        description: document.getElementById('description').value
      })
    }).then(response => {
      document.getElementById('name').value = '';
      document.getElementById('age').value = '';
      document.getElementById('description').value = '';
    });
  });
  
  document.getElementById('prev').addEventListener('click', () => {
    currentPage === 1 && fetchMonsters(--currentPage)
  });
  
  document.getElementById('next').addEventListener('click', () => {
    fetch(`${url}?_limit=${limit}&_page=${currentPage + 1}`)
      .then(response => response.json())
      .then(monsters => monsters.length !== 0 && fetchMonsters(++currentPage)); 
  });
});

const fetchMonsters = page => {
  fetch(`${url}?_limit=${limit}&_page=${page}`)
    .then(response => response.json())
    .then(monsters => {
      const monstersContainer = document.getElementById('monster-container');
     
      if (monstersContainer.innerHTML) {
        monstersContainer.innerHTML = null;
      } 
     
      const monstersList = document.createElement('ul');
      monstersList.style = "display: table-row";

      monsters.forEach(monster => {
        const monsterDetails = document.createElement('li');
        monsterDetails.style = 'list-style-type: none';
        monsterDetails.innerHTML = `<p><h2>${monster.name}</h2></p>
                                    <p><h3>Age: ${monster.age}</h3></p>
                                    <p>Bio: ${monster.description}</p>
                                    <hr />`;
        monstersList.appendChild(monsterDetails);
      });

      monstersContainer.appendChild(monstersList);
    });
  };