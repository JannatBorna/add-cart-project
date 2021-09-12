//spinner
document.getElementById('spinner').style.display = 'none';

/// error message
document.getElementById('error-message').style.display = 'none';

const bookSearch = () => {
    //spinner
    document.getElementById('spinner').style.display = 'block'; 
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    

if(searchText === ''){
     document.getElementById("error-message").innerHTML =
      "<p class='text-center p-3 bg-white'><b>Please enter a book name...</b></p>";
     //spinner 
      document.getElementById('spinner').style.display = 'none';;
      document.getElementById('search-result').innerHTML=''; 
      document.getElementById('search-details').innerHTML=''; 
}

else{

const url= `https://openlibrary.org/search.json?q=${searchText}`
    fetch(url)
    .then(response => response.json())
    .then(data => displaySearchBook(data.docs))
     .catch(error => displayError(error))
    }

/// error message
   document.getElementById('error-message').style.display = 'block'; 
    
//// data clean
    searchField.value =''; 

}

// error message
    const displayError = error => {
       document.getElementById('error-message').style.display = 'block';  
    }

    const displaySearchBook = docs => {
    
//spinner
    document.getElementById('spinner').style.display = 'none';

//error message
    document.getElementById('error-message').style.display= 'none';
   
    const searchResult = document.getElementById('search-result');
//clean data
    searchResult.innerHTML = '';
    docs.forEach(doc =>{
    const div = document.createElement('div');
    div.classList.add('col')
    div.innerHTML=`
          <div class="card" onclick="loadSearchDetails(${doc.start})">
                <img src="https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg" class="card-img-top" alt="...">
                <div class="card-body">
                    <h2 class="card-title fs-5 fw-bolder">Title: ${doc.title}</h2>
                    <h3><span class:"fs-5 fw-bolder">Author:</span> ${doc.author_name}</h3>
                    <h3>Publisher: ${doc.publisher}</h3>
                    <h4 class="card-text">First publish: ${doc.first_publish_year}</h4>
                    
                </div>
            </div>
            
          
 ` 
     searchResult.appendChild(div) 
    })   
};    
 

/// details card
const loadSearchDetails = nameAuthor => {
    const url = `https://openlibrary.org/search.json?q=${nameAuthor}`
    fetch(url)
    .then(response => response.json())
    .then(data => displayDetail(data.docs[0]))
    
} 

const displayDetail = docs => {
   
    const docsDetali = document.getElementById('search-details')
    const div = document.createElement('div');
    docsDetali.innerHTML = ''; // clean data
    div.classList.add('card');
    div.innerHTML =`
             <img src="https://covers.openlibrary.org/b/id/${docs.cover_i}-M.jpg" class="card-img-top" alt="...">
             <div class="card-body">
             <h3 class="card-title fs-5 fw-bolder">Title: ${docs.title}</h3>
             <h4>Author: ${docs.author_name}</h4>
             <h5>Publisher: ${docs.publisher}</h5>
             <h5 class="card-text">First publish: ${docs.first_publish_year}</h5>
             <p class="card-text">Count: ${docs.edition_count}</p>
             </div>
             
            `    
     
    docsDetali.appendChild(div);

};   
    

        
        