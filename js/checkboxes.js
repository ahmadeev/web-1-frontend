//  checkboxes as radio buttons

const checkboxes = document.querySelectorAll('input[type="checkbox"]');

for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].addEventListener('click', function() {
        for (let j = 0; j < checkboxes.length; j++) {
            if (checkboxes[j] !== this) {
                checkboxes[j].checked = false;
            }
        }
    });
}