<?php
session_start();
include 'config.php'; // Include your database configuration file

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Validate user credentials
    $sql = "SELECT * FROM users WHERE email=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc(); // Corrected method to fetch associative array
        if (password_verify($password, $row['password'])) {
            // Start session and set session variables
            $_SESSION['username'] = $row['username'];
            $_SESSION['email'] = $row['email'];
            echo 'success';
        } else {
            echo 'Invalid password.';
        }
    } else {
        echo 'No user found with this email.';
    }

    $stmt->close();
    $conn->close();
}
?>