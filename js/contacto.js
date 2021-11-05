const form = document.querySelector('#form');

form.addEventListener('submit', handleSubmit);

async function handleSubmit(event) {
    event.preventDefault();
    const formulario = new FormData(this)
    const respose = await fetch(this.action,{
        method: this.method,
        body: formulario,
        headers: {
            'Accept': 'application/json'
        }
    })
    if(respose.ok){
        this.reset()
        Swal.fire({
            type: 'success',
            title: 'Gracias por contactarnos, te responderemos a la brevedad',
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            }
          })

    }
}