<?php 

@include 'config.php';

session_start();

if(isset($_POST['submit'])){

    $name = mysqli_real_escape_string($conn, $_POST['name']);
    $pass = $_POST['password'];

    $select = "SELECT * FROM user_form WHERE name = '$name' AND password = '$pass' ";

    $result = mysqli_query($conn, $select);

    if(mysqli_num_rows($result) == 1){
        
        $row = mysqli_fetch_array($result);

        if($row['user_type'] == 'admin'){

            $_SESSION['admin_name'] = $row['name'];
            header('location:admin_page.php');

        }elseif($row['user_type'] == 'user'){

            $_SESSION['user_name'] = $row['name'];
            header('location:user_page.php');

        }
    }else{
        $error[] = 'Incorrect username or password!';
    }
};
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>

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

    <div class="info-pane flex">
        <h3>Welcome to our site</h3>
        <p>> Join us</p>
        <p>> Be a registered user</p>
        <p>> Save your favorite drinks</p>
    </div>
    <div class="form-flex">
        <form action="" method="post">
            <h3>Login now</h3> 
            <?php 
            if(isset($error)){
                foreach($error as $error){
                    echo '<span class="error-msg">'.$error.'</span>';
                };
            };
            ?>
            <input type="text" name="name" required placeholder="Username">
            <input type="password" name="password" required placeholder="Password">
            <input type="submit" name="submit" value="Login now" class="form-btn">
            <p>Don't have an account? <a href="register_form.php">Register Now</a></p>
        </form>
    </div>
</div>
</body>
</html>
