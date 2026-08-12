//our-story carousel
if (typeof $ !== "undefined") {
    $(".owl-carousel").owlCarousel({
        items: 1,
        loop: true,
        margin: 30,
        nav: true,
        navText: [ '<i class="fa-solid fa-arrow-left"></i>', '<i class="fa-solid fa-arrow-right"></i>' ]
    });
}

//blog-details-comments 

var form = document.getElementById("commentForm");
var commentsContainer = document.getElementById("comments-container");

if(form){
form.addEventListener("submit", function(e) {
    e.preventDefault();
    var name = document.getElementById("name").value;
    var comment = document.getElementById("comment").value;
    var div = document.createElement("div");
    var img = document.createElement("img");
    var content = document.createElement("div");
    var h6 = document.createElement("h6");
    var small = document.createElement("small");
    var p = document.createElement("p");

    img.src = "../../Profile/images/images.jpg";
    img.width = 45;
    img.height = 45;
    img.classList.add("rounded-circle");
    h6.innerText = name;
    h6.classList.add("fw-bold", "mb-1");
    var now = new Date();
    small.innerText = now.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    small.classList.add("text-secondary");
    p.innerText = comment;
    p.classList.add("text-secondary", "mt-2", "mb-0");

    content.appendChild(h6);
    content.appendChild(small);
    content.appendChild(p);

    div.appendChild(img);
    div.appendChild(content);

    div.classList.add("d-flex", "gap-3", "border-bottom", "pb-4", "mb-4");

    commentsContainer.appendChild(div);

    form.reset();
})
};


/* contact us*/
var contactForm = document.getElementById('contactForm');
var nameValidation = (input) => {
    var inputValue = input.value.trim();
    if (inputValue.length < 3)
        handleError(input, "Enter at least 3 characters");
    else
        handleError(input);
};

var emailValidation = (input) => {
    var inputValue = input.value.trim();
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(inputValue))
        handleError(input);
    else
        handleError(input, "Enter a valid email");
};

var subjectValidation = (input) => {
    var inputValue = input.value.trim();
    if (inputValue.length < 3)
        handleError(input, "Enter a subject");
    else
        handleError(input);
};

var messageValidation = (input) => {
    var inputValue = input.value.trim();
    if (inputValue.length < 10)
        handleError(input, "Enter at least 10 characters");
    else
        handleError(input);
};

var handleError = (element, msg = "") => {
    element.nextElementSibling.innerText = msg;
};

if(contactForm){
contactForm.addEventListener('input', (e) => {
    switch (e.target.id) {
        case "name":
            nameValidation(e.target);
            break;
        case "email":
            emailValidation(e.target);
            break;
        case "subject":
            subjectValidation(e.target);
            break;
        case "message":
            messageValidation(e.target);
            break;
    }
})
};