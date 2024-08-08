function toggleMenu() {
    var navbar = document.getElementById('navbar');
    var menuBtn = document.querySelector('.menu-btn');
    
    navbar.classList.toggle('show');
    menuBtn.classList.toggle('hide');
}

function startTransition() {
    var loading = document.getElementById('loading');
    loading.style.display = 'block';


    setTimeout(function() {
        loading.style.display = 'none';

        window.location.href = 'convert.html';
    }, 1000);
}

document.addEventListener('DOMContentLoaded', function() {

    var homeButton = document.querySelector('.navbar-options a[href="main.html"]');
    if (homeButton) {
        homeButton.addEventListener('click', function(event) {
            event.preventDefault(); 
            window.location.href = "main.html"; 
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {

    var homeButton = document.querySelector('.navbar-options a[href="data.html"]');
    if (homeButton) {
        homeButton.addEventListener('click', function(event) {
            event.preventDefault(); 
            window.location.href = "data.html";
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {

    var homeButton = document.querySelector('.navbar-options a[href="convert.html"]');
    if (homeButton) {
        homeButton.addEventListener('click', function(event) {
            event.preventDefault(); 
            window.location.href = "convert.html"; 
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {

    var dropdownButton = document.querySelector('.dropbtn');
    var dropdownContent = document.querySelector('.dropdown-content');

    document.querySelectorAll('.dropdown-content a').forEach(function(option) {
        option.addEventListener('click', function(event) {
            event.preventDefault();
            dropdownButton.textContent = option.textContent;
            toggleDropdown();
        });
    });

    function toggleDropdown() {
        if (dropdownContent.style.display === 'block') {
            dropdownContent.style.display = 'none';
        } else {
            dropdownContent.style.display = 'block';
        }
    }
    dropdownButton.addEventListener('click', toggleDropdown);

});

document.addEventListener('DOMContentLoaded', function() {
    var currentRow = 0;
    var data = jsonData;

    function updateTextAreas() {
        document.getElementById('intentText').value = data[currentRow].intent;
        document.getElementById('snippetText').value = data[currentRow].snippet;
        document.getElementById('currentRow').textContent = currentRow + 1;
    }

    window.prevRow = function() {
        if (currentRow > 0) {
            currentRow--;
            updateTextAreas();
        }
    };
    window.nextRow = function() {
        if (currentRow < data.length - 1) {
            currentRow++;
            updateTextAreas();
        }
    };

    document.getElementById('totalRows').textContent = data.length;

    updateTextAreas();
});

function submitForm() {

    var inputText = document.getElementById("inputText").value;
    var selectedOption = document.getElementById("dropdown").value;

    if (inputText.trim() !== "") {
        fetch('/convert', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'input_text=' + encodeURIComponent(inputText) + '&selected_option=' + encodeURIComponent(selectedOption),
        })
        .then(response => response.text())
        .then(result => {

            document.getElementById("outputText").value = result;
        })
        .catch(error => console.error('Error:', error));
    }
}
