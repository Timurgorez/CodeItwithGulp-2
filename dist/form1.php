<? 
// ----------------------------������������-------------------------- // 
 
$adminemail="admin@site.ru";  // e-mail ������ 
 
 
$backurl="company.html";  // �� ����� ��������� ��������� ����� �������� ������ 
 
//---------------------------------------------------------------------- // 
 
  
 
// ��������� ������ � ����� 
 
$name=$_POST['name']; 
$secondname=$_POST['secondname']; 
$email=$_POST['email']; 
$password=$_POST['password']; 
 
  
 
// ��������� ���������� e-mail 
 
if (!preg_match("|^([a-z0-9_\.\-]{1,20})@([a-z0-9\.\-]{1,20})\.([a-z]{2,4})|is", strtolower($email))) 
 { 
 
  echo 
"<center>��������� <a 
href='javascript:history.back(1)'><B>back</B></a>. �� 
������� �������� ������!"; 
 
  } 
 
 else 
 
 { 
$msg="
<p>Name: $name</p> 
<p>SecondName: $secondname</p> 
<p>E-mail: $email</p> 
<p>Password: $password</p> 
"; 
 
  
 
 // ���������� ������ ������  
 
mail("$adminemail", "message from $name", "$secondname"); 
 

 
// ������� ��������� ������������ 
 
print "
<!DOCTYPE html>
<html lang='ru'>
<head>
	<meta charset='UTF-8'>
</head>
<body>
<script language='Javascript'><!-- 
function reload() {location = \"$backurl\"}; setTimeout('reload()', 6000); 
//--></script> 
<div style='width: 500px; height: 400px; margin: 0 auto;'>
$msg 
 
<p>Message sent! Wait, now you will be redirected to the main page...</p></div>
</body>
</html>
";  
exit; 
 
 } 
 
?>