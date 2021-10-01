const url = require("url");
const qs = require("querystring");
module.exports = {
  serverHandle: function (req, res) {
    const route = url.parse(req.url);
    const path = route.pathname;
    const queryParams = qs.parse(url.parse(req.url).query);
    const content =
      "<!DOCTYPE html>" +
      "<html>" +
      "    <head>" +
      '        <meta charset="utf-8" />' +
      "        <title>ECE AST</title>" +
      "    </head>" +
      "    <body>" +
      "       <p>path : " +
      path +
      " </p>" +
      "<a href='/hello?name=toto'" +
      ">vers toto</a><br>" +
      "<a href='/hello?name=ulysse'" +
      ">vers ulysse</a><br>" +
      "<a href='/hello?name=hugo'" +
      ">vers hugo</a><br>" +
      "    </body>" +
      "</html>";
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(content);
    if (path === "/hello" && "name" in queryParams) {
      res.write("Michael says : Hello " + queryParams["name"]+"<br>");
      if (queryParams["name"]==="ulysse"){
        res.write("Ulysse says : My name is Ulysse. I'm a software engineer student, and I love badminton.<br>")
      }else if (queryParams["name"]==="hugo"){
        res.write("Hugo says : My name is Hugo. I'm a software engineer student, just like Ulysse, and I love my dog.<br>")
      }else if (queryParams["name"]==="toto"){
        res.write("Toto says : My name is Toto. I'm not a software engineer student like Hugo or Ulysse, but I love Hugo's dog.<br>")
      }
    } else {
      res.write("404 error.. Seems like you're lost.");
    }
    res.end();
  },
};
