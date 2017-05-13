#!/usr/bin/env node
"use strict";

const generateToken = (host, expire, callback) => {
  const AWS = require("aws-sdk");
  const sts = new AWS.STS();
  const req = sts.getCallerIdentity();
  req.httpRequest.headers["X-Host"] = host;
  req.presign(expire, (err, token) => {
    const URL = require("url").URL;
    const url = new URL(token);
    url.searchParams.delete("X-Host");
    callback(null, url.href);
  });
};

const validateToken = (token, host, callback) => {
  const url = require("url");
  const https = require("https");
  const options = url.parse(token);
  options.hostname = "sts.amazonaws.com";
  options.headers = { "X-Host": host };
  https.get(options, res => {
    if (res.statusCode === 200) {
      let buf = "";
      res.on("data", chunk => buf += chunk.toString());
      res.on("end", () => {
        const [, arn] = buf.match(/<Arn>([^<]+)/);
        callback(null, arn);
      });
    } else {
      res.on("data", chunk => callback(chunk.toString()));
    }
  });
};

if (require.main === module) {
  const func = process.argv[2];
  if (func === "generate") {
    const host = process.argv[3] || "example.com";
    const expire = process.argv[4] || 900;
    generateToken(host, expire, (err, token) => {
      console.log(token);
    });
  } else if (func === "validate") {
    const token = process.argv[3];
    const host = process.argv[4] || "example.com";
    validateToken(token, host, (err, arn) => {
      if (err) {
        console.log(err);
      } else {
        console.log(arn);
      }
    });
  }
}

module.exports = {
  generateToken: generateToken,
  validateToken: validateToken
};

