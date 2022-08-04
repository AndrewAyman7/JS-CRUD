var pname = document.getElementById("pname");
var price = document.getElementById("price");
var categ = document.getElementById("categ");

var mainBtn = document.getElementById("mainBtn");


var products;
if( localStorage.getItem("productsList")==null ){
    products = [];
}
else{
    products = JSON.parse( localStorage.getItem("productsList") );
    displayProducts();
}


function addProduct(){
    
    if( inputsValidation() ){
        if( checkInputs() ){
            var product = {
                name: pname.value,
                price: price.value,
                categ: categ.value
            }

            products.push(product);

            localStorage.setItem("productsList" , JSON.stringify(products))

            console.log(products);

            clearForm();

            displayProducts();
        }
        else{
            alert("please enter all data");
        }
    }
    else{
        alert("invalid inputs");
    }
}






function clearForm(){
    pname.value = "";
    price.value = "";
    categ.value = "";
}



function displayProducts(){
    var cartona = ``;
    for(var i=0; i<products.length; i++){
        cartona+= `
                    <tr>
                        <td> ${i} </td>
                        <td> ${ products[i].name } </td>
                        <td> ${ products[i].price } </td>
                        <td> ${ products[i].categ } </td>
                        <td> <button onclick="update(${i}); window.location.href='#productBox'" class="btn btn-outline-warning">update</button>  </td>
                        <td> <button onclick="deleteProduct(${i});" class="btn btn-outline-danger">delete</button>  </td>
                    </tr> 
                  `
    }
    document.getElementById("dataContainer").innerHTML = cartona;
}


function checkInputs(){
    if(pname.value != ""  && price.value != ""  && categ.value != ""){
        return true;
    }
    else{
        return false;
    }
}


function deleteProduct(index){
    products.splice(index,1);
    localStorage.setItem("productsList" , JSON.stringify(products))
    displayProducts();
}



function searchProduct(term){
    var cartona = ``;
    for(var i=0; i<products.length; i++){
        if(products[i].name.toLowerCase().includes( term.toLowerCase() )){
                cartona+= `
                <tr>
                    <td> ${i} </td>
                    <td> ${ products[i].name } </td>
                    <td> ${ products[i].price } </td>
                    <td> ${ products[i].categ } </td>
                    <td> <button onclick="update(${i}); window.location.href='#productBox'" class="btn btn-outline-warning">update</button>  </td>
                    <td> <button onclick="deleteProduct(${i});" class="btn btn-outline-danger">delete</button>  </td>
                </tr> 
              `
            }
        
        else{
            console.log("none");
            }
    }
    
    document.getElementById("dataContainer").innerHTML = cartona;
    
}



function update(index){
     updateForm(index);
     
     mainBtn.onclick = function(){
             
         products[index].name = pname.value;
         products[index].price = price.value;
         products[index].categ = categ.value;

         mainBtn.innerHTML = "Add Product";
         localStorage.setItem("productsList" , JSON.stringify(products));
         clearForm();
         displayProducts();
         window.location.href="file:///D:/Frontend/part6_CRUD/crud.html";
     }
             
    
}






function updateForm(index){
    pname.value = products[index].name;
    price.value = products[index].price;
    categ.value = products[index].categ;
    mainBtn.innerHTML = "update";
}


function updateProduct(index){
 
    console.log("updateeeeeed");
}





function inputsValidation(){
    var priceRegex = /^[0-9]{1,8}$/;
    
    if( priceRegex.test(price.value) == true ){
        return true;
    }
    else return false;
    
}









