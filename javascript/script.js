// $('.search-button').on('click', function(){
//     $.ajax({
//         url: 'http://www.omdbapi.com/?apikey=56c72864&s=' + $('.input-keyword').val(),
//         success: s =>{
//             const movies = s.Search;
//             let cards = '';
//             movies.forEach(m => {
//                 cards += show(m);
//             });
//             $('.movie-container').html(cards);
    
//             // ketika tombol di klik
//             $('.modal-detail-button').on('click', function(){
//                 $.ajax({
//                     url: 'http://www.omdbapi.com/?apikey=56c72864&i=' + $(this).data('imdbid'),
//                     success: m => {
//                         const movieDetail = showMovie(m);
//                         $('.modal-body').html(movieDetail);
//                     },
//                     error: e =>{
//                         console.log(e.responseText);
//                     }
//                 })
//             });
//         },
//         error: e =>{
//             console.log(e.responseText);
//         }
//     });

// })


// fetch
// const searchBtn = document.querySelector('.search-button'); 
// searchBtn.addEventListener('click', function(){
//     const inputKeyword = document.querySelector('.input-keyword');
//     fetch(`http://www.omdbapi.com/?apikey=56c72864&s=${inputKeyword.value}`).then(response => response.json()).then(response => {
//         const movies = response.Search;
//         let cards = '';
//         movies.forEach(m => {
//             cards += show(m);
//         });
//         const mc = document.querySelector('.movie-container');
//         mc.innerHTML = cards;

//         // ketika tombol di klik
//         const modalTombol = document.querySelectorAll('.modal-detail-button');
//         modalTombol.forEach(btn => {
//             btn.addEventListener('click', function(){
//                 const imdbid = this.dataset.imdbid;
//                 fetch(`http://www.omdbapi.com/?apikey=56c72864&i=${imdbid}`).then(response => response.json()).then(response => {
//                     const movieDetail = showMovie(response);
//                     const modalBody = document.querySelector('.modal-body');
//                     modalBody.innerHTML = movieDetail;
//                 }).catch(error => console.log(error.error()));
//             });
//         });
//     }).catch(error => console.log(error.error()));
// });

// search
const searchBtn = document.querySelector('.search-button');
searchBtn.addEventListener('click', async function(){
    try{
        const inputKeyword = document.querySelector('.input-keyword');
        const movies = await getMovies(inputKeyword.value);
        update(movies);
    } catch(error){
        alert(error);
    }
});

function getMovies(keyword){
    return fetch(`http://www.omdbapi.com/?apikey=56c72864&s=${keyword}`).then((x) => {
        if(!x.ok){
            throw new Error(x.statusText);
        }
        return x.json();
    }).then(x =>{
        if(x.Response === "False"){
            throw new Error(x.Error);
        }
        return x.Search;
    });
}

function update(movies){
    let cards = '';
    movies.forEach(m => {
        cards += show(m);
    });
    const mc = document.querySelector('.movie-container');
    mc.innerHTML = cards;
}
// akhir search

// detail
// event binding
document.addEventListener('click', async function(e){
    try{
        if(e.target.classList.contains('modal-detail-button')){
            const imdbid = e.target.dataset.imdbid;
            const movieDetail = await getMoviesDetail(imdbid);
            updateDetail(movieDetail);
        }
    }catch(error){
        alert(error);
    }
});

function getMoviesDetail(imdbid){
    return fetch(`http://www.omdbapi.com/?apikey=56c72864&i=${imdbid}`).then(response =>{
        return response.json();
    }).then(response => {
        if(response.Response === "False"){
            throw new Error(response.Error);
        }
        return response;
    });
}

function updateDetail(m){
    const movieDetail = showMovie(m);
    const modalBody = document.querySelector('.modal-body');
    modalBody.innerHTML = movieDetail;
}
// akhir detail

function show(m){
    return `<div class="col-md-4 my-5">
                <div class="card">
                    <img src="${m.Poster}" class="card-img-top">
                    <div class="card-body">
                        <h5 class="card-title">${m.Title}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
                        <a href="#" class="btn btn-primary modal-detail-button" data-toggle="modal" data-target="#detailMovies" data-imdbid = "${m.imdbID}">Show Details</a>
                    </div>
                </div>
            </div>`;
}

function showMovie(m){
    return ` <div class="container-fluid">
                <div class="row">
                    <div class="col-md-3">
                        <img src="${m.Poster}" class="img-fluid">
                    </div>
                    <div class="col-md">
                        <ul class="list-group">
                            <li class="list-group-item">
                                <h4>${m.Title}(${m.Year})</h4>
                            </li>
                            <li class="list-group-item"><strong>Director : </strong>${m.Director}</li>
                            <li class="list-group-item"><strong>Actors : </strong>${m.Actors}</li>
                            <li class="list-group-item"><strong>Writer : </strong>${m.Writer}</li>
                            <li class="list-group-item"><strong>Plot : </strong><br>${m.Plot}</li>
                        </ul>
                    </div>
                </div>
            </div>`;
}