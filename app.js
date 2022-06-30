const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");
const app=express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res)
{
  res.sendFile(__dirname+"/index.html");
});
app.post("/",function(req,res)
{
  var town=req.body.town;
  console.log(town);
  const appKey="aa2eec84f7b17e4fdc7e74aef34f6577";
  const url= "https://api.openweathermap.org/data/2.5/weather?appid="+ appKey+"&q="+ town+"&units=metric"
  https.get(url,function(response){
    console.log(response.statusCode);

    response.on("data",function(data)
  {
    const weatherData=JSON.parse(data);
    const temp=weatherData.main.temp
    const weatherDescrition=weatherData.weather[0].description;
    const icon=weatherData.weather[0].icon;
    const imageUrl="http://openweathermap.org/img/wn/"+ icon+"@2x.png";
    console.log(temp);
    console.log(weatherDescrition);
    console.log(imageUrl);
    res.write("<p> the description of weather is "+weatherDescrition+"</p>");
    res.write("<h1>temprature of "+ town+ "is  "+temp+"</h1>");
    res.write("<img src="+imageUrl+ ">");
    res.send();
  });
  });


})


app.listen(process.env.PORT || 3000,function()
{
  console.log("server is running on port 3000");
});
