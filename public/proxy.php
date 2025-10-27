<?php
// Set CORS headers immediately
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Check if the img parameter is provided
if (!isset($_GET['img']) || empty($_GET['img'])) {
    http_response_code(400);
    exit('Error: img parameter is required');
}

$imageUrl = $_GET['img'];

// Validate that it's a proper URL
if (!filter_var($imageUrl, FILTER_VALIDATE_URL)) {
    http_response_code(400);
    exit('Error: Invalid URL provided');
}

// Initialize cURL
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $imageUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 30);
curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');

// Execute the request
$imageData = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$contentType = curl_getinfo($ch, CURLINFO_CONTENT_TYPE);

// Check for errors
if (curl_error($ch)) {
    curl_close($ch);
    http_response_code(500);
    exit('Error: Failed to fetch image - ' . curl_error($ch));
}

curl_close($ch);

// Check if the request was successful
if ($httpCode !== 200) {
    http_response_code($httpCode);
    exit('Error: Failed to fetch image (HTTP ' . $httpCode . ')');
}

// Verify it's actually an image
if (!$contentType || strpos($contentType, 'image/') !== 0) {
    http_response_code(400);
    exit('Error: URL does not point to an image');
}

// Set the content type header for the image
header('Content-Type: image/jpeg');

// Output the image data
echo $imageData;
?>
