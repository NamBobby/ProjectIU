<?php include ('php_code.php');?>

<?php
$update = false;
$delete = false; 
if (isset($_GET['edit'])) {
    $id = $_GET['edit'];
    $update = true;
    $record = mysqli_query($db, "SELECT * FROM user_form WHERE id=$id");

    if (mysqli_num_rows($record) == 1) {
        $n = mysqli_fetch_array($record);
        $name = $n['name'];
        $email = $n['email'];
        $pass = $n['password'];
        $user_type = $n['user_type'];
    }
}
?>

<?php 
if (isset($_GET['del'])) {
    $id = $_GET['del'];
    $delete = true;
    $record = mysqli_query($db, "SELECT * FROM user_form WHERE id=$id");

    if (mysqli_num_rows($record) == 1) {
        $n = mysqli_fetch_array($record);
        $name = $n['name'];
        $email = $n['email'];
        $pass = $n['password'];
        $user_type = $n['user_type'];
    }
}
?>

<?php 
if(!isset($_SESSION['admin_name'])){
    header('location:login_form.php');
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin page</title>
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>
<div class="grid-container">
    <nav class="flex navbar">
        <span class="logo">Web Application Development Project</span>
        <div class="nav">
          <p style="color : white">Welcome <span style="color : gold"><?php echo $_SESSION['admin_name'] ?></span></p>
          <a href="logout.php" class=""btn>Logout</a>
        </div>
    </nav>
    <div class="input-group">  
    <?php $results = mysqli_query($db, "SELECT * FROM user_form"); ?>

        <table class="table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
					<th>Password</th>
					<th>Role Type</th>
                    <th colspan="2">Action</th>
                </tr>
            </thead>
        
    <?php
        while ($row = mysqli_fetch_array($results)) {  ?>
            <tr>
                <td><?php echo $row['name']; ?></td>
                <td><?php echo $row['email']; ?></td>
				<td><?php echo $row['password']; ?></td>
				<td><?php echo $row['user_type']; ?></td>
                <td>
                    <a href="admin_page.php?edit=<?php echo $row['id']; ?>"
                        class="edit_btn">Edit</a>
                    <a href="admin_page.php?del=<?php echo $row['id']; ?>"
                        class="del_btn">Delete</a>
                </td>
            </tr>
        <?php } ?>    
        </table>      
        <form action="php_code.php" method="POST">
            <input type="hidden" name="id" value="<?php echo $id; ?>">
                <h3>Add/Update User</h3>
                <?php if (isset($_SESSION['message'])){ ?>
                <h4 style="color: red">System message:</h4>
		        <span class="error-msg"><?php
                    echo($_SESSION['message']);
                    unset($_SESSION['message']);
                ?></span>
                <?php } ?>  
                <input type="text" name="name" class="form-control" value="<?php echo $name; ?>" placeholder="Enter your name">
                <input type="text" name="email" class="form-control" value="<?php echo $email; ?>" placeholder="Enter your email">
                <input type="text" name="password" class="form-control" value="<?php echo $pass; ?>" placeholder="Enter your password">
                <select name="user_type" value="<?php echo $user_type; ?>">
                	<option class="form-control">user</option>
					<option class="form-control">admin</option>
				</select>
            <?php 
            if ($update == true) {
                ?>
                <button type="submit" class="form-btn" name="update">Update</button>
            <?php
            }elseif ($delete == true){
            ?>
                <button type="submit" class="form-btn" name="delete">Delete</button>
            <?php 
            }else{
            ?>   
                <button type="submit" class="form-btn" name="save">Add</button>
            <?php } ?>  
        </form>
    </div>
</div>
</body>
</html>