// Get the container element
let linkContainer = document.getElementById('link-container');
linkContainer.addEventListener(
  'click',
  function () {
    // Bail if it's not a .nav-link
    if (!event.target.classList.contains('li')) return;

    // Add the active class
    event.target.classList.add('active');

    // Get all nav links
    let links = document.querySelectorAll('.li');

    // Loop through each link
    for (let i = 0; i < links.length; i++) {
      // If the link is the one clicked, skip it
      if (links[i] === event.target) continue;

      // Remove the .active class
      links[i].classList.remove('active');
    }
  },
  false
);
let faqPageTP = document.getElementById('faq_pageTP'),
faqPageAP = document.getElementById('faq_pageAP'),
 faqPageMB = document.getElementById('faq_pageMB'),
 faqPageGS = document.getElementById('faq_pageGS'),

adminActnTP = document.querySelectorAll('.admin-actionTP'),
togglerTP = document.querySelectorAll('.togglerTP'),
adminActnAP = document.querySelectorAll('.admin-actionAP'),
togglerAP = document.querySelectorAll('.togglerAP'),
adminActnGS = document.querySelectorAll('.admin-actionGS'),
togglerGS = document.querySelectorAll('.togglerGS'),
adminActnMB = document.querySelectorAll('.admin-actionMB'),
togglerMB = document.querySelectorAll('.togglerMB'),

talent = document.querySelector('.talent');
let gettingStarted = document.querySelector('.get-started');
let application = document.querySelector('.application');
let membership = document.querySelector('.membership');
// Populate the Faq section according to cateory
let ulItem = document.querySelector('.faq_sidenav_options');
ulItem.addEventListener('click', (e) => {
  let targetEl = e.target.attributes.href.value;
  if (targetEl == '#talent') {
    talent.style.display = 'block';
    gettingStarted.style.display = 'none';
    application.style.display = 'none';
    membership.style.display = 'none';
  } else if (targetEl == '#getting-started') {
    talent.style.display = 'none';
    gettingStarted.style.display = 'block';
    application.style.display = 'none';
    membership.style.display = 'none';
  } else if (targetEl == '#application') {
    talent.style.display = 'none';
    gettingStarted.style.display = 'none';
    application.style.display = 'block';
    membership.style.display = 'none';
  } else if (targetEl == '#membership') {
    talent.style.display = 'none';
    gettingStarted.style.display = 'none';
    application.style.display = 'none';
    membership.style.display = 'block';
  }
});

// Change the toggler to edit and delete button fter 2 secs
faqPageTP.addEventListener('click', (e) => {
  if (e.target.textContent=='Edit') {
    setTimeout(() => {
      togglerTP.forEach((item) => (item.style.display = 'none'));
      adminActnTP.forEach((item) => {
        item.classList.remove('d-none');
        item.classList.add('d-flex');
        item.classList.add('px-1');
      });

      e.target.textContent = 'Save';
    }, 100);
  }
  else if(e.target.textContent=='Save'){
    setTimeout(() => {
      togglerTP.forEach((item) => (item.style.display = 'block'));
      adminActnTP.forEach((item) => {
        item.classList.remove('d-flex');
        item.classList.remove('px-1');
        item.classList.add('d-none');

      });
      e.target.textContent = 'Edit';
    }, 100);
  }
});

faqPageAP.addEventListener('click', (e) => {
  if (e.target.textContent=='Edit') {
    setTimeout(() => {
      togglerAP.forEach((item) => (item.style.display = 'none'));
      adminActnAP.forEach((item) => {
        item.classList.remove('d-none');
        item.classList.add('d-flex');
        item.classList.add('px-1');
      });

      e.target.textContent = 'Save';
    }, 100);
  }
  else if(e.target.textContent == 'Save'){
    setTimeout(() => {
      togglerAP.forEach((item) => (item.style.display = 'block'));
      adminActnAP.forEach((item) => {
        item.classList.remove('d-flex');
        item.classList.remove('px-1');
        item.classList.add('d-none');

      });
      e.target.textContent = 'Edit';
    }, 100);
  }
});

faqPageGS.addEventListener('click', (e) => {
  if (e.target.textContent=='Edit') {
    setTimeout(() => {
      togglerGS.forEach((item) => (item.style.display = 'none'));
      adminActnGS.forEach((item) => {
        item.classList.remove('d-none');
        item.classList.add('d-flex');
        item.classList.add('px-1');
      });
      e.target.textContent = 'Save';
    }, 100);
  }
  else if(e.target.textContent=='Save'){
    setTimeout(() => {
      togglerGS.forEach((item) => (item.style.display = 'block'));
      adminActnGS.forEach((item) => {
        item.classList.remove('d-flex');
        item.classList.remove('px-1');
        item.classList.add('d-none');

      });
      e.target.textContent = 'Edit';
    }, 100);
  }
});

faqPageMB.addEventListener('click', (e) => {
  if (e.target.textContent=='Edit') {
    setTimeout(() => {
      togglerMB.forEach((item) => (item.style.display = 'none'));
      adminActnMB.forEach((item) => {
        item.classList.remove('d-none');
        item.classList.add('d-flex');
        item.classList.add('px-1');
      });

      e.target.textContent = 'Save';
    }, 100);
  }
  else if(e.target.textContent=='Save'){
    setTimeout(() => {
      togglerMB.forEach((item) => (item.style.display = 'block'));
      adminActnMB.forEach((item) => {
        item.classList.remove('d-flex');
        item.classList.remove('px-1');
        item.classList.add('d-none');

      });

      e.target.textContent = 'Edit';
    }, 100);
  }
});

// function myFunction(){
//   var customSwitch1 = document.getElementById('customSwitch1');
//   if(customSwitch1.checked==true)
//   {
//     console.log('Hello');
//   }
//   else{
//     console.log("He")
//   }
// }

$('.customSwitch').on('change',function(){
    let idx = this.id.split(' ')[1];
    let len = this.id.split(' ')[0].length;
    let category = this.id.split(' ')[0][len-2]+this.id.split(' ')[0][len-1]
    let id = $('#id'+category+idx).val();
    let state = (this.checked==true)?1:0;
    $.ajax({
      type: 'PUT',
      url: '/v1/admin/faq',
      data: {'id':id,'state':state}
    })
})

$('.delete-btn').click(function () {
  var r = confirm("Are you sure want to delete this FAQ ?");
  if(r == true){
    let idx = this.id.split(' ')[1];
    let len = this.id.split(' ')[0].length;
    let category = this.id.split(' ')[0][len-2]+this.id.split(' ')[0][len-1];
    let id = ($('#id'+category+idx).val());
    var req = $.ajax({
      type: 'DELETE',
      url:'/v1/admin/faq',
      data: {'id':id},
      success: function(result){
        location.reload();
      }
    })
  }
})






$('.edit-btn').click(function () {
  let data = $('#'+this.id).val().split('%%');
  $('#questionUpdate').val(data[2]);
  $('#answerUpdate').val(data[1]);
  $('#categoryUpdate').val(data[3]);
  $('#idUpdate').val(data[0]);
  $('#exampleModal2').modal('show');

})

$('#update-button').click(function () {
  let question = $('#questionUpdate').val();
  let answer = $('#answerUpdate').val();
  let category = $('#categoryUpdate').val();
  let id = $('#idUpdate').val();
  console.log([question, answer,category,id])
  $.ajax({
    type: 'PUT',
    url:'/v1/admin/faq',
    data: {
      question: question,
      answer: answer,
      category: category,
      id: id,
    },
    success: function (result){
      window.location.reload();
    }
  })

  })
