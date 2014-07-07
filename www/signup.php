<?php
function isEmail($email)
{
	return (false !== filter_var($email, FILTER_VALIDATE_EMAIL)) && preg_match('/@.+\./', $email);
}

function processSignup()
{
	$fields = Array("name", "email");
	$data = Array();
	$obj = new stdClass();
	if (isset($_POST) && (count($_POST) > 0))
	{
		foreach ($fields as $field)
		{
			$data[$field] = isset($_POST[$field]) ? strip_tags($_POST[$field]) : null;
		}
		$obj = new stdClass();
		$obj->data = $data;
		$obj->success = true;
		$obj->messages = new stdClass();
		if (empty($data["name"]))
		{
			$obj->success = false;
			$obj->messages->name = "Please enter your name.";
		}
		if (!isEmail($data["email"]))
		{
			$obj->success = false;
			$obj->messages->email = "Please enter a valid email address.";
		}
		if ($obj->success)
		{
			// TODO:  Store the info in $data in a database
		}
		header("Content-type: application/json");
		echo json_encode($obj);
		exit();
	}
}

processSignup();
