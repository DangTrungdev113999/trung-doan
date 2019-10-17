function updateProduct() {
   $(".update-product").on("click", function(event) {
      let pid = $(this).data("pid");
      let name =  $('.update-name').val();
      let price = $('.update-price').val();
      
      $.ajax({
         type: `PUT`,
         url: `/product/${pid}`,
         data: {
            name,
            price
         },
         success: response => {
            console.log(response)
            alert('Update Successfully!')
            window.location.href = '/product'
         },
         error: err => console.log(err)
      });
   });
}

$(document).ready(function() {
   updateProduct();
});
