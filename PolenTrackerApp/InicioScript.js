var btns = document.querySelectorAll('.btn');

for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener('click', function() {
    this.classList.add('active');
  });
}
