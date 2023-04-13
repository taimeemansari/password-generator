// Password generator js v0.1.0
let state = {
  passwordLength: 8,
  hasNumbers: "",
  hasSymbols: "",
  hasLowerCase: "",
  hasUpperCase: "",
};
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const symbols = ["!", "@", "$", "%", "&"];
const characterCodes = Array.from({ length: 26 }).map((_, i) => i + 97);
const passwordLengthInp = document.querySelector("#passwordRange");
const passwordLengthvalue = document.querySelector("#passwordRangeValue");
const generateBtn = document.querySelector("#generateBtn");
const uppercaseOpt = document.querySelector("#uppercaseOpt");
const passwordOut = document.querySelector("#passwordOut");
const error = document.querySelector("#error");
const passwordCopy = document.querySelector("#passwordCopy");
const passwordCopyText = document.querySelector("#passwordCopyText");
const passError = document.querySelector("#passError");

const lowerCaseCharaters = characterCodes.map((code, i) =>
  String.fromCharCode(code)
);
const upperCaseCharaters = lowerCaseCharaters.map((char) =>
  char.toLocaleUpperCase()
);

passwordLengthInp.addEventListener("change", (event) => {
  passwordLengthvalue.innerHTML = event.target.value;
  state = { ...state, passwordLength: event.target.value };
});

uppercaseOpt.addEventListener("change", (event) => {
  state = { ...state, hasUpperCase: event.target.checked };
});

lowercaseOpt.addEventListener("change", (event) => {
  state = { ...state, hasLowerCase: event.target.checked };
});

specialCharsOpt.addEventListener("change", (event) => {
  state = { ...state, hasSymbols: event.target.checked };
});

numbersOpt.addEventListener("change", (event) => {
  state = { ...state, hasNumbers: event.target.checked };
});

passwordCopy.addEventListener("click", function () {
  navigator.clipboard.writeText(passwordOut.value);
  passwordCopyText.classList.remove("hide");
  setTimeout(() => {
    passwordCopyText.classList.add("hide");
  }, 300);
});

// generate password function
function generatePassword(
  passwordLength,
  hasNumbers,
  hasSymbols,
  hasLowerCase,
  hasUpperCase
) {
  const allChars = [
    ...(hasNumbers ? numbers : []),
    ...(hasSymbols ? symbols : []),
    ...(hasUpperCase ? upperCaseCharaters : []),
    ...(hasLowerCase ? lowerCaseCharaters : []),
  ];
  const finalPassword = [];
  for (let i = 0; i <= passwordLength; i++) {
    const randomIndex = Math.floor(Math.random() * allChars.length);
    finalPassword.push(allChars[randomIndex]);
  }

  return finalPassword.join("");
}

generateBtn.addEventListener("click", function () {
  if (state.passwordLength < 8) {
    passError.classList.remove("hide");
    passwordOut.value = "";
    return;
  }
  if (
    !state.hasNumbers &&
    !state.hasSymbols &&
    !state.hasLowerCase &&
    !state.hasUpperCase
  ) {
    error.classList.remove("hide");
    passwordOut.value = "";
    return;
  }
  error.classList.add("hide");
  passError.classList.add("hide");

  var generatedPassword = generatePassword(
    state.passwordLength,
    state.hasNumbers,
    state.hasSymbols,
    state.hasLowerCase,
    state.hasUpperCase
  );
  passwordOut.value = generatedPassword;
});
