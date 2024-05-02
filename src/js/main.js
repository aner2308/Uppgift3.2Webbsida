"use strict";

const url = "https://mongodb-api-c53n.onrender.com/jobs";

//Laddar in data när webbsidan är färdigladdad
document.addEventListener("DOMContentLoaded", () => {
    getData();
});

async function getData() {
    try {
        const response = await fetch(url);
        const data = await response.json();

        const workexperienceContainer = document.getElementById("workexperienceContainer");

        //Loopa igenom datan och skapa article- element för varje jobberfrenhet
        data.forEach(workexperience => {
            const article = document.createElement("article");
            article.dataset._id = workexperience._id; //Ger articlen samma ID som jobberfarenheten
            article.innerHTML = `
            <h2>${workexperience.companyname}</h2>
            <p><strong>Jobbtitel:</strong> ${workexperience.jobtitle}</p>
            <p><strong>Plats:</strong> ${workexperience.location}</p>
            <p><strong>Arbetsbeskrivning:</strong><br>${workexperience.description}</p>
            <button class="deleteBtn">Radera</button>
            `;
            workexperienceContainer.appendChild(article);

            //Lägger till eventListener för delete knappen i articlen
            const deleteBtn = article.querySelector(".deleteBtn");
            deleteBtn.addEventListener("click", () => deleteWorkexperience(workexperience._id));
        });
    } catch (error) {
        console.error("Något gick fel: ", error);
    }
}

async function deleteWorkexperience(_id) {
    try {
        const deleteUrl = `${url}/${_id}`;
        const response = await fetch(deleteUrl, {
            method: "DELETE"
        });

        if (response.ok) {
            // Tar bort articlen
            const articleToDelete = document.querySelector(`article[data-_id="${_id}"]`);
            if (articleToDelete) {
                articleToDelete.remove();
                console.log(`Jobberfarenhet med id ${_id} har raderats`);
            } else {
                console.error(`Kunde inte hitta article med id ${_id} i DOM:en.`);
            }
        } else {
            throw new Error(`Fel vid radering av jobberfarenhet med id ${_id}.`);
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

//Funktion för scroll to top-knappen
//Länkar knappen till nytt element
let myButtonEl = document.getElementById("topBtn");
myButtonEl.addEventListener('click', topFunction)

//Tar fram knappen när man scrollat ner 20px
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    myButtonEl.style.display = "block";
  } else {
    myButtonEl.style.display = "none";
  }
}

//Går till toppen av sidan när användare klickar på knappen
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}