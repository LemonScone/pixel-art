const renderMailContent = (name, url) => {
  return `<!DOCTYPE html>
		<html>
		<head>
				<title>Forget Password Email</title>
		</head>
		<body>
				<div>
						<h3>Dear ${name},</h3>
						<p>You requested for a password reset, kindly use this <a href=${url}>link</a> to reset your password.</p>
            <p>If you don’t use this link within 3 hours, it will expire.</p>
						<br>
						<p>Cheers!</p>
				</div>
		</body>
		</html>`;
};

export { renderMailContent };
