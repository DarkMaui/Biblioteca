$('#btn-like').click(function(e){
    e.preventDefault();
    let tesisId =   $(this).data('id');
   
    $.post('/tesis/'+ tesisId + '/like')
    .done(data => {
        console.log(data);
        $('.likes-count').text(data.likes);

    });
});

$('#btn-delete').click(function(e){
    e.preventDefault();
   let $this = $(this);

   const response = confirm('Confirmar elimnar tesis');
   if(response){
       let tesisId = $this.data('id');
       $.ajax({
           url: '/tesis/' + tesisId,
           type: 'DELETE' 
       })
       .done(function (result){
        $this.removeClass('btn-danger').addClass('btn-success');
        $this.find('i').removeClass('fa-times').addClass('fa-check');
        $this.append('<span>Eliminado!!</span>');
       });
   }
});