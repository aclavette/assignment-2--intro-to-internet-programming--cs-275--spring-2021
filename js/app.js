window.onload = () => {
    let button1 = document.querySelector("#whiterice");
    let button2 = document.querySelector("#sproutedrice");
    let form = document.querySelector("#form");
    button1.addEventListener(`click`, whiteRice);
    button2.addEventListener(`click`, sproutedRice);
}

function whiteRice() {
    function calculateWR() {
        let rice = parseInt(document.getElementById("form").value, 10);
    	let answer = rice*2;
        document.getElementById("result").innerHTML = "You will need " + answer + " cups of water.";
    }

	let content = document.getElementById("content");
	content.innerHTML =
	"Combine 1 cup of rice with 2 cups of water and 1 Tbsp olive oil. Bring to a boil, then reduce heat to the lowest setting. Cook for about 18 minutes.<br><br>You will need 2 times more water than rice.";

    let form = document.getElementById("form");
	form.style.visibility="visible";

    form.addEventListener(`keyup`, calculateWR);
}

function sproutedRice() {
    function calculateSR() {
        let rice = parseInt(document.getElementById("form").value, 10);
    	let answer = rice*1.6;
        document.getElementById("result").innerHTML = "You will need " + answer + " cups of water.";
    }

    let content = document.getElementById("content");
    content.innerHTML =
    "For slightly al dente rice: Combine 1 1/4 cups of rice with 2 cups of water or broth and 1 Tbsp olive oil. Bring to a boil and stir once to mix. Reduce heat to low, cover with a tight-fitting lid and cook for 25 minutes. Remove from heat and let stand for 5 minutes. Fluff with a fork and serve. <br><br>For softer rice: Increase liquid by 1/2 cup and cook time by 5 minutes.<br><br>You will need 1.6 times more water than rice.";

    let form = document.getElementById("form");
	form.style.visibility="visible";

    form.addEventListener(`keyup`, calculateSR);
}
