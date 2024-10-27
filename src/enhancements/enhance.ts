// type OnOpenCallback = (...args: any[]) => unknown;

// const collectData = () => {
//   document.querySelectorAll()
//}

// function getBody() {
//   console.log("enhance.ts", 8, "D");
//   const table = document.getElementById("js-checklist");
//   return table?.lastElementChild;
// }

function enhanceCallback(low: number, mid: number, hight: number) {
  console.log("enhance.ts", 60, low, mid, hight);

  const table = document.getElementById("js-checklist");
  const tBody = table?.lastElementChild;
  if (!tBody) {
    return;
  }

  // DRY
  function addNewRow(tBody: Element, label: string, value: number) {
    const protoRow = tBody?.firstElementChild?.nextElementSibling;
    const originalTds = protoRow?.children;
    if (!protoRow || !originalTds) {
      return;
    }

    const newRow = document.createElement("tr");
    newRow.setAttribute("class", protoRow.className);

    if (originalTds) {
      const arratTds = Array.from(originalTds);
      for (let originTd of arratTds) {
        const newTd = document.createElement("td");
        newTd.classList.add("enchanted");

        const innerElement = originTd?.firstElementChild;

        if (innerElement?.className.includes("currency-usd")) {
          // Insert label in previous cell
          const lastCell = newRow.lastElementChild;
          const labelSpan = document.createElement("a");
          labelSpan.textContent = label;
          lastCell?.appendChild(labelSpan);
          lastCell?.classList.add(
            "enchanted-" + label.toLowerCase().split(" ").join("-")
          );

          const valueA = document.createElement("a");
          valueA?.classList.add("currency-usd");
          valueA?.classList.add(
            "enchanted-value-" + label.toLowerCase().split(" ").join("-")
          );
          valueA.textContent = "$" + value;

          newTd.appendChild(valueA);
        }

        newRow.appendChild(newTd);
      }
    }
    tBody?.appendChild(newRow);
  }

  // Colect data
  let totalAll = 0;
  let totalLow = 0;
  let totalMid = 0;
  let totalHight = 0;
  const prices = document.querySelectorAll("td:not(.enchanted) a.currency-usd");
  let regex = RegExp("\\d+.\\d\\d");
  prices.forEach((el) => {
    const priceText = regex.exec(el.innerHTML);
    if (priceText) {
      const price = Number(regex.exec(priceText[0]));
      totalAll += price;

      el.parentElement?.classList.remove("enchanted-low");
      el.parentElement?.classList.remove("enchanted-mid");
      el.parentElement?.classList.remove("enchanted-hight");

      if (price <= low) {
        totalLow += price;
      } else if (price <= mid) {
        totalMid += price;
        el.parentElement?.classList.add("enchanted-low");
      } else if (price <= hight) {
        totalHight += price;
        el.parentElement?.classList.add("enchanted-mid");
      } else {
        el.parentElement?.classList.add("enchanted-hight");
      }
    }
  });

  const roundedHight = Math.round(totalHight * 100) / 100;
  const roundedMid = Math.round(totalMid * 100) / 100;
  const roundedLow = Math.round(totalLow * 100) / 100;
  const roundedAll = Math.round(totalAll * 100) / 100;

  if (document.querySelector("td.enchanted-total-hight")) {
    let elHight = document.querySelector("a.enchanted-value-total-hight");
    if (elHight) {
      elHight.textContent = String(roundedHight);
    }
    let elMid = document.querySelector("a.enchanted-value-total-mid");
    if (elMid) {
      elMid.textContent = String(roundedMid);
    }
    let elLow = document.querySelector("a.enchanted-value-total-low");
    if (elLow) {
      elLow.textContent = String(roundedLow);
    }
    let elAll = document.querySelector("a.enchanted-value-total-all");
    if (elAll) {
      elAll.textContent = String(roundedAll);
    }
  } else {
    addNewRow(tBody, "Total Hight", roundedHight);
    addNewRow(tBody, "Total Mid", roundedMid);
    addNewRow(tBody, "Total Low", roundedLow);
    addNewRow(tBody, "Total All", roundedAll);
  }
}

const enhance = (
  tabId: undefined | number,
  low: number,
  mid: number,
  hight: number
) => {
  tabId &&
    chrome.scripting.executeScript({
      target: { tabId },
      func: enhanceCallback,
      args: [low, mid, hight],
    });
};
export { enhance };
