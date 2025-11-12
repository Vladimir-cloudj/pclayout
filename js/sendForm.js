const sendForm = () => {
    const form = document.querySelector('.modal')

    if (!form) {return}

    form.addEventListener('submit', (e) => {
        e.preventDefault()

        const formData = new FormData(form)
        const sendObj = Object.fromEntries(formData.entries());

        // const text = form.querySelector('input[type=text]')
        // const tel = form.querySelector("input[type=tel]");
        // const email = form.querySelector("input[type=email]");

        // const sendObj = {
        //     text: text.value,
        //     tel: tel.value,
        //     email: email.value
        // }

        // fetch('https://jsonplcaeholder.typicode.com/todos/1')
        //     .then(response => {
        //         if (!response.ok) {
        //             throw new Error('Error')
        //         }
        //         return response.json()})
        //     .then(json => {})
        //     .catch(error => {console.warm(error.message);
        //     })

        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(sendObj),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`)
                }
                return response.json()
            })
            .then(data => {
                console.log('успешно отправлено', data);
                alert('Спасибо. Ваша заявка отправлена');
                form.reset();
                form.computedStyleMap.display = '';
            })
            .catch(error => {
                console.log('ошибка:', error.message);
                alert(`произошла ошибка при отправке формы: ${error.message}`)
            })
            .finally(() => {
                console.log('Форма обработана');
            })
    })
}

sendForm()