// const doc = new jsPDF();

// const downloadList = document.getElementById('download');

// downloadList.addEventListener('click', generatePDF);

// const shoppingList = localStorage.getItem('shoppingList');

// const sortedList = localStorage.getItem('sortedList');

// function generatePDF() {
//   const data = JSON.parse(shoppingList);
//   const dataSorted = JSON.parse(sortedList);
//   console.log(dataSorted);

//   // Set initial position for text
//   let yPosition = 10;

//   // Iterate over the data and add it to the PDF
//   dataSorted.forEach(category => {
//       // Extract the category name and items
//       const categoryName = Object.keys(category)[0];
//       const items = category[categoryName];

//       // Add category name to the PDF
//       doc.setFontSize(16);
//       doc.text(categoryName, 10, yPosition);
//       yPosition += 10;

//       // Add items to the PDF
//       doc.setFontSize(12);
//       items.forEach(item => {
//           doc.text(`- ${item}`, 20, yPosition);
//           yPosition += 10;
//       });

//       // Add some space between categories
//       yPosition += 10;
//   });
  
//   if (sortedList) {
//     doc.text(dataSorted, 10, 10);
//     doc.save("sortedList.pdf");
//     // code to be executed if sortedList exists
//   } else if (shoppingList) {
//     doc.text(data, 10, 10);
//     doc.save("shoppingList.pdf");
//     // code to be executed if sortedList does not exist but shoppingList exists
//   }
// }

///

// if (!listToUse) {
  //   console.error('No valid list to use for generating PDF');
  //   return;
  // }
  // if(listToUse === dataSorted) {
  //   listToUse.forEach(category => {
  //     const categoryName = Object.keys(category)[0];
  //     const items = category[categoryName];
  
  //     doc.setFontSize(16);
  //     doc.text(categoryName, 10, yPosition);
  //     yPosition += 10;
  
  //     doc.setFontSize(12);
  //     items.forEach(item => {
  //       doc.text(`- ${item}`, 20, yPosition);
  //       yPosition += 10;
  //     });
  
  //     yPosition += 10;
  //   });
  // } else {
  //   doc.setFontSize(12);
  //   listToUse.forEach(category => {
  //     const items = category[Object.keys(category)[0]];
  //     items.forEach(item => {
  //       doc.text(`- ${item}`, 20, yPosition);
  //       yPosition += 10;
  //     });
  //   });
  // }

////

const doc = new jsPDF();

const downloadList = document.getElementById('download');

const shoppingList = localStorage.getItem('shoppingList');
const sortedList = localStorage.getItem('sortedList');

const generatePDF = (e) => {
  let data, dataSorted;
  
  try {
    data = shoppingList ? JSON.parse(shoppingList) : null;
    dataSorted = sortedList ? JSON.parse(sortedList) : null;
  } catch (error) {
    console.error('Error parsing JSON from localStorage:', error);
    return;
  }

  let yPosition = 10;

  const listToUse = dataSorted || data;

  function isArrayOfType(arr, type) {
    if (!Array.isArray(arr)) {
      return false;
    }
  
    return arr.every(item => typeof item === type);
  }
  
  function checkArray(arr) {
    if (isArrayOfType(arr, 'string')) {
      let y = 10;
        arr.forEach((item) => {
            doc.text(item, 10, y);
            y += 10;
        });
        doc.save("shopping-list.pdf");

      console.log('The array contains only strings.');
    } else if (isArrayOfType(arr, 'object')) {
      arr.forEach(category => {
      const categoryName = Object.keys(category)[0];
      const items = category[categoryName];

      doc.setFontSize(16);
      doc.text(categoryName, 10, yPosition);
      yPosition += 10;

      doc.setFontSize(12);
      items.forEach(item => {
      doc.text(`- ${item}`, 20, yPosition);
      yPosition += 10;
    });

    yPosition += 10;
    },
    doc.save("sorted-list.pdf")
    );
    console.log('The array contains only objects.');
    } else {
      console.log('The array contains mixed types or unsupported types.');
    }
  }
  checkArray(listToUse);


  // const fileName = listToUse ? "sortedList.pdf" : "shoppingList.pdf";
  // doc.save(fileName);
}

downloadList.addEventListener('click', generatePDF);
