function adjustPage(){
  const divTable = document.getElementById("scrollTableDiv")
  divTable.scrollLeft = 0
  divTable.scrollTop = 0
}

function waitForElm(selector) {
  // Tomado de https://stackoverflow.com/questions/5525071/how-to-wait-until-an-element-exists
  // Mi puto padre.
  return new Promise(resolve => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }

    const observer = new MutationObserver(() => {
      if (document.querySelector(selector)) {
        observer.disconnect();
        resolve(document.querySelector(selector));
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,

    });
  });
}

export{
  adjustPage,
  waitForElm
}