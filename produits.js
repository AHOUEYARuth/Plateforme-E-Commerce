let tabInLocalStorage = localStorage.getItem('productList')
if(!tabInLocalStorage) localStorage.setItem('productList', JSON.stringify([]))

const PRODUCT = {
    productList: JSON.parse(tabInLocalStorage),
    submitForm: ()=>{
        const form = document.getElementById('filed')
        if(form){
            form.addEventListener('submit', e=>{
                e.preventDefault()
                let nameField = form.querySelector('input#name').value
                let priceR = form.querySelector('input#price-r').value
                let priceP = form.querySelector('input#price-p').value
                if(nameField == "" ||  priceR == "" || priceP == "" ){
                    let msg = document.getElementById('msg')
                    msg.innerHTML = "Aucun produit enrégistré"
                    msg.style.display = "block" 
                }else{
                    const productObject = {
                        name:nameField,
                        price:priceR,
                        prix: priceP,
                    }
                    PRODUCT.productList.push(productObject)
                    localStorage.setItem('productList', JSON.stringify(PRODUCT.productList))
                    // window.open("http://127.0.0.1:5501/dashboard.html", '_blank')
                    window.location.href = 'http://127.0.0.1:5501/dashboard.html'
                    //location.reload();
                }

            })
            
        }
    },

    displayProductList: ()=>{
        const bodyTag = document.querySelector('tbody')
        if(bodyTag){
            let productItem = ``
            if(PRODUCT.productList.length>0){
                PRODUCT.productList.forEach((item, index) => {
                    productItem += `
                        <tr>
                            <td>${index + 1}</td>
                            <td>${item.name}</td>
                            <td>${item.price}</td>
                            <td>${item.prix}</td>
                            <td><button onclick="PRODUCT.deleteProduct(${index})">Supprimer</button></td>
                        </tr>
                    `
                })
            }else{
                productItem = `
                    <tr>
                        <td colspan=5 style='text-align:center;'>Aucune information disponible.</td>
                    </tr>
                `
    
            }
            bodyTag.innerHTML = productItem
        }
    },

    deleteProduct: (index) => {
        PRODUCT.productList.splice(index, 1);
        localStorage.setItem('productList', JSON.stringify(PRODUCT.productList));
        PRODUCT.displayProductList();
    },
}

const url = window.location
if(url.pathname==='/ajoutProduit.html'){
    PRODUCT.submitForm();
}if(url.pathname==='/dashboard.html'){
    PRODUCT.displayProductList()
}