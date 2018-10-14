// **************************************************************************
// ---------> SOME CLARIFICATION <-------------------------

// I have used a library of css animation called "animate.css" the link to that library is -- https://daneden.github.io/animate.css/
// So, there will be some random classes like "animated", "bounceInDown".........

// I have used setInterval to delay the code at sooooo many points in this code. The reason to this is that I want to give full time to the animations so that they can run completely.
// If I would have not added those setInterval functions then the animations would not run completely
// *****************************************************************************


// This variable will be used in the future to check if the timmer is running or not
let running = "";

// =================================
// The code below will suffle all the items of the arrayOfCards
// ===================================
let arrayOfCards = ["fa-diamond", "fa-diamond", "fa-paper-plane-o", "fa-paper-plane-o", "fa-anchor", "fa-anchor", "fa-bolt", "fa-bolt", "fa-cube", "fa-cube", "fa-leaf", "fa-leaf", "fa-bicycle", "fa-bicycle", "fa-bomb", "fa-bomb"];
let length = arrayOfCards.length;

function suffle() {
    for (let i = 1; i <= 16; i++) {
        // The code below will pick a random number from 0 to 15
        let randomIndex = Math.floor(Math.random() * length);

        // This code will save the item of the randomly selected index of the array "arrayOfCards"
        let item = arrayOfCards[randomIndex];

        // This code will delete the item at random index from the arrayOfCards
        arrayOfCards.splice(randomIndex, 1);

        // This code will add the randomly selected item as the last item of the arrayOfCards
        arrayOfCards.push(item);
    }
}

// Calling this function will suffle the items of the arrayOfCards
suffle();
suffle();
// ======================================
// ======================================

// This array will store the elements to match
let matchingArray = [];

// This array will be used to check for the winning condition
let winningArray = [];

// This variable will store the number of moves taken and it's value will be used to display the toal no. of moves
let numOfMoves = 0;

// This code will select all the elements with the class "card"
let card = document.getElementsByClassName("card");

// =====================================================
// This function will distribute each classes of the array "arrayOfCards" to each of the cards, so that they each can have a symbol
// =====================================================
function distribute() {
    for (let i = 0; i <= 15; i++) {
        card[i].classList.add("fa", arrayOfCards[i]);  //Here an additional class "fa" is also being added to the cards because it is the required class of "Font Awesome" to display the symbols
    
        //This code adds event listener to each of the box
        card[i].addEventListener("click", function (event) {
            //This code if running the timmer
            running = 1;
    
            //This code will prevent the user from clicking again
            card[i].style.pointerEvents = "none";
    
            // currentElement = event.target;
            this.style.color = "rgba(66, 66, 66, 1)";
            this.classList.add("animated", "flip");
    
            // This code will run each time if any card is clicked so This code will increment the numOfMoves each time
            numOfMoves += 1;
            document.querySelector(".moveCount").innerText = numOfMoves;
    
            // This code will reduce the stars according to the number of move
            function removeStar() {
                if (numOfMoves === 17) {
                    document.querySelector(".star5").remove();
                } else if (numOfMoves === 25) {
                    document.querySelector(".star4").remove();
                } else if (numOfMoves === 37) {
                    document.querySelector(".star3").remove();
                } else if (numOfMoves === 51) {
                    document.querySelector(".star2").remove();
                }
            }
            removeStar();
    
    
    
            // This code will add clicked class to the current element
            this.classList.add("clicked");
            // This code will push the clicked element to the matching array
            matchingArray.push(this);
            // This code will run after 0.8sec, so that the animation can be completed
            setTimeout(function () {
                matchingFunction();
            }, 1000);
        });
    }
}
//This code will call the distribute function
distribute();

// =================================================
// =================================================



// ===========================================================
// Matching Function
// ===========================================================
function matchingFunction() {
    if (matchingArray.length === 2) {
        // If the classes of both the clicked elements will match then the code below will run
        if (matchingArray[0].className === matchingArray[1].className && matchingArray[0] !== matchingArray[1]) {
            // this code will remove the "animated" and "flip" class from the clicked elements, so that it can be animated again by adding the (animate.css)'s class
            matchingArray[0].classList.remove("flip", "animated");
            matchingArray[1].classList.remove("flip", "animated");

            // This code will animate the matched card again
            matchingArray[0].classList.add("animated", "rubberBand");
            matchingArray[1].classList.add("animated", "rubberBand");

            while (matchingArray.length > 0) {
                matchingArray.pop();
            }

            // This code will push one work to the winningArray
            winningArray.push("Two cards matched");

            // calling winning function
            winningFunction();
        } else {
            // Since the cards are not matched so this code will restor the pointing event to auto
            matchingArray[0].style.pointerEvents = "auto";
            matchingArray[1].style.pointerEvents = "auto";


            // this code will remove the "animated" and "flip" class from the unmatched elements, so that it can be animated again by adding the (animate.css)'s class
            matchingArray[0].classList.remove("clicked", "animated", "flip");
            matchingArray[1].classList.remove("clicked", "animated", "flip");

            // This code will animate the unmatched card again
            matchingArray[0].classList.add("animated", "shake");
            matchingArray[1].classList.add("animated", "shake");

            // This code will hide the card again after one sec so that the animation above can complete it's animation
            setTimeout( function () {
                matchingArray[0].style.color = "rgba(66, 66, 66, 0)";
                matchingArray[1].style.color = "rgba(66, 66, 66, 0)";
            }, 1000);

            // this code will remove the "animated" and "shake" class from the unmatched elements, so that it can be animated again by adding the (animate.css)'s class
            setTimeout(function () {
                matchingArray[0].classList.remove("shake", "animated");
                matchingArray[1].classList.remove("shake", "animated");
            }, 800);

            // This code will remove all the items of the matching array
            setTimeout( function  () {
                while (matchingArray.length > 0) {
                    matchingArray.pop();
                }
            }, 1000);
        }
    }
}
// =========================================================
// =========================================================


