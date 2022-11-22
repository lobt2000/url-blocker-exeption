var div = document.createElement("div");
document.body.appendChild(div);
// div.innerText = "test123";
var h1 = document.createElement('h1');
div.appendChild(h1);
div.style.width = "100%";
div.style.height = "100%";
div.style.display = "flex";
div.style.alignItems = "center";
div.style.position = "fixed";
div.style.zIndex = 10000000000000000000;
div.style.top = 0;
div.style.left = 0;
div.style.background = "wheat";
div.style.justifyContent = "center";
div.style.flexFlow = "column nowrap";


h1.innerText = 'Write the code';
h1.style.color = "black";

var passContent = document.createElement('input');
div.appendChild(passContent);

passContent.type = "password";
passContent.style.borderRadius = "10px";
passContent.style.paddingLeft = "5px";
passContent.style.textAlign = "center";
passContent.style.backgroundColor = "white";
passContent.style.color = "black";
passContent.style.marginTop = "10px";
passContent.style.height = "30px";
passContent.style.fontSize = "16px";

var button = document.createElement('button');
div.appendChild(button);

button.style.width = "100px";
button.style.height = "40px";
button.style.borderRadius = "10px";
button.style.backgroundColor = "green";
button.style.border = "1px solid green";
button.innerText = 'Enter';
button.style.marginTop = "10px";
button.style.color = "white";


button.addEventListener('click', function () {
  console.log(passContent.value);
  if (passContent.value.trim() == 'Ko01ly|6') {
    div.style.display = "none"
  }
})

