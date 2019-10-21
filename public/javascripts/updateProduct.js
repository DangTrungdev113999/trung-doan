function updateProduct() {
   $(".update-product").on("click", function(event) {
      let pid = $(this).data("pid");
      let name =  $('.update-name').val();
      let price = $('.update-price').val();
      let token = localStorage.getItem("token");
      $.ajax({
         type: `PUT`,
         url: `/product/${pid}`,
         data: {
            name,
            price
         },
         headers: {
            token
         },
         success: response => {
            alert('Update Successfully!')
            window.location.href = '/product'
         },
         error: err => {
            console.log(err);
            alert(err.responseJSON.message);
         }
      });
   });
}

$(document).ready(function() {
   updateProduct();
});