// ==========================================
// WINNING FUNCTION
// ==========================================
function winningFunction() {
    if (winningArray.length === 8) {
        // This code will display the modal
        document.querySelector("#winningModal").style.cssText = "display: flex;";
        // This code will display the modal
        document.querySelector("#winningModal").classList.add("animated", "bounceInDown");


        // This code will save the value of the total moves and save it
        let totalMoves = document.querySelector(".moveCount").innerText;
        // This code will put the value of totalMoves to the modal
        document.querySelector(".totalMoves").innerText = totalMoves;

        // This code will get the current timming and will save it to use in later
        let min = document.querySelector("#min").innerText;
        let sec = document.querySelector("#sec").innerText;

        // This code will insert the value of the min and sec in the element below
        document.querySelector("#totalMin").innerText = min;
        document.querySelector("#totalSec").innerText = sec;

        // This code will show the final stars in the winning modal
        let performance = document.querySelector(".performance");
        let totalStars = document.querySelector(".stars").innerHTML;
        performance.insertAdjacentHTML("beforeend", totalStars);

        setTimeout(function () {
            // This code will remove the class "animated" and "bounceInDown" from winningModal
            document.querySelector("#winningModal").classList.remove("animated", "bounceInDown");
        }, 800);

    }
}
// ==============================================
// ==================================================


// =============================
// Reset Buttom
// =============================
let resetButton = document.querySelector(".reset");

function reset () {
    //The value of running = 0 will prevent the timmer to run forward
    running = 0;

    // This code will remove all the items of the matching array
    while (matchingArray.length > 0) {
        matchingArray.pop();
    }
    // This code will remove all the items of the winning array
    while (winningArray.length > 0) {
        winningArray.pop();
    }

    // This code will select all the card elements
    let card = document.getElementsByClassName("card");

    // This code will remove all the classes which are responsible for the animation and will also remove the classes which are responsible for displaying the card symbol
    // I am removing soo many classes here because, this is a reset function, so all the previous classes must be removed first and the required classes will be added later
    for (let i = 0; i < card.length; i++) {
        card[i].classList.remove("animated", "rubberBand", "flip", "shake", "clicked", "fa", "fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb");
        card[i].style.color = "rgba(66, 66, 66, 0)";
        card[i].style.pointerEvents = "auto";
    };

    // This code will reset the numOfMoves to zero
    document.querySelector(".moveCount").innerText = 0;

    // This code will remove the "animated" and "bounceInDown" class from the Id "winningModal"
    document.querySelector("#winningModal").classList.remove("animated", "bounceInDown");

    // This code will set the display style of the winning modal to "none"
    // This code will add the class "animated" and "fadeOut" to the winningModal
    document.querySelector("#winningModal").classList.add("animated", "fadeOut");
    setTimeout(function () {
        document.getElementById("winningModal").style.display = "none";
    }, 900);


    // This code will remove all the stars
    let stars = document.getElementsByClassName("star");
    while (stars.length > 0) {
        let i = 0;
        stars[i].remove();
        i++
    }

    // This code will set the numOfMoves to 0
    numOfMoves = 0;

    // Since the code above removed all the stars, so now we need to add the five stars in the aside element
    for (let i = 0; i < 5; i++) {
        document.querySelector(".stars").insertAdjacentHTML("beforeend", '<li class="fa fa-star star star' + (i+1) + '"></li>');
    }

    //This code will run the suffle function
    suffle();

    //This code will call the distribute function, so that the suffled classes from the "arrayOfCards" can be distributed to each of the cards
    for (let i = 0; i <= 15; i++) {
        card[i].classList.add("fa", arrayOfCards[i]);
    }
}
// ============================================
// ===========================================




// ============================================
// Timmer
// ============================================
// This code select the element with class cardContainer
let cardContainer = document.querySelector(".cardContainer");

// This code will add an click event listener and will run the "ifClicked" function if clicked on the element
cardContainer.addEventListener("click", ifClicked);

// I have made this variable so that if the event lister above runs then the value of this variable will increase by one and then i will use the value of this variable to create a condition to remove the click event listener from the class "cardContainer"
let clickCount = 0;

// This is the listener function which will be called if the event listener is added or removed
function ifClicked() {
    clickCount += 1;
    let s = 1;
    let m = 0;
    // let h = 0;

    setInterval(function () {
        if (running === 1) {
            let min = document.getElementById("min");
            let sec = document.getElementById("sec");

            if (s < 10) {
                sec.innerText = "0" + s;
            } else {
                sec.innerText = s;
            }

            if (m < 10) {
                min.innerText = "0" + m;
            } else {
                min.innerText = m;
            }

            if (s === 59) {
                s = -1;
                m++;
            }

            if (m === 60) {
                m = 0;
                h++
            }

            s++;
        } else {
            s = 0;
            m = 0;
            // h = 0;

            let min = document.getElementById("min");
            let sec = document.getElementById("sec");

            min.innerText = "0" + m;
            sec.innerText = "0" + s;
        }
    }, 1000);
}

// This event listener will run on mouseover and it will run another function which will which will remove the click event listener from the cardContainer and so the timmer will not start again from the starting if the card or any of it's child is clicked again
cardContainer.addEventListener("mouseover", removeFunction);
function removeFunction() {
    if (clickCount === 1) {
        cardContainer.removeEventListener("click", ifClicked);
    }
}
// ===========================================================
// ===========================================================