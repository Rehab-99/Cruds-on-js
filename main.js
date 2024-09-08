let title=document.getElementById('title');
let price=document.getElementById('price');
let taxes=document.getElementById('taxes');
let ads=document.getElementById('ads');
let discount=document.getElementById('discount');
let total=document.getElementById('total');
let count=document.getElementById('count');
let category=document.getElementById('category');
let submit=document.getElementById('submit');

let mood='create';
let tmp='';

//get total
    function getTotal(){
        if(price.value !=''){
            let result=(+price.value+ +taxes.value+ +ads.value)
                        - +discount.value;
            total.innerHTML=result;
            total.style.background='#0a7f3d';
        }else{
            total.innerHTML='';
            total.style.background='#d72929';
        }
    }

//create product
    let newData;

    if(localStorage.product != null){
        newData=JSON.parse(localStorage.product);
    }else{
        newData=[];
    }

    submit.onclick=function(){
        let newPro={
            title:title.value.toLowerCase(),
            price:price.value,
            taxes:taxes.value,
            ads:ads.value,
            discount:discount.value,
            total:total.innerHTML,
            count:count.value,
            category:category.value.toLowerCase(),
        }
        if(title.value !=''  &&  price.value !=''  &&  category.value !='' && count.value <= 100){
            if(mood ==='create'){
                if(newPro.count > 1){
                    for(let i=0; i < newPro.count ; i++ ){
                        newData.push(newPro);
                    }
                }else{
                    newData.push(newPro);
                }
            }else{
                newData[tmp]=newPro;
                mood='create';
                count.style.display='block';
                submit.innerHTML='create';
            }

            clearInputs()
        }
        
        

        localStorage.setItem('product', JSON.stringify(newData));
        showData()
    }

//clear inputs
    function clearInputs(){
        title.value='';
        price.value='';
        taxes.value=''; 
        ads.value='';
        discount.value='';
        total.innerHTML='';
        count.value='';
        category.value='';
    }

// read or show data
    function showData(){
        getTotal()
        let tbody=document.getElementById('tbody');
        let table='';
        for(let i=0; i < newData.length; i++){
            table +=`
                <tr>
                    <td>${i+1}</td>
                    <td>${newData[i].title}</td>
                    <td>${newData[i].price}</td>
                    <td>${newData[i].taxes}</td>
                    <td>${newData[i].ads}</td>
                    <td>${newData[i].discount}</td>
                    <td>${newData[i].total}</td>
                    <td>${newData[i].category}</td>
                    <td><button onclick="updatePro(${i})" id="update">update</button></td>
                    <td><button onclick="deletePro(${i})" id="delete">delete</button></td>
                </tr>`
        }
            tbody.innerHTML=table;
            let btnDelete=document.getElementById('deleteAll');
            if(newData.length > 0){
                btnDelete.innerHTML=`<button onclick="deleteAll()" id='deleteAllData'>delete All  (${newData.length})</button>`
            }else{
                btnDelete.innerHTML='';
            }
    }
    showData()

// delete product
    function deletePro(i){
        newData.splice(i,1);
        localStorage.product=JSON.stringify(newData);
        showData()
    }

// delete all products
    function deleteAll(){
        localStorage.clear()
        newData.splice(0)
        showData()
    }
    
// update Product
    function updatePro(i){
        title.value=newData[i].title;
        price.value=newData[i].price;
        taxes.value=newData[i].taxes;
        ads.value=newData[i].ads;
        discount.value=newData[i].discount;
        getTotal()
        count.style.display='none';
        category.value=newData[i].category;
        submit.innerHTML='Update';

        mood='update';
        tmp=i;
        scroll({
            top:0,
            behavior:'smooth',
        })

    }

//search for product
    let searchMood='Title';
    let search=document.getElementById('search');
    function getSearchMood(id){
        if(id == 'SearchTitle'){
            searchMood='Title';
        }else{
            searchMood='Category';
        }
            search.placeholder='Search By '+ searchMood;
            search.focus()
            search.value='';
            showData()
    }

    function searchData(value){
        let tbody=document.getElementById('tbody');
        let table='';

        for(let i = 0; i < newData.length ; i++){
            if(searchMood == 'Title'){

                    if(newData[i].title.includes(value.toLowerCase())){
                        table +=`
                            <tr>
                                <td>${i}</td>
                                <td>${newData[i].title}</td>
                                <td>${newData[i].price}</td>
                                <td>${newData[i].taxes}</td>
                                <td>${newData[i].ads}</td>
                                <td>${newData[i].discount}</td>
                                <td>${newData[i].total}</td>
                                <td>${newData[i].category}</td>
                                <td><button onclick="updatePro(${i})" id="update">update</button></td>
                                <td><button onclick="deletePro(${i})" id="delete">delete</button></td>
                            </tr>`
                    }
            }else{
                    if(newData[i].category.includes(value.toLowerCase())){
                        table +=`
                            <tr>
                                <td>${i}</td>
                                <td>${newData[i].title}</td>
                                <td>${newData[i].price}</td>
                                <td>${newData[i].taxes}</td>
                                <td>${newData[i].ads}</td>
                                <td>${newData[i].discount}</td>
                                <td>${newData[i].total}</td>
                                <td>${newData[i].category}</td>
                                <td><button onclick="updatePro(${i})" id="update">update</button></td>
                                <td><button onclick="deletePro(${i})" id="delete">delete</button></td>
                            </tr>`
            }
        }
    }
        tbody.innerHTML=table;

    }