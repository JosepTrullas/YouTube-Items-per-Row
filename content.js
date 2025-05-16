
function insertDropdown() {
  if (location.pathname !== "/" || document.getElementById("itemsPerRowSelect")) return;

  const logoContainer = document.querySelector("ytd-topbar-logo-renderer");
  if (!logoContainer) return;

  const dropdown = document.createElement("select");
  dropdown.id = "itemsPerRowSelect";
  dropdown.style.marginLeft = "16px";
  dropdown.style.background = "#0f0f0f";
  dropdown.style.color = "white";
  dropdown.style.border = "1px solid #555";
  dropdown.style.padding = "2px 6px";
  dropdown.style.borderRadius = "4px";
  dropdown.style.fontSize = "14px";

  for (let i = 1; i <= 10; i++) {
    const option = document.createElement("option");
    option.value = i;
    option.innerText = i;
    dropdown.appendChild(option);
  }

  dropdown.value = localStorage.getItem("itemsPerRow") || "4";
  dropdown.addEventListener("change", () => {
    localStorage.setItem("itemsPerRow", dropdown.value);
    location.reload();
  });

  const parent = logoContainer.parentNode;
  if (parent && !document.getElementById("itemsPerRowSelect")) {
    parent.appendChild(dropdown);
  }
}

function applyCustomLayout() {
  const itemsPerRow = parseInt(localStorage.getItem("itemsPerRow") || "4", 10);
  const style = document.createElement("style");
  style.textContent = `
    ytd-rich-grid-row {
      display: contents !important;
    }
    ytd-rich-grid-renderer #contents {
      display: grid !important;
      grid-template-columns: repeat(auto-fill, minmax(0, 1fr));
      column-gap: 16px;
      row-gap: 24px;
    }
    ytd-rich-grid-renderer {
      padding-inline: 48px !important;
      box-sizing: border-box;
    }
    #contents.ytd-rich-grid-renderer {
      display: grid !important;
      grid-template-columns: repeat(${itemsPerRow}, 1fr) !important;
      column-gap: 16px !important;
      row-gap: 24px !important;
    }
	  ytd-rich-item-renderer {
    width: 100% !important;
	}
  `;
  document.head.appendChild(style);
}

function initialize() {
  const isHomepage = location.pathname === "/";
  if (!isHomepage) return;

  const observer = new MutationObserver(() => {
    insertDropdown();
    applyCustomLayout();
  });

  observer.observe(document.body, { childList: true, subtree: true });
}

initialize();
