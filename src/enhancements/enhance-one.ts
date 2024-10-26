// function getBody() {
//   const table = document.getElementById("js-checklist");
//   return table?.lastElementChild;
// }

// function addNewRow(tBody: Element, label: string, value: number) {
//   const protoRow = tBody?.firstElementChild;
//   const originalTds = protoRow?.children;
//   if (!protoRow || !originalTds) {
//     return;
//   }

//   const newRow = document.createElement("tr");
//   newRow.setAttribute("class", protoRow.className);

//   if (originalTds) {
//     const tdsArray = <any>Array.from(originalTds);
//     for (let originTd of tdsArray) {
//       const newTd = document.createElement("td");
//       newTd.setAttribute("class", originTd.className);

//       const innerElement = originTd?.firstElementChild;

//       if (innerElement?.className.includes("currency-usd")) {
//         // Insert label in previous cell
//         const labelSpan = document.createElement("a");
//         labelSpan.textContent = label;
//         newRow.lastChild?.appendChild(labelSpan);

//         const valueSpan = document.createElement("a");
//         valueSpan.textContent = "$" + value;

//         newTd.appendChild(valueSpan);
//       }

//       newRow.appendChild(newTd);
//     }
//   }
//   tBody?.appendChild(newRow);
// }

// function enhance(low: number, mid: number, high: number) {
//   const tBody = getBody();
//   if (!tBody) {
//     return;
//   }
//   addNewRow(tBody, "Total", 333.56);
// }

// enhance();
