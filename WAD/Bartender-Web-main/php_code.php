<?php 
	session_start();
    $db = mysqli_connect('localhost', 'root', '', 'user_db');

$id = 0;
$name = "";
$email = "" ;
$pass = "" ;
$user_type = "" ;

if (isset($_POST['save'])) {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $pass = $_POST['password'];
    $user_type = $_POST['user_type'];
    $select = "SELECT * FROM user_form WHERE email = '$email' OR name= '$name'";
    $result = mysqli_query($db, $select);
    if (mysqli_num_rows($result) > 0) {
        $_SESSION['message'] = "User already exist!";
        header('location:admin_page.php');
    } else {
        mysqli_query($db, "INSERT INTO user_form(name, email, password, user_type) VALUES('$name','$email','$pass','$user_type')");
        $_SESSION['message'] = "User added";
        header('location:admin_page.php');
    }
}

if (isset($_POST['update'])) {
    $id = $_POST['id'];
    $name = $_POST['name'];
    $email = $_POST['email'];
    $pass = $_POST['password'];
    $user_type = $_POST['user_type'];
    $select = "SELECT * FROM user_form WHERE email = '$email' OR name= '$name'";
    $result = mysqli_query($db, $select);
    if (mysqli_num_rows($result) > 0) {
        $_SESSION['message'] = "User already exist!";
        header('location:admin_page.php');
    } else {
        mysqli_query($db, "UPDATE user_form SET name='$name', email='$email', password='$pass', user_type='$user_type' WHERE id=$id");
        $_SESSION['message'] = "Address updated!";
        header('location:admin_page.php');
    }
}

if (isset($_POST['delete'])) {
	$id = $_POST['id'];
	mysqli_query($db, "DELETE FROM user_form WHERE id=$id");
	$_SESSION['message'] = "User deleted!"; 
	header('location:admin_page.php');
}
?>