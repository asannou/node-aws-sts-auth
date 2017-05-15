#!/usr/bin/env node
"use strict";

const HOST = "sts.amazonaws.com";
const ACTION = "GetCallerIdentity";
const VERSION = "2011-06-15";

const urlToToken = token => {
  const URL = require("url").URL;
  const url = new URL(token);
  const params = url.searchParams;
  let st = params.get("X-Amz-Security-Token");
  if (st) {
    st = st.replace(/\+/g, "-").replace(/\//g, "_");
    params.set("X-Amz-Security-Token", st);
  }
  params.delete("Action");
  params.delete("Version");
  params.delete("X-Host");
  return params.toString();
};

const tokenToUrl = token => {
  const URL = require("url").URL;
  const url = new URL(`https://${HOST}/?` + token);
  const params = url.searchParams;
  params.set("Action", ACTION);
  params.set("Version", VERSION);
  let st = params.get("X-Amz-Security-Token");
  if (st) {
    st = st.replace(/-/g, "+").replace(/_/g, "/");
    params.set("X-Amz-Security-Token", st);
  }
  return url.href;
};

const generateToken = (host, expire, callback) => {
  const AWS = require("aws-sdk");
  const sts = new AWS.STS({ apiVersion: VERSION });
  const req = sts.getCallerIdentity();
  req.httpRequest.headers["X-Host"] = host;
  req.presign(expire, (err, url) => {
    if (err) {
      callback(err);
    } else {
      callback(null, urlToToken(url));
    }
  });
};

const slurpStream = (stream, callback) => {
  let buf = "";
  stream.on("data", chunk => buf += chunk);
  stream.on("end", () => callback(buf));
};

const validateToken = (token, host, callback) => {
  const url = require("url");
  const https = require("https");
  const options = url.parse(tokenToUrl(token));
  options.headers = { "X-Host": host };
  https.get(options, res => {
    if (res.statusCode === 200) {
      slurpStream(res, data => {
        const [, arn] = data.match(/<Arn>([^<]+)/);
        callback(null, arn);
      });
    } else {
      slurpStream(res, callback);
    }
  });
};

if (require.main === module) {
  const func = process.argv[2];
  if (func === "generate") {
    const host = process.argv[3] || "example.com";
    const expire = process.argv[4] || 900;
    generateToken(host, expire, (err, token) => {
      if (err) {
        console.error(err);
      } else {
        console.log(token);
      }
    });
  } else if (func === "validate") {
    const token = process.argv[3];
    const host = process.argv[4] || "example.com";
    validateToken(token, host, (err, arn) => {
      if (err) {
        console.error(err);
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

