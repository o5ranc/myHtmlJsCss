/* 화면 로딩시 이벤트 */
window.onload = function () {
  console.log('window onload 함수!!');
  onLoadNavMenu();
  mappingContentArea();
  testTabClick();
};

/** 메뉴 구성 */
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
          if (subMenus.nodeName === "DIV") {
            // 서브 노드들에도 클릭 이벤트 등록시켜줌
            subMenus.childNodes.forEach((subMenu) => {
              if (subMenu.nodeName === "BUTTON") {
                subMenu.addEventListener(
                  "click",
                  subMenuClick,
                  { passive: false }
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

/** 이벤트 - 서브 메뉴 클릭 이벤트 */
const subMenuClick = (e) => {
  console.log("하위 메뉴 확인 : ", e.target);
  // 서브 메뉴의 특정 속성값을 이용하여 페이지 이동
  window.location.hash = e.target.getAttribute("page-href") || "home";
}

const mappingContentArea = () => {
  const contentArea = document.getElementById("content-area");

  // URL의 해시를 기준으로 페이지를 로드
  async function loadPage() {
    const hash = window.location.hash.substring(1) || "home";
    const pageUrl = `pages/${hash}.html`;

    try {
      const response = await fetch(pageUrl);
      if (!response.ok) throw new Error("Page not found");

      const html = await response.text();
      contentArea.innerHTML = html;
    } catch (error) {
      contentArea.innerHTML = "<h2>Page not found</h2>";
    }
  }

  // 해시 변경 이벤트와 초기 로드를 설정
  window.addEventListener("hashchange", loadPage);
  loadPage();  // 초기 로드
}

// const testTabClick = () => {
//   const tabMenu = document.querySelectorAll(".tab-basic-wrap .tab-buttons .tab-item");
//   console.log(">>>>>>> tabMenu : ", tabMenu);
// }