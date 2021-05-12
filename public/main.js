let formData = localStorage.getItem('formData');
formData = JSON.parse(formData)
console.log({ formData })

inputNumber.value = formData && formData.donateAmount

const addDonate = (event) => {
    event.preventDefault();
    let userDonate = {
        time: Date(),
        donateAmount: document.getElementById('inputNumber').value,
    }

    formData = userDonate;
    document.getElementById('contact-form').reset();

    console.log('added donate', { formData });

    fetch('/api/form', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
        
            body: JSON.stringify(formData),
        }).then(res => res.json())
        .then(data => {
            console.log(data)
        })

    localStorage.setItem('formData', JSON.stringify(formData));
}

document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('buttonGiveNowStyle').addEventListener('click', addDonate);
});