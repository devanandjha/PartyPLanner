var express = require('express'),
sql = require("mssql"),
bodyParser = require('body-parser');


var app = express();
var port = process.env.port || 3000;


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


app.listen(port, function () {
	console.log('Example app listening on port' + port)
});

var appRouter = express.Router();
appRouter.route('/Restaurents')
	.post(function(req,res){

		
	})
	.get(function (req, res) {
		res.header("content-type: application/json");
		var data = [];
		sql.connect(config, function (err) {
			if (err) console.log(err);
			var request = new sql.Request();
			var query = req.query;
			var queryString = 'select * from TFIN_CLM_STATUS where CLM_STATUS_id = @input_parameter';

			if(!query.Clm_Status_Id)
			{
				queryString = 'select * from TFIN_CLM_STATUS';
			}
			request
				.input('input_parameter', sql.Int, query.Clm_Status_Id)
				.query(queryString, function (err, results) {
					sql.close();
					if (err) {
						console.log(err)
					}
					else {
						results.recordset.forEach(function (element) {
							data.push({ '"Clm_Status_Id"': element.Clm_Status_Id, '"Clm_Status_Cd"': element.Clm_Status_Cd })
						}, this);

						res.json(data);
					}
				});
		});
	});

appRouter.route('/Restaurents/:restaurentID')
	.get(function (req, res) {
		res.header("content-type: application/json");
		var data = [];
		sql.connect(config, function (err) {
			if (err) console.log(err);
			var request = new sql.Request();
			//var RestaurentID = req.param.RestaurentID;
			var queryString = 'select * from TFIN_CLM_STATUS where CLM_STATUS_id = @input_parameter';
		
			request
				.input('input_parameter', sql.Int, req.params.restaurentID)
				.query(queryString, function (err, results) {
					sql.close();
					if (err) {
						console.log(err)
					}
					else {
						results.recordset.forEach(function (element) {
							data.push({ '"Clm_Status_Id"': element.Clm_Status_Id, '"Clm_Status_Cd"': element.Clm_Status_Cd })
						}, this);

						res.json(data);
					}
				});
		});
	});


app.use('/api', appRouter);


var config = {
	user: 'MATX99',
	password: 'kdLhIC',
	server: 'easqldev',
	database: 'EDMTTX'
};

// app.get('/', function (req, res) {
// 	res.header("content-type: application/json");
// 	var data = [];
// 	sql.connect(config, function (err) {
// 		if (err) console.log(err);
// 		var request = new sql.Request();
// 		request.query('select * from TFIN_CLM_STATUS', function (err, results) {
// 			sql.close();
// 			if (err) {
// 				console.log(err)
// 			}
// 			else {
// 				results.recordset.forEach(function (element) {
// 					data.push({ '"Clm_Status_Id"': element.Clm_Status_Id, '"Clm_Status_Cd"': element.Clm_Status_Cd })
// 				}, this);

// 				res.json(data);
// 			}
// 		});
// 	});
// });

app.get('/hell', function (req, res) {
	res.send('Hell!')
});


