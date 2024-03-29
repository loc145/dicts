const dictOxford = document.querySelector('.js-oxford');
const dictLongman = document.querySelector('.js-longman');
const dictCambridge = document.querySelector('.js-cambridge');
const dictTracau = document.querySelector('.js-tracau');
const dictGgNews = document.querySelector('.js-gg-news');

const select1 = document.querySelector('.js-select-1');
const select2 = document.querySelector('.js-select-2');
const select3 = document.querySelector('.js-select-3');
const select4 = document.querySelector('.js-select-4');
const select5 = document.querySelector('.js-select-5');


const bounce = document.querySelector(".js-bounce");
const bounceInput = document.querySelector(".js-bounce__input");
const input = document.querySelector(".js-input");
const search = document.querySelector('.js-search');
const switching = document.querySelector('.js-switch');

const iframeOxford = document.querySelector('.js-oxford iframe');
const iframeLongman = document.querySelector('.js-longman iframe');
const iframeCambridge = document.querySelector('.js-cambridge iframe');
const iframeTracau = document.querySelector('.js-tracau iframe');
const iframeGgNews = document.querySelector('.js-gg-news iframe');

let isVietnamese = false;

function assignDisplay(...arr){
    arr[0]? dictOxford.classList.add('dict--appear') : dictOxford.classList.remove('dict--appear');
    arr[1]? dictLongman.classList.add('dict--appear') : dictLongman.classList.remove('dict--appear');
    arr[2]? dictCambridge.classList.add('dict--appear') : dictCambridge.classList.remove('dict--appear');
    arr[3]? dictTracau.classList.add('dict--appear') : dictTracau.classList.remove('dict--appear');
    arr[4]? dictGgNews.classList.add('dict--appear') : dictGgNews.classList.remove('dict--appear');
}

select1.addEventListener("click", ()=>{
    assignDisplay(1,0,0,0,0);
});
select2.addEventListener("click", ()=>{
    assignDisplay(0,1,0,0,0);
});
select3.addEventListener("click", ()=>{
    assignDisplay(0,0,1,0,0);
});
select4.addEventListener("click", ()=>{
    assignDisplay(0,0,0,1,0);
});
select5.addEventListener("click", ()=>{
    assignDisplay(0,0,0,0,1);
});

switching.addEventListener("click", ()=>{
    dictOxford.classList.toggle('dict--disappear');
    dictLongman.classList.toggle('dict--disappear');
    dictCambridge.classList.toggle('dict--disappear');
    dictTracau.classList.toggle('dict--disappear');
    dictGgNews.classList.toggle('dict--disappear');
});



search.addEventListener("click", ()=>{
    let bounceProperties = window.getComputedStyle(bounce);
    if(bounceProperties.getPropertyValue('display') === 'none'){
        /* header__input */
        if(input.value){
            localStorage.setItem('word', input.value);
            find(input.value);
        }
        input.value='';
        input.focus();

    }else{
        /* bounce__input -- unhiden */
        bounce.classList.toggle('bounce--drop');
        
        /* bounce__input -- hidden */
        if(bounce.classList.contains('bounce--drop')){
            bounceInput.focus();
        }else{
            bounceInput.blur(); //remove focus
            if(bounceInput.value){
                localStorage.setItem('word', bounceInput.value);
                find(bounceInput.value);
            }
            bounceInput.value='';
        }
    }
});

search.addEventListener('dblclick', ()=>{
        const word = localStorage.getItem('word');
        if(word){
            isVietnamese? iframeGgNews.setAttribute('src', `https://news.google.com/search?q=${word}&hl=vi&gl=VN&ceid=VN%3Avi`)
            : iframeGgNews.setAttribute('src', `https://news.google.com/search?q=${word}&hl=en-US&gl=US&ceid=US:en`);
            isVietnamese=!isVietnamese;
        }
});

function find(word){
    let low_word = word.toLowerCase();
    iframeOxford.setAttribute('src', `https://www.oxfordlearnersdictionaries.com/definition/english/${low_word}`);
    iframeLongman.setAttribute('src', `https://www.ldoceonline.com/dictionary/${low_word}`);
    iframeCambridge.setAttribute('src', `https://dictionary.cambridge.org/vi/dictionary/english/${low_word}`);
    iframeTracau.setAttribute('src', `https://tracau.vn/?s=${low_word}`);
    iframeGgNews.setAttribute('src', `https://news.google.com/search?q=${low_word}`);
    isVietnamese = false;
}

function handleKeyPress(event) {
    if (event.keyCode === 13) {
        bounce.classList.remove('bounce--drop');
        if(bounceInput.value){
            find(bounceInput.value);
            localStorage.setItem('word', bounceInput.value);
        }else{
            find(input.value);
            localStorage.setItem('word', input.value);
        }
        bounceInput.blur();
        bounceInput.value='';
        input.value='';
    }
}
