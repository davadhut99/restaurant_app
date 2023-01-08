
const dishPrice = document.getElementById("dishprice");
const dishName = document.getElementById("dishname");
const tableNumber = document.getElementById("tablenumber");
const addToBill = document.getElementById("addtobill");

const tb1 = document.getElementById('table1');
const tb2 = document.getElementById('table2');
const tb3 = document.getElementById('table3');


const endPoint = '3979ff71df424e47a582010f2e9a8536';
const order = {};
addToBill.addEventListener("click", function (e) {
  e.preventDefault();
  const order = {
    tbNumber: tableNumber.value, //unique
    dPrice: dishPrice.value,
    dName: dishName.value
  };
  //saveToLocalStorege(order);
  addOrderToTable(order);
  console.log(order);
  // Clear fields
  dishName.value = '';
  dishPrice.value = '';
});


function addOrderToTable(order) {
  axios
    .post(
      `https://crudcrud.com/api/${endPoint}/restapp`, order
    )
    .then((response) => {
      //console.log(response);
      showTableWithOrder(response.data);
      //console.log(response);
    })
    .catch((err) => {
      document.body.innerHTML =
        document.body.innerHTML + "<h4> Something went wrong! </h4>";
      console.log(err);
    });
};


window.addEventListener("DOMContentLoaded", () => {
  axios
    .get(
      `https://crudcrud.com/api/${endPoint}/restapp`
    )
    .then((response) => {
      console.log(response);
      for (let i = 0; i < response.data.length; i++) {
        showTableWithOrder(response.data[i]);
      }
    })
    .catch((err) => {
      console.log(err);
    });
});


function showTableWithOrder(ele) {
  // console.log(ele.tbNumber)
  // console.log(tb1.id)
  console.log(ele)
  if (tb1.id == ele.tbNumber) {
    const parentNode = document.getElementById("listoforders1");
    childHTML = `<li id=${ele._id}> ${ele.dPrice} - ${ele.dName} - ${ele.tbNumber}
    <button onclick= "deleteOrder('${ele._id}','${ele.tbNumber}')"> Delete </button></li>`;
    parentNode.innerHTML = parentNode.innerHTML + childHTML;
  }
  else if (tb2.id == ele.tbNumber) {
    const parentNode = document.getElementById("listoforders2");
    childHTML = `<li id=${ele._id}> ${ele.dPrice} - ${ele.dName} - ${ele.tbNumber}
    <button onclick= "deleteOrder('${ele._id}','${ele.tbNumber}')"> Delete </button></li>`;
    parentNode.innerHTML = parentNode.innerHTML + childHTML;

  } else if (tb3.id == ele.tbNumber) {
    const parentNode = document.getElementById("listoforders3");
    childHTML = `<li id=${ele._id}> ${ele.dPrice} - ${ele.dName} - ${ele.tbNumber}
    <button onclick= "deleteOrder('${ele._id}','${ele.tbNumber}')"> Delete </button></li>`;
    parentNode.innerHTML = parentNode.innerHTML + childHTML;

  }
}

function deleteOrder(eleId, tbNumber) {
  // const eleId=ele._id;
  // const eleTbNumber =ele.tbNumber;
  // console.log(eleId , eleTbNumber)
  // console.log(ele)
  axios
    .delete(
      `https://crudcrud.com/api/${endPoint}/restapp/${eleId}`
    )
    .then((response) => {
      console.log(response);
      removeOrderFromScreen(eleId, tbNumber);
    })
    .catch((err) => {
      console.log(err);
    });
}

function removeOrderFromScreen(eleId, tbNumber) {
  console.log(eleId);
  let childNodeToBeDeleted = document.getElementById(eleId);
  if (tb1.id == tbNumber) {
    const parentNode = document.getElementById("listoforders1");
    if (childNodeToBeDeleted) {
      parentNode.removeChild(childNodeToBeDeleted);
    }
  }
  else if (tb2.id == tbNumber) {
    const parentNode = document.getElementById("listoforders2");
    if (childNodeToBeDeleted) {
      parentNode.removeChild(childNodeToBeDeleted);
    }
  } else if (tb3.id == tbNumber) {
    const parentNode = document.getElementById("listoforders3");
    if (childNodeToBeDeleted) {
      parentNode.removeChild(childNodeToBeDeleted);
    }
  }
}
//3979ff71df424e47a582010f2e9a8536
//https://crudcrud.com/api/3979ff71df424e47a582010f2e9a8536