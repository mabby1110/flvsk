document.addEventListener('DOMContentLoaded', function() {
    // Clear form data on page load
    document.getElementById('myForm').reset();
})

document.getElementById('fileInput').addEventListener('change', function(e) {
    var file = e.target.files[0];
    var reader = new FileReader();

    reader.onload = function(e) {
        document.getElementById('consola').value = e.target.result;
    }

    reader.readAsText(file);
});