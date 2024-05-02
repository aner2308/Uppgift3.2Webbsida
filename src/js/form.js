"use strict";


let url = "https://mongodb-api-c53n.onrender.com/jobs";

//Länkar till knappen i formulär och lägger på event listener
const submitBtn = document.getElementById("submitBtn");
submitBtn.addEventListener("click", submitForm)

//Funktion för att lägga till data till API/server från formuläret
function submitForm() {
    const form = document.getElementById("workexperienceForm");
    const formData = new FormData(form);

    //Hämta väg till felmeddelande
    const errorMsgEl = document.getElementById("errorMsg");

    //Hämtar värdena från formulärets olika inputfält
    const companyname = formData.get("companyname");
    const jobtitle = formData.get("jobtitle");
    const location = formData.get("location");
    const description = formData.get("description");

    //Felmeddelande om något av de obligatoriska fälten inte är ifyllda
    if (!companyname.trim() || !jobtitle.trim() || !location.trim() || !description.trim()) {
        errorMsgEl.innerText = "*Vänligen fyll i alla obligatoriska fält.";
        return;
    } else {
        errorMsgEl.innerText = ""; // Töm felmeddelandet om alla fält är ifyllda korrekt
    }

    //Använder formulärdatan och kör den i funktionen createWorkexperience
    createWorkexperience(companyname, jobtitle, location, description);

    //rensar formuläret vid lyckat anrop
    form.reset();
}

//Skapa ny jobberfarenhet
async function createWorkexperience(companyname, jobtitle, location, description) {
    let workexperience = {
        companyname: companyname,
        jobtitle: jobtitle,
        location: location,
        description: description
    }

    const response = await fetch(url, {

        method: "POST",
        headers: {
            "content-type": "Application/json"
        },
        body: JSON.stringify(workexperience)
    })

    const data = await response.json();
    console.log(data);

}