// [참고] https://www.w3schools.com/howto/howto_html_include.asp
const includeHTML = () => {
  var z, i, elmnt, file, xhr, jsfile;
  /*loop through a collection of all HTML elements:*/
  z = document.getElementsByTagName("*");

  /* element 전체를 돌면서 include-html 속성을 가진 .html 파일을 찾음 */
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    file = elmnt.getAttribute("include-html");
    jsfile = elmnt.getAttribute("include-html");

    if (file) {
      xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
          if (this.status == 200) {
            elmnt.innerHTML = this.responseText;
            loadScript(jsfile.replace('.html', '.js'))
          }
          if (this.status == 404) {
            elmnt.innerHTML = "Page not found.";
          }
          /* 한 번 호출된 이후에는 삭제? */
          elmnt.removeAttribute("include-html");
          includeHTML();
        }
      };
      xhr.open("GET", file, true);
      xhr.send();
      return;
    }
  }
  // setTimeout(function () {
  //   callback();
  // }, 0);
};

// javascript 파일 동적 로딩
const loadScript = (src) => {
  const script = document.createElement('script');
  script.src = src;
  script.type = 'module'; // Specify if your JS is a module
  document.head.appendChild(script);
}
