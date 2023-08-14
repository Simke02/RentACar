(function ($) {

  "use strict";





  $(document).ready(function () {

    //switch javascript

    const switchInput = document.getElementById('flexSwitchCheckChecked');
    const contentElements = document.querySelectorAll('.content');
    const monthlyLabel = document.getElementById('monthly-label');
    const yearlyLabel = document.getElementById('yearly-label');


    yearlyLabel.classList.add('label-color'); // Set initial accent color to yearly label


    switchInput.addEventListener('change', function () {
      if (this.checked) {
        yearlyLabel.classList.add('label-color'); // Add color to label
        monthlyLabel.classList.remove('label-color'); // Remove color from label
      } else {
        monthlyLabel.classList.add('label-color'); // Add color to label
        yearlyLabel.classList.remove('label-color'); // Remove color from label
      }
    });

    contentElements.forEach(function (element) {
      if (element.classList.contains('yearly')) {
        element.style.display = 'block';
      } else {
        element.style.display = 'none';
      }
    });     // Set the price initial state


    switchInput.addEventListener('change', function () {
      if (this.checked) {

        contentElements.forEach(function (element) {
          if (element.classList.contains('yearly')) {
            element.style.display = 'block';
          } else {
            element.style.display = 'none';
          }
        });
      } else {

        contentElements.forEach(function (element) {
          if (element.classList.contains('monthly')) {
            element.style.display = 'block';
          } else {
            element.style.display = 'none';
          }
        });
      }
    });    // Add event listener to the switch input





    // rental swiper
    var swiper = new Swiper(".rental-swiper", {
      slidesPerView: 3,
      spaceBetween: 30,
      freeMode: true,
      navigation: {
        nextEl: ".rental-swiper-next",
        prevEl: ".rental-swiper-prev",
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 30,
        },
        1400: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
      }
    });


    //testimonial swiper
    var swiper = new Swiper(".testimonial-swiper", {
      loop: true,
      pagination: {
        el: ".swiper-pagination",
      },
    });


    //date picker
    $("#datepicker1, #datepicker2").datepicker({
      autoclose: true,
      todayHighlight: true,
    }).datepicker('update', new Date());



    // Animate on Scroll
    AOS.init({
      duration: 1000,
      once: true,
    })




  });


})(jQuery);
