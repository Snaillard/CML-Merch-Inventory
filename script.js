// validates form input before submiting data
function validateForm(){
    var itemId = document.getElementById("itemId").value;
    var itemName = document.getElementById("itemName").value;
    var stock = document.getElementById("stock").value;
    var price = document.getElementById("price").value;

    if(itemId == ""){
        alert("Item ID is required");
        return false;
    }
    else if(itemId < 1){
        alert("Item ID must be positive number");
        return false;
    }

    if(itemName == ""){
        alert("Item Name is required");
        return false;
    }

    if(stock == ""){
        alert("Stock is required");
        return false;
    }
    else if(stock < 0){
        alert("Stock must not be less than zero");
        return false;
    }

    if(price == ""){
        alert("Price is required");
        return false;
    }
    else if(price < 0){
        alert("Price must not be less than zero");
        return false;
    }

    return true;
}

// function to show data from local storage
function showData(){
    var itemList;
    if(localStorage.getItem("itemList") == null){
        itemList = [];
    }
    else{
        itemList = JSON.parse(localStorage.getItem("itemList"));
    }

    var html = "";

    itemList.forEach(function (element, index){
        html += "<tr>";
        html += "<td>" + element.itemId + "</td>";
        html += "<td>" + element.itemName + "</td>";
        html += "<td>" + element.stock + "</td>";
        html += "<td>" + element.price + "</td>";
        html += 
            '<td><button onclick="deleteData(' + index + ')"class=btn btn-danger">Delete</button><button onclick="updateData(' + index + ')"class=btn btn-warning m-2">Edit</button></td>';
        html += "</tr>";
    });

    document.querySelector("#crudTable tbody").innerHTML = html;
}

// loads all data from local storage when document or page onload
document.onload = showData();

// function to add data to local storage
function AddData(){
    // if form is validated
    if(validateForm() == true){
        var itemId = document.getElementById("itemId").value;
        var itemName = document.getElementById("itemName").value;
        var stock = document.getElementById("stock").value;
        var price = document.getElementById("price").value;

        var itemList;
        if(localStorage.getItem("itemList") == null){
        itemList = [];
        }
        else{
        itemList = JSON.parse(localStorage.getItem("itemList"));
        }

        itemList.push({
            itemId : itemId,
            itemName : itemName,
            stock : stock,
            price : price,
        });

        localStorage.setItem("itemList", JSON.stringify(itemList));
        showData();
        document.getElementById("itemId").value = "";
        document.getElementById("itemName").value = "";
        document.getElementById("stock").value = "";
        document.getElementById("price").value = "";
    }
}

// function to delete data from local storage
function deleteData(index){
    var itemList;
    if(localStorage.getItem("itemList") == null){
        itemList = [];
    }
    else{
        itemList = JSON.parse(localStorage.getItem("itemList"));
    }

    itemList.splice(index, 1);
    localStorage.setItem("itemList", JSON.stringify(itemList));
    showData();
}

//function to update and edit data from local storage
function updateData(index){
    // submit button will hide and update button will show for updating data in local storage
    document.getElementById("Submit").style.display = "none";
    document.getElementById("Update").style.display = "block";

    var itemList;
    if(localStorage.getItem("itemList") == null){
        itemList = [];
    }
    else{
        itemList = JSON.parse(localStorage.getItem("itemList"));
    }

    document.getElementById("itemId").value = itemList[index].itemId;
        document.getElementById("itemName").value = itemList[index].itemName;
        document.getElementById("stock").value = itemList[index].stock;
        document.getElementById("price").value = itemList[index].price;

    document.querySelector("#Update").onclick = function(){
        if(validateForm() == true){
            itemList[index].itemId = document.getElementById("itemId").value;
            itemList[index].itemName = document.getElementById("itemName").value;
            itemList[index].stock = document.getElementById("stock").value;
            itemList[index].price = document.getElementById("price").value;

            localStorage.setItem("itemList", JSON.stringify(itemList));

            showData();

            document.getElementById("itemId").value = "";
            document.getElementById("itemName").value = "";
            document.getElementById("stock").value = "";
            document.getElementById("price").value = "";

            // update button will hide and submit button will show
            document.getElementById("Submit").style.display = "block";
            document.getElementById("Update").style.display = "none";
        }
    }
}