const submenu = document.querySelectorAll(".submenu, .submenu-link");
const submenuHome = document.querySelectorAll(".home > .submenu, .home > .submenu-link");
const submenuChildren = Array.from(document.querySelector(".navbar").children[0].children);
const submenuBusiness = document.querySelectorAll(".business > .submenu, .business > .submenu-link");
const homeLink = document.querySelector("#home-link");
const homeNavSelector = document.querySelectorAll(".home-nav-child");
const homePanelSelector = document.querySelectorAll(".home-panel-selector");
const businessLink = document.querySelector("#business-link");
const businessNavSelector = document.querySelectorAll(".business-nav-child");
const businessPanelSelector = document.querySelectorAll(".business-panel-selector");
const downloadLink = document.querySelector("#download-link");
const submenuDownload = document.querySelectorAll(".download > .submenu, .download > .submenu-link");
const downloadNavSelector = document.querySelectorAll(".download-nav-child");
const navbar = document.querySelector(".navbar");
const header = document.querySelector(".header");

//                Active panel and navigation bar
const activePanelNavigation = function(navSelector, navPanel=false){
  navSelector.forEach(function(el){
    el.addEventListener("mouseover", function(){
      if(!this.classList.contains("active-nav")){
        navSelector.forEach(function(e){
          e.classList.remove("active-nav");
        });
        this.classList.add("active-nav");
        if(navPanel){
          const panelName = Array.from(this.classList).find(value => /selector$/.test(value)).replace(/-selector/g,'');
          console.log(panelName);
          let panel = document.querySelector(`#${panelName}`);
          console.log(panel);
          navPanel.forEach(e=>e.classList.remove("active-panel"));
          panel.classList.add("active-panel");
        }
      }
    })
  });
};
activePanelNavigation(homeNavSelector,homePanelSelector);
activePanelNavigation(businessNavSelector,businessPanelSelector);
activePanelNavigation(downloadNavSelector);

// Open the navigation bar by click and disable others
const openSub = function(nav, menus){
  menus.forEach(function(e){
    if(e.classList.contains("submenu-link")){
      if(e.classList.contains("open-menu")){
        e.classList.remove("open-menu");
        e.classList.add("closed-menu");
      }
      else{
        e.classList.add("open-menu");
        e.classList.remove("closed-menu");
      };
    };
    if(e.classList.contains("submenu")){
        e.classList.toggle("submenu-active")
        e.classList.toggle("hidden")
    };
  });
  let siblingsClassName = [];
  for (el of submenuChildren){
    if (el.classList[0] !== nav)
    siblingsClassName.push(el.classList[0]);
  };
  for (el of siblingsClassName){
    if(document.querySelector(`.${el}`).children[1]){
      const siblingsChildrenClassName = el;
      const disableSiblingMenu = document.querySelectorAll(`.${siblingsChildrenClassName} > .submenu, .${siblingsChildrenClassName} > .submenu-link`);
      disableSiblingMenu.forEach(function(e){
        if(e.classList.contains("submenu-link") && e.classList.contains("open-menu")){
        e.classList.remove("open-menu");
        e.classList.add("closed-menu");
        }
        if(e.classList.contains("submenu")){
        e.classList.remove("submenu-active");
        e.classList.add("hidden");
      };
    });
  }};
};
//              Open the navigation bar by click for home
homeLink.addEventListener("click", function(e) {
  e.preventDefault();
  openSub("home", submenuHome);
});
//              Open the navigation bar by click for business
businessLink.addEventListener("click", function(e) {
  e.preventDefault();
  openSub("business", submenuBusiness);
});
//              Open the navigation bar by click for download
downloadLink.addEventListener("click", function(e) {
  e.preventDefault();
  openSub("download", submenuDownload);
});
//             Close the navigation bar by hover
navbar.addEventListener("mouseleave", function(e) {
  e.preventDefault();
  submenu.forEach(function(e){
    if(e.classList.contains("open-menu")){
      e.classList.remove("open-menu");
      e.classList.add("closed-menu");
    }
    if(e.classList.contains("submenu-active")){
      e.classList.remove("submenu-active");
      e.classList.add("hidden");
    }
  })
});

window.addEventListener("scroll",function(e){
  let position = window.scrollY;
 if(position > 10) {
  header.classList.add("header-background-active");
 }
 else {
  header.classList.remove("header-background-active");
 }
});

 