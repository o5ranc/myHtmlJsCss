import { getRootBaseValue } from "/js/common/get-style.js";
import Home from "/js/home.js";
import Tab from "/js/components/exam-tab.js";

const appComp = document.querySelector("#app");

const appRoutses = {
  "/": Home,
  "/tabs": Tab
}

appComp.innerHTML = appRoutses["/"].template;

export const onLoadNavMenu = () => {
  // var eTitleMenu = document.querySelector(".nav-titlemn");
  // eTitleMenu.onclick = function () {
  //   console.log("클릭 이벤트 잘 탐?");
  // };
  var menuItemRoot = document.querySelectorAll(".nav-item");
  console.log("menu 제목 확인 : ", menuItemRoot);

  menuItemRoot.forEach((menuItem) => {
    menuItem.addEventListener(
      "click",
      () => {
        // 메뉴 폴딩 토글
        menuItem.firstElementChild.classList.toggle("m-on");

        // 방법1) 클래스명으로 접근
        // var subMenu = menuItem.querySelectorAll(".btn-navmn");
        // subMenu.forEach((subItem) => {
        //   console.log("subItem.classList. : ", subItem.classList);
        //   subItem.classList.toggle("sm-on");
        // });

        // 방법2) 자식노드중 nodeName 으로 BUTTON 여부 확인 접근
        menuItem.childNodes.forEach((subMenus) => {
          // console.log(
          //   subMenus,
          //   "nodeType : ",
          //   subMenus.nodeType,
          //   "nodeName : ",
          //   subMenus.nodeName,
          //   "nodeValue : ",
          //   subMenus.nodeValue
          // );
          if (subMenus.nodeName === "DIV") {
            subMenus.classList.toggle("sm-on");
            subMenus.style.backgroundColor =
              subMenus.style.backgroundColor === ""
                ? getRootBaseValue("--my-dark-gray")
                : "";

            console.log("하위 메뉴 확인1111 : ", subMenus.childNodes);
            // 서브 노드들에도 클릭 이벤트 등록시켜줌
            subMenus.childNodes.forEach((subMenu) => {
              if (subMenu.nodeName === "BUTTON") {
                subMenu.addEventListener(
                  "click",
                  (e) => {
                    console.log("하위 메뉴 확인222 : ", e.target);
                    // alert(e.target);
                  },
                  { capture: false }
                );
              }
            });
          }
        });
      },
      { capture: false }
    );
  });
};
