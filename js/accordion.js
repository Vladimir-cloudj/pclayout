const contents = document.querySelectorAll(".program-line__content");

contents.forEach((element) => {
    const title = element.querySelector(".program-line__title");
    const description = element.querySelector(".program-line__descr");
    
    title.addEventListener("click", () => {
        contents.forEach((element) => {
            const desc = element.querySelector(".program-line__descr");
            if (desc !== description) {
                desc.classList.remove("active")
            }
        })
        description.classList.toggle("active")
    })
})
