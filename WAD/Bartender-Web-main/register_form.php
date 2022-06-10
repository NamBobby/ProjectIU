<?php 

@include 'config.php';

if(isset($_POST['submit'])){

    $name = mysqli_real_escape_string($conn, $_POST['name']);
    $email = mysqli_real_escape_string($conn, $_POST['email']);
    $pass = $_POST['password'];
    $cpass = $_POST['cpassword'];
    $user_type = $_POST['user_type'];

    $select = "SELECT * FROM user_form WHERE email = '$email' OR name= '$name'";

    $result = mysqli_query($conn, $select);

    if(mysqli_num_rows($result) > 0){
        $error[]= 'User already exist!';
        
    }else{

        if($pass != $cpass){
            $error[] = 'Password not matched!';
        }else{
            $insert = "INSERT INTO user_form(name, email, password, user_type) VALUES('$name','$email','$pass','$user_type')";
            mysqli_query($conn, $insert);
            header('location:login_form.php');
        }
    }
};
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registration</title>

    <link rel="stylesheet" href="css/register.css" />
</head>
<body>
<div class="grid-container">
    <nav class="flex navbar">
        <span class="logo">Web Application Development Project</span>
        <div class="nav">
          <a href="about.php">About Us</a>
        </div>
    </nav>
    <div class="info-pane">
        <h3>Welcome to our site</h3>
        <p>> Join us</p>
        <p>> Be a registered user</p>
        <p>> Save your favorite drinks</p>
    </div>
    <div class="form-flex">
        <form action="" method="post">
            <h3>Register now</h3>
            <?php 
            if(isset($error)){
                foreach($error as $error){
                    echo '<span class="error-msg">'.$error.'</span>';
                };
            };
            ?>
            <input type="text" name="name" required placeholder="Username">
            <input type="email" name="email" required placeholder="Email">
            <input type="password" name="password" required placeholder="Password">
            <input type="password" name="cpassword" required placeholder="Confirm your password">
            <select name="user_type">
                <option value="user">user</option>
            </select>
            <input type="submit" name="submit" value="Register now" class="form-btn">
            <p>Alreader have an account? <a href="login_form.php">Login Now</a></p>
        </form>
    </div>
</div>
</body>
</html>
