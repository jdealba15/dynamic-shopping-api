const doc = new jsPDF();

const downloadList = document.getElementById('download');

const shoppingList = localStorage.getItem('shoppingList');
const sortedList = localStorage.getItem('sortedList');

const generatePDF = (e) => {
  e.preventDefault();
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
}

downloadList.addEventListener('click', generatePDF);