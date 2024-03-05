// Function to download the GIF
function downloadGif(url) {
    fetch(url)
        .then(response => response.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'random_gif.gif'; // Change the file name if needed
            a.style.display = 'none';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a); // Remove the download link from the DOM
        })
        .catch(error => {
            console.error('Error downloading GIF:', error);
        });
}


// Function to fetch a random GIF
function fetchRandomGif(searchTerm, random=false, defaultId="gifImage", animationID="loadingAnimation2") {
    // Display the loading animation
    document.getElementById(animationID).style.display = "block";
    document.getElementById(defaultId).src = "";
    document.getElementById(defaultId).alt = "";

    var apiUrl = "https://api.giphy.com/v1/gifs/random?api_key=KcvGA6QmieFcm9hSrODO6uJAhajdEz4F&tag=" + searchTerm.trim();
    if (random){
        apiUrl = "https://api.giphy.com/v1/gifs/random?api_key=KcvGA6QmieFcm9hSrODO6uJAhajdEz4F";
    }

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            var gifUrl = data.data.images.downsized.url;
            var gifTitle = data.data.title;
            // Update the element's content with the GIF image
            document.getElementById(defaultId).src = gifUrl;
            document.getElementById(defaultId).alt = gifTitle;

            // Hide the loading animation after the image is loaded
            document.getElementById(animationID).style.display = "none";

            // Event listener for download button
            document.getElementById("downloadButton").addEventListener("click", function() {
                var gifUrl = document.getElementById("randomGifImage").src;
                downloadGif(gifUrl);
            });
            document.getElementById("downloadButton2").addEventListener("click", function() {
                var gifUrl = document.getElementById("gifImage").src;
                downloadGif(gifUrl);
            });

        })
        .catch(error => {
            console.error("Error fetching GIF:", error);
        });
}

// Event listener for form submission
document.getElementById("form").addEventListener("submit", function(event) {
    event.preventDefault();

    // get value from the input box
    var searchTerm = document.getElementById("search").value;
    if (searchTerm.trim() == ""){
        searchTerm = "Iron Man";
    }

    fetchRandomGif(searchTerm);
});

// Event listener for the button to generate a random GIF 
document.getElementById("button1").addEventListener("click", function() {
    fetchRandomGif("", true, "randomGifImage", "loadingAnimation1");
});

// Call fetchRandomGif() function with a default search term on page load
window.addEventListener("load", function() {
    var defaultSearchTerm = "Tony Stark"; 
    fetchRandomGif(defaultSearchTerm);
    fetchRandomGif("", true, "randomGifImage", "loadingAnimation1");
});
