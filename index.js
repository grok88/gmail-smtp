const express = require('express');
const app = express();
const port = 3010;
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

const smtp_login = process.env.SMTP_LOGIN || '---';
const smtp_password = process.env.SMTP_PASSWORD || '---';

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
	service:"gmail",
	// host: 'smtp.gmail.com',
	// port: 587,
	// secure: false,
	// requireTLS: true,

	auth: {
		user: smtp_login,
			// 'alexgoryacko@gmail.com', // generated ethereal user
		pass: smtp_password
			// 'testpass322', // generated ethereal password
	},
});

app.get('/', (req, res) => {
	res.send('Hello World!')
})

app.post('/sendMessage', async (req, res) => {
	// send mail with defined transport object
	let {values} = req.body;
	let {name, email, text} = values;

	let info = await transporter.sendMail({
		from: 'HR WANTS ME', // sender address
		to: 'alexgoryacko@gmail.com, grok88@tut.by', // list of receivers
		subject: 'HR WANTS ME', // Subject line
		// text: "Hello world?", // plain text body
		html: `<b>Сообщение с моего портфолио</b>
<div>
name:${name}
</div>
<div>
email:${email}
</div>
<div>
text:${text}
</div>
`});

	res.send('ok');
})

const PORT = process.env.PORT || 3010;

app.listen(PORT, () => {
	console.log(`Example app listening at http://localhost:${port}`)
})