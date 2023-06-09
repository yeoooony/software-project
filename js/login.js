const mainContainer = document.querySelector(".main-container");
const loginContainer = document.querySelector(".login-container");
const loginInput = document.querySelector("#GgCustomLogin");
const logoutBtn = document.querySelector(".logout");
const greeting = document.querySelector("#greeting");

const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "username";
let googleUser; // 구글 사용자 정보를 담을 전역 변수

function saveUsername(username) {
  localStorage.setItem(USERNAME_KEY, username);
}

function logoutSubmit() {
  const auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    googleUser = null; // 전역 변수 초기화
    localStorage.removeItem(USERNAME_KEY);
    greeting.textContent = "";
    mainContainer.classList.add(HIDDEN_CLASSNAME);
    loginContainer.classList.remove(HIDDEN_CLASSNAME);
    logoutBtn.removeEventListener("click", logoutSubmit);
  });
}

function onLoginSubmit(event) {
  event.preventDefault();
  loginContainer.classList.add(HIDDEN_CLASSNAME);
  const username = loginInput.value;
  saveUsername(username);
  paintGreetings(username);
}

function paintGreetings(username) {
  greeting.textContent = `반가워요, ${username}님`;
  loginContainer.classList.add(HIDDEN_CLASSNAME);
  mainContainer.classList.remove(HIDDEN_CLASSNAME);
  loginInput.value = "";
  logoutBtn.addEventListener("click", logoutSubmit);
}

const savedUsername = localStorage.getItem(USERNAME_KEY);

if (savedUsername !== null) {
  mainContainer.classList.remove(HIDDEN_CLASSNAME);
  loginContainer.classList.add(HIDDEN_CLASSNAME);
  paintGreetings(savedUsername);
} else {
  mainContainer.classList.add(HIDDEN_CLASSNAME);
  loginContainer.classList.remove(HIDDEN_CLASSNAME);
}

// Google Sign-In API 초기화
function initGoogleSignIn() {
  gapi.load("auth2", function () {
    gapi.auth2.init({
      client_id: "609205729604-avrf6kdk4sss8k38j209m2f41a2f2g3s.apps.googleusercontent.com", // 자신의 클라이언트 ID로 변경해야 합니다.
    }).then(function () {
      renderGoogleLoginButton(); // 로그인 버튼 렌더링 이후에 호출될 수 있도록 변경
    }).catch(function (error) {
      console.error("Google Sign-In API 초기화 실패:", error);
    });
    console.log("initGoogleSignIn 함수 호출됨");
  });
}

// 구글 로그인 버튼을 생성합니다.
function renderGoogleLoginButton() {
  gapi.signin2.render("GgCustomLogin", {
    scope: "profile email",
    width: 200,
    height: 40,
    longtitle: true,
    theme: "dark",
    onsuccess: onSignIn,
    onfailure: onSignInFailure,
  });
}

// 구글 로그인 성공 시 실행되는 함수
function onSignIn(user) {
  googleUser = user; // 전역 변수에 구글 사용자 정보 저장
  const profile = user.getBasicProfile();
  const username = profile.getName();
  saveUsername(username);
  paintGreetings(username);
}

// 구글 로그인 실패 시 실행되는 함수
function onSignInFailure(error) {
  console.error("Google Sign-In failed:", error);
}

// 스크립트 로드 완료 시 Google Sign-In 초기화 함수 호출
window.onload = function () {
  initGoogleSignIn();
};
