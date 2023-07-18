"use strict";
const userInput = document.getElementById("alias");
const playBtn = document.querySelector(".play--btn");
const popUserName = document.querySelector(".usersay");
const popCon = document.getElementById("pop--con");
const dashCon = document.getElementById("dash--con");
const popBtn = document.querySelector(".pop--btn");
const main = document.getElementById("main");
const avatar = document.querySelector(".avatar");
const sliderCon = document.querySelector(".slider--con");
const slideCon = Array.from(sliderCon.children);
const path = location;
const nxtBtn = document.querySelector(".nxt--btn");
const prvBtn = document.querySelector(".prv--btn");
const scoreValue = document.querySelector(".score--value");
let userName;

playBtn.addEventListener("click", showModal);

function showModal(e, lastValue) {
  let value = userInput.value;
  userName = value;
  popUserName.textContent = `${userName}😍`;
  userName = userName.split(" ");

  let saved = [];
  let abbr = userName.map((item, i, arr) => {
    saved.push(item[0].toUpperCase());
  });
  avatar.textContent = `${saved.join("")}`;
  if (!value) {
    userInput.placeholder = "Kindly enter your names";
    e.preventDefault();
  }
  let result = value
    ? (popCon.style.display = "block")
    : (popCon.hidden = true);
  return result;
}
popBtn.addEventListener("click", showDashboard);

function showDashboard(e) {
  popCon.style.display = "none";
  main.hidden = true;
  dashCon.hidden = !dashCon.hidden;
  path.hash = dashCon.getAttribute("id");
}
/*  dashboard integration with javascript  start*/
let currentSlide = 0;
function slideMove(slide) {
  slideCon.forEach((item, index, arr) => {
    item.style.transform = `translateX(${100 * (index - slide)}%)`;
  });
}
slideMove(0);

nxtBtn.addEventListener("click", nextInteration);
prvBtn.addEventListener("click", prevInteration);
// let btnSubmit = document.createElement("button")
// btnSubmit.className = "submit--btn"
// btnSubmit.innerHTML = submit
function nextInteration(e) {
  // if (currentSlide === slideCon.length - 2) {
  //   nxtBtn.innerHTML = "submit";
  // }
  if (currentSlide === slideCon.length - 1) {
    nxtBtn.innerHTML = "submit";
    return;
  } else {
    currentSlide++;
  }
  slideMove(currentSlide);
}
// nextInteration();
function prevInteration(e) {
  if (currentSlide === 0) {
    return;
  } else {
    currentSlide--;
    nxtBtn.innerHTML = "next";
  }
  slideMove(currentSlide);
}
/*  dashboard integration with javascript  end*/

/* implmentation of the questions START */
const inputs = document.querySelectorAll(".ans--input");
const label = document.querySelectorAll(".ans--input + label");

const ansCon = document.querySelectorAll(".ans--con");

function ansQuestion() {
  let mark = 10;
  let wrong = 0;
  let i = 1;
  let correctAns;
  inputs.forEach((item, index, arr) => {
    correctAns = [];
    item.addEventListener("click", (e) => {
      let total, finalRes;
      if (item.dataset.wrong) {
        index = i * wrong;
        correctAns.push(index);
        console.log(correctAns);
        total = correctAns.reduce((accum, currentV) => accum + currentV, 0);
      }
      if (item.dataset.answer) {
        index = i * mark;
        correctAns.push(index);
        console.log(correctAns);
        total = correctAns.reduce((accum, currentV) => accum + currentV, 0);
      }
      // scoreValue.textContent = total + " " + "marks";
      nxtBtn.addEventListener("click", (e) => {
        item.disabled = true;
        if (e.target.innerHTML === "submit") {
          if (item.dataset.wrong) {
            item.parentElement.style.background = "hsla(0,60%, 30%)";
          } else if (item.dataset.answer) {
            item.parentElement.style.background = "hsla(100,30%, 70%)";
          }
          scoreValue.textContent = total + " " + "marks";
          document.querySelector(".lv--1").style.background = "green";
        }
      });
    });
  });
}
ansQuestion();
/* implmentation of the questions END*/
/* Reset implementation  start*/
const resetBtn = document.querySelector(".reset--game > button ");
resetBtn.addEventListener("click", (e) => {
  main.hidden = true;
  path.reload();
  path.hash = dashCon.getAttribute("id");
});
/* Reset implementation  end*/
/* home implementation  start*/
const homeLink = document.querySelector(".home--link");
homeLink.addEventListener("click", (e) => {
  e.preventDefault();
  alert("You are about to leave the page! all current work will be lost.");
  main.hidden = false;
  dashCon.hidden = 1;
  path.hash = main.getAttribute("id");
});
/* home implementation  end*/
// console.log(path);
