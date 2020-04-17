openLogo();

function openLogo()
{
	const Jimp = require("jimp");

	Jimp.read("codedrome.png")
        .then(image =>
        {
            image.getBase64Async(Jimp.AUTO)
			.then(base64 =>
			{
				base64ToPage(base64);
			})
			.catch(err =>
			{
				console.error(err);
			});
        })
        .catch(err =>
        {
            console.error(err);
        });
}

function base64ToPage(base64)
{
	const fs = require("fs");

	let file = fs.readFile("base64image.htm", function(err, data)
	{
		if(err)
		{
			console.error(err);
		}
		else
		{
			let html = data.toString('utf8');

			html = html.replace("{{logo}}", base64);

			fs.writeFile("base64image.htm", html, function (err)
			{
  				if (err)
				{
					console.error(err);
				}
				else
				{
					console.log('Saved!');
				}
			});
		}
	});
}
