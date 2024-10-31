export const onLoadNavMenu = () => {
  var eTitleMenu = document.querySelector(".nav-titlemn");
  eTitleMenu.onclick = function () {
    console.log("클릭 이벤트 잘 탐?");
  };
};
