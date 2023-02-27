import $ from 'jquery';

export const jsevent = () =>{
    $('#back-to-top').on('click', function(e) {
   
    $('body,html').animate({
        scrollTop: 0
    }, 800);
    return false;
});
}