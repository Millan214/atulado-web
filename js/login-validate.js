const form = document.getElementById('form')
const login = document.getElementById('input-login')
const passwd = document.getElementById('input-password')

form.addEventListener('submit', (e) => {
    e.preventDefault()
    if (login.value == '' || login.value == null || passwd.value == '' || passwd.value == null) {
        Swal.fire({
            icon: 'error',
            title: '<span class="montserrat">Empty fields!</span>',
            text: 'Please fill all the fields'
          })
    }else{
        document.location.href = 'html\\show_vols.html';
    }
})