
const books = [
    { Title: "A Little Life", Book_Genre: "Contemporary", Author: "Hanya Yanagihara" },
    { Title: "Hong Kong Hacker", Book_Genre: "Mystery", Author: "Chan Ho-Kei" },
    { Title: "No Longer Human", Book_Genre: "Classics", Author: "Osamu Dazai" },
    { Title: "1Q84", Book_Genre: "Magical Realism", Author: "Haruki Murakami" },
    { Title: "White Nights", Book_Genre: "Russian Literature", Author: "Fyodor Dostoevsky" },
    { Title: "The Odyssey", Book_Genre:"Mythology", Author: "Homer" },
];


function Nodo(item) {
    const li = document.createElement("li");   
    li.className = "item";
    li.dataset.category = item.Book_Genre;

    const h3 = document.createElement("h3");   
    h3.textContent = item.Title;

    const pa = document.createElement("p");   
    pa.textContent = item.Author;

    const sp = document.createElement("span"); 
    sp.className = "category";
    sp.textContent = item.Book_Genre;

    const bt = document.createElement("button"); 
    bt.type = "button";
    bt.className = "btn-eliminar";
    bt.textContent = "Remove";

    li.append(h3, pa, sp, bt);
    return li;
}
function renderColection(items) {
    const container = document.querySelector("#lists_of_books"); 
    items.forEach((item) => {
        container.appendChild(Nodo(item)); 
    });
}

renderColection(books);



const inputFiltro = document.querySelector("#filter");
const mensajeSinResultados = document.querySelector("#no-results");

inputFiltro.addEventListener("input", () => {
    const query = inputFiltro.value.trim().toLowerCase();
    const items = document.querySelectorAll("#lists_of_books .item");
    let visibles = 0;

    items.forEach((li) => {
        const texto = li.textContent.toLowerCase();
        const coincide = texto.includes(query);
        li.classList.toggle("oculto", !coincide);
        if (coincide) visibles++;
    });

    mensajeSinResultados.hidden = visibles !== 0;
});



const formAgregar = document.querySelector("#add_book");
const listaLibros = document.querySelector("#lists_of_books");

formAgregar.addEventListener("submit", (e) => {
    e.preventDefault(); 

    const nuevoLibro = {
        Title: document.querySelector("#new-title").value.trim(),
        Author: document.querySelector("#new-author").value.trim(),
        Book_Genre: document.querySelector("#new-genre").value.trim(),
    };

    if (!nuevoLibro.Title || !nuevoLibro.Author || !nuevoLibro.Book_Genre) return;

   
    const nuevoNodo = Nodo(nuevoLibro);
    listaLibros.appendChild(nuevoNodo);

  
    const query = inputFiltro.value.trim().toLowerCase();
    const coincide = nuevoNodo.textContent.toLowerCase().includes(query);
    nuevoNodo.classList.toggle("oculto", !coincide);

    const visibles = document.querySelectorAll("#lists_of_books .item:not(.oculto)").length;
    mensajeSinResultados.hidden = visibles !== 0;

    formAgregar.reset();
});

listaLibros.addEventListener("click", (e) => {
    if (e.target.matches(".btn-eliminar")) {
        const li = e.target.closest(".item");
        li.remove();
    }
});


const contactForm = document.querySelector("#contact-form");
const contactConfirmacion = document.querySelector("#contact-confirmacion");

const campos = {
    name: {
        input: document.querySelector("#name"),
        error: document.querySelector("#name-error"),
        validar: (valor) => valor.trim().length > 0,
        mensaje: "Please enter your name.",
    },
    email: {
        input: document.querySelector("#email"),
        error: document.querySelector("#email-error"),
        validar: (valor) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor.trim()),
        mensaje: "Please enter a valid email address.",
    },
    message: {
        input: document.querySelector("#message"),
        error: document.querySelector("#message-error"),
        validar: (valor) => valor.trim().length > 0,
        mensaje: "Please write a message.",
    },
};

function validarC(campo) {
    const valor = campo.input.value;
    const esValido = campo.validar(valor);
    campo.error.textContent = esValido ? "" : campo.mensaje;
    return esValido;
}


Object.values(campos).forEach((campo) => {
    campo.input.addEventListener("input", () => validarC(campo));
});

contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const todosValidos = Object.values(campos)
        .map((campo) => validarC(campo))
        .every((valido) => valido);

    if (!todosValidos) {
        contactConfirmacion.hidden = true;
        return;
    }

    contactConfirmacion.hidden = false;
    contactForm.reset();
});

const themeToggle = document.querySelector("#theme-toggle");

themeToggle.addEventListener("click", () => {
    const activo = document.body.classList.toggle("light-mode");
    themeToggle.setAttribute("aria-pressed", String(activo));
    themeToggle.textContent = activo ? "Dark mode" : "Light mode";
});